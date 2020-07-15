const { DataTypes } = require('sequelize');
const sequelize = require('../database/maxtest').createSequelize();
const users = require('../models/user');
const posts = require('../models/post');
const User = users(sequelize, DataTypes);
const Post = posts(sequelize, DataTypes);  

exports.index = async function (req, res) {

    associate();

    Post.findAll({include: User})
        .then(ans => {
            res.render('post-listing', {title: 'All Posts', des: 'Total posts: ' + ans.length, list: ans});
        })
        .catch(err => {
            console.log('BIG GIGANT ERROR: ' + err);
        });    
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
    res.render('post',{title: title,user: userName, creationDate: date, postContent: content});
}

exports.create = async function(req, res) {
    res.render('createPost', {title: 'Create a Post'})
}

exports.submit = async function(req, res) {
    associate();
    // get the test user(current user in the future)
    const user = await User.findOne({where:{userName: 'the-foo'}});

    const post = await user.createPost({headline: req.body.headline, content: req.body.content})
    res.redirect('/posts/' + post.userId + '-' + post.id);
}

function associate(){
    //Setting relations between the tables 
    User.hasMany(Post);
    Post.belongsTo(User);
}