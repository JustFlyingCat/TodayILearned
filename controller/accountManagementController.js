const { DataTypes, where } = require('sequelize');
const sequelize = require('../database/maxtest').createSequelize();
const users = require('../models/user');
const User = users(sequelize, DataTypes);

exports.login = function(req, res) {
    res.render('login', {title: 'login'});
}

exports.handleLogin = async function(req, res) {

    const userName = req.body.username;
    const userPassword = req.body.password;

    const user = await User.findOne({where: {userName: userName}});

    if(user) {
        if(user.password == userPassword) {
            let date = new Date();
            let futDate = date.getDate() + 14;
            date.setDate(futDate);
            res.cookie(user.userName, 'sOmErAnDoMnUmBeR', {httpOnly: true, expires: date});
        } else {
            res.render('login', {title: 'login', errMessage: 'Wrong password'});
        }
    } else {
        res.render('login', {title: 'login', errMessage: 'This user does not exsist'});
    }
}

exports.loggout = function(req, res) {

}

function associate(){
    //Setting relations between the tables 
    User.hasMany(Post);
    Post.belongsTo(User);
}