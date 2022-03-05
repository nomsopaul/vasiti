const Sequelize = require('sequelize');
const db = new Sequelize("vasiti", "root", "",{
    host:"127.0.0.1",
    dialect:"mysql",
    secret: "mystrongsecret"
});

module.exports = db;