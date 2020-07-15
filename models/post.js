module.exports = function(sequelize, DataTypes) {
    return sequelize.define('post', {
        headLine: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
}