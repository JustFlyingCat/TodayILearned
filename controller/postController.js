const { DataTypes } = require('sequelize');
const sequelize = require('../database/database').createSequelize();
const validation = require('./validation');
const users = require('../models/user');
const posts = require('../models/post');
const User = users(sequelize, DataTypes);
const Post = posts(sequelize, DataTypes);  

exports.index = async function (req, res) {
    associate();
    //Find all posts
    // include: User
    const postList = await Post.findAll({order: [["createdAt", "DESC"]], include: User});
    //validate user
    const data = await validation.validateCookie(req.cookies.userLogged);
    //send response
    res.render('post-listing', {title: 'All Posts', data: data, des: 'Total posts: ' + postList.length, list: postList});
}

exports.post = async function (req, res) {
    let title;
    let content;
    let date;
    let userName;

    associate();

    const post = await Post.findOne({where: {id: req.params.postId, userId: req.params.userId}, include: User});

    if (post == null) {
       title = '404 NOT FOUND';
       content = 'The post was not found in the database';
    } else {
        title = post.headline;
        date = post.createdAt;
        userName = post.user.userName;
        content = post.content;
        //console.log(userPosts);
    }
    const data = await validation.validateCookie(req.cookies.userLogged);
    res.render('post',{title: title,user: userName, creationDate: date, postContent: content, data: data});
}

exports.create = async function(req, res) {
    const data = await validation.validateCookie(req.cookies.userLogged);
    if(!data.logged) {
        res.redirect('../login');
    } else {
        res.render('createEditPost', {title: 'Create a Post', data: data});
    }
}

exports.submit = async function(req, res) {
    associate();
    // get the current user
    const data = await validation.validateCookie(req.cookies.userLogged)
    const user = await User.findOne({where:{userName: data.currentUsername}});
    //create the new post
    const post = await user.createPost({headline: req.body.headline, content: req.body.content})
    //send a response
    res.redirect('/posts/' + post.userId + '-' + post.id);
}

exports.postPost = function(req, res) {
    if(req.body.type == 'edit') {
        res.redirect('./' +req.params.userId + '-' + req.params.postId + '/edit');
    } else if (req.body.type == 'delete') {
        exports.deletePost(req, res);
    } else {
        res.redirect('/');
        console.log('desired user action for post was not found')
    }
}

exports.deletePost = async function(req, res) {
    console.log('delete post ' + req.params.postId + ' of user ' + req.params.userId);
    // get the current user
    const data = await validation.validateCookie(req.cookies.userLogged);
    if (data) {
        const user = await User.findOne({where: {userName: data.currentUsername}});
        const post = await Post.findOne({where: {id: req.params.postId, userId: user.id}});
        await post.destroy()
        res.redirect('/posts/')
    } else {
        res.render('error',{title: 'CANT DELETE', message: 'Cant delete posts when not logged in'})
    }
}

exports.editPost = async function(req, res) {
    const data = await validation.validateCookie(req.cookies.userLogged);
    if(data) {
        const user = await User.findOne({where: {userName: data.currentUsername}});
        const post = await Post.findOne({where: {id: req.params.postId, userId: user.id}});
        if (req.method == 'GET') {
            //Get the edit website
            res.render('createEditPost', {title: 'Edit a Post', preContent: post.content, preHeadline: post.headline, data: data})
        } else if (req.method == 'POST') {
            //Change post content through post request
            console.log('edit post ' + req.params.postId + ' of user ' + req.params.userId);
            //change headline in DB if it changed
            if (post.headline != req.body.headline) {
                post.headline = req.body.headline;
            }
            //change content in DB if it changed
            if (post.content != req.body.content) {
                post.content = req.body.content;
            }
            //sync the post to the DB
            post.save();
            //redirect back to post
            res.redirect('../' + req.params.userId + '-' + req.params.postId);
        } else {
            res.render('error', {title: 'OOPS', message: 'oops, something went wrong'})
        }
    } else {
        res.render('error',{title: 'CANT EDIT', message: 'Cant edit posts when not logged in'})
    }
}

function associate(){
    //Setting relations between the tables 
    User.hasMany(Post);
    Post.belongsTo(User);
}