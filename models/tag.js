const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Tag = db.define('Tag', {
    Name: {
        type: Sequelize.STRING,
        primaryKey: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Tag;