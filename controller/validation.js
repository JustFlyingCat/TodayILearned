const { DataTypes } = require('sequelize');
const sequelize = require('../database/database').createSequelize();
const users = require('../models/user');
const User = users(sequelize, DataTypes);

exports.validate = async function(userName, userPassword) {
    let validation = false;

    const user = await User.findOne({where: {userName: userName}});

    if(user) {
        if(user.password == userPassword) {
            validation = true;
        }
    }
    return validation;
}

exports.getUserCookie = async function(userName, userPassword) {
    const user = await User.findOne({where: {userName: userName, password: userPassword}});

    if (user) {
        return user.cookieId;
    } else {
        return 'User wasnt validated';
    }
}

exports.validateCookie = async function(CookieValue) {
    let validation = false;
    let userName;

    if (CookieValue) {
        const user = await User.findOne({where: {cookieId: CookieValue}});
        if (user) {
            validation = true;
            userName = user.userName;
        }
    }
    return {logged: validation, currentUsername: userName};
}