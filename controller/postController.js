const { DataTypes } = require('sequelize');
const sequelize = require('../database/maxtest').createSequelize();
const users = require('../models/user');
const posts = require('../models/post');
const User = users(sequelize, DataTypes);
const Post = posts(sequelize, DataTypes); 

exports.index = async function (req, res) {
    Post.findAll()
        .then(ans => {
            res.render('user', {title: 'All Posts', des: 'Total posts: ' + ans.length, list: ans});
        })
        .catch(err => {
            console.log('BIG GIGANT ERROR: ' + err);
        })
    
}

exports.post = async function (req, res) {
    let title;
    let content;
    let date;
    let userName;

    //Setting relations between the tables 
    User.hasMany(Post);
    Post.belongsTo(User);

    const post = await Post.findOne({where: {id: req.params.postId, userId: req.params.userId}, include: User});

    if (post == null) {
       title = '404 NOT FOUND';
       content = 'The post was not found in the database';
    } else {
        title = post.headLine;
        date = post.createdAt;
        userName = post.user.userName;
        content = post.content;
        //console.log(userPosts);
    }
    res.render('post',{title: title,user: userName, creationDate: date, postContent: content});
}