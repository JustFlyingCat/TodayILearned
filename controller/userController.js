const { DataTypes } = require('sequelize');
const sequelize = require('../database/database').createSequelize();
const validation = require('./validation');
const users = require('../models/user');
const posts = require('../models/post');
const User = users(sequelize, DataTypes);
const Post = posts(sequelize, DataTypes); 

exports.index = async function (req, res) {
    User.findAll()
        .then(async function(ans) {
            const data = await validation.validateCookie(req.cookies.userLogged);
            res.render('user', {title: 'All Users', des: 'Total registered users: ' + ans.length, list: ans, data: data});
        })
        .catch(err => {
            console.log('BIG GIGANT ERROR: ' + err);
        })
    
}

exports.user = async function (req, res) {
    let title;
    let ans;
    let list;

    //Setting relations between the tables 
    User.hasMany(Post);
    Post.belongsTo(User);

    const user = await User.findOne({where: {userName: req.params.userId}})

    if (user == null) {
       title = '404 NOT FOUND';
       ans = req.params.userId + ' was not found in the database';
    } else {
        title = user.userName;
        ans = 'User Posts:';
        const userPosts = await user.getPosts();
        list = userPosts;
        //console.log(userPosts);
    }
    const data = await validation.validateCookie(req.cookies.userLogged);
    res.render('user',{title: title, des: ans, list: list, data: data});
}