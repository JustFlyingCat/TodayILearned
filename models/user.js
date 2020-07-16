module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        userName: {
            type: DataTypes.STRING(16),
            allowNull: false,
            is: ['[0-9a-z]','i'],
            unique: true
        },
        password: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        cookieId: {
            type: DataTypes.STRING,
            unique: true
        }
    });
}