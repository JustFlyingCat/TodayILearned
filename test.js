const { Sequelize, DataTypes, Model } = require('sequelize');
const posts = require('./models/post');
const users = require('./models/user');

const sequelize = new Sequelize('maxtest', 'root', '', {
    host: 'localhost',
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

//retting speciffic relations
async function run() {
    await sequelize.sync({force: true});
    
    const user = await User.create({userName: 'the-foo', password: 'save'});
    const post1 = await Post.create({headLine: 'post1', content: 'hfh'});
    const post2 = await Post.create({headLine: 'post2', content: 'lalal'});
    
    await user.addPost(post1);
    await user.addPost(post2);

    const posts = await user.getPosts();
    console.log('Posts Log: ' + posts);
}

/* async function run() {
    await sequelize.sync();

    const matches = await Post.findAll();

    console.log(matches);
} */

run();