const { DataTypes } = require('sequelize');
const sequelize = require('../database/maxtest').createSequelize();
const validation = require('./validation');
const users = require('../models/user');
const User = users(sequelize, DataTypes);

exports.login = function(req, res) {
    res.render('login', {title: 'login'});
}

exports.handleLogin = async function(req, res) {

    const userName = req.body.username;
    const userPassword = req.body.password;

    if(validation.validate(userName, userPassword)) {
        let date = new Date();
        let futDate = date.getDate() + 14;
        date.setDate(futDate);
        res.cookie('userLogged', 'sOmErAnDoMnUmBeR', {httpOnly: true, expires: date});
        res.redirect('/');
    } else {
        res.render('login', {title: 'login', errMessage: 'Wrong username or password', data: validation.validateCookie(req.cookies.userLogged)});
    }
}

exports.loggout = function(req, res) {

}

function associate(){
    //Setting relations between the tables 
    User.hasMany(Post);
    Post.belongsTo(User);
}