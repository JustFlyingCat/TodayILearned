const { Sequelize, DataTypes } = require('sequelize');
const posts = require('../models/post');
const users = require('../models/user');

exports.createSequelize = function() {
    const sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mariadb'
    });
    sequelize.authenticate()
    .then(console.log('Connection established'))
    .catch(err => {
        console.log('Unable to connect\n' + err);
    });

    //creating tables from models
    const Post = posts(sequelize, DataTypes); 
    const User = users(sequelize, DataTypes);

    //Setting relations between the tables 
    User.hasMany(Post);
    Post.belongsTo(User);

    sequelize.sync();

    return sequelize;
}