const Sequelize = require('sequelize');
const db = require('../../setup/db');

module.exports = db.define('User', {
    id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password: {
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    }
})