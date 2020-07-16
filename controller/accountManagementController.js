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
        //create a date 7 days from creation
        let date = new Date();
        let futDate = date.getDate() + 7;
        date.setDate(futDate);
        //get the cookie id from the user logging in
        const cookieId = await validation.getUserCookie(userName, userPassword);
        //response
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

exports.createUserPost = async function(req, res) {
    const data = {logged: false};
    const newName = req.body.username;
    const newPassword = req.body.password;
    const confPassword = req.body.confPassword;

    if (await User.findOne({where: {userName: newName}})) {
        res.render('createUser', {title:'Create user', errMessage: 'The Username is already taken', data: data})
    } else {
        if(newPassword == confPassword) {
            //create random cookie value for the user
            const newCookie = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            await User.create({userName: newName, password: newPassword, cookieId: newCookie});
            //creating a date 7 days from now on
            let date = new Date();
            let futDate = date.getDate() + 7;
            date.setDate(futDate);
            //send a response after the user was created
            res.cookie('userLogged', newCookie, {httpOnly: true, expires: date});
            res.redirect('/users/' + newName);
        } else {
            res.render('createUser', {title:'Create user', errMessage: 'The passwords did not match', data: data})
        }
    }
}