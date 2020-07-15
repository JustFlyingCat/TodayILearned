module.exports = function(sequelize, DataTypes) {
    return sequelize.define('post', {
        headline: {
            type: DataTypes.STRING(64),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
}