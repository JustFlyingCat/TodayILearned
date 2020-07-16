const { DataTypes } = require('sequelize');
const sequelize = require('../database/maxtest').createSequelize();
const validation = require('./validation');
const users = require('../models/user');
const User = users(sequelize, DataTypes);

exports.login = function(req, res) {
    res.render('login', {title: 'login', data: {logged: false}});
}

exports.handleLogin = async function(req, res) {

    const userName = req.body.username;
    const userPassword = req.body.password;

    if(validation.validate(userName, userPassword)) {
        let date = new Date();
        let futDate = date.getDate() + 14;
        date.setDate(futDate);
        const cookieId = await validation.getUserCookie(userName, userPassword);
        res.cookie('userLogged', cookieId, {httpOnly: true, expires: date});
        res.redirect('/');
    } else {
        const data = await validation.validateCookie(req.cookies.userLogged);
        res.render('login', {title: 'login', errMessage: 'Wrong username or password', data: data});
    }
}

exports.loggout = function(req, res) {
    res.cookie('userLogged', '', {maxAge: 0});
    res.redirect('/');
}

exports.createUser = async function(req, res) {
    const data = await validation.validateCookie(req.cookies.userLogged)
    if (data.logged) {
        res.redirect('/');
    } else {
        res.render('createUser', {title: 'Create user', data: data})
    }
}

exports.createUserPost = function(req, res) {
    
}