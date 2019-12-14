const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Customer = db.define('Customer', {
    Username: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    Password: {
        type: Sequelize.STRING
    },
    Name: {
        type: Sequelize.STRING
    },
    Surname: {
        type: Sequelize.STRING
    },
    Nationality: {
        type: Sequelize.STRING
    },
    AgeRange: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING
    },
    Gender: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Customer;