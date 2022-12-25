'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./users.js');
const itemsModel=require ("./items");
const DataCollection=require("./lib/data-collection");
const ordersModel=require("./order")


const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);


const userTable = users(sequelize, DataTypes);

const ordersTable = ordersModel(sequelize, DataTypes);
const ordersCollection=new DataCollection(ordersTable);



const itemTable = itemsModel(sequelize, DataTypes);
const itemCollection=new DataCollection(itemTable);





//relations
userTable.hasMany(ordersTable); // user many orders
ordersTable.belongsTo(userTable); // order one user


module.exports = {
  db: sequelize,
  users: users(sequelize, DataTypes),
  itemCollection:itemCollection,
  ordersCollection:ordersCollection,


};
