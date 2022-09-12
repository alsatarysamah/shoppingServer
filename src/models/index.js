'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./users.js');
const itemsModel=require ("./items");
// const favModel=require("./fav")
const DataCollection=require("./lib/data-collection");


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

// const favTable = favModel(sequelize, DataTypes);
// const favCollection=new DataCollection(favTable);



const itemTable = itemsModel(sequelize, DataTypes);
const itemCollection=new DataCollection(itemTable);


//relations
userTable.hasMany(itemTable); // user many orders
itemTable.belongsTo(userTable); // order one user

// id    item   user
//  1   2        5
// 2     2         6
module.exports = {
  db: sequelize,
  users: users(sequelize, DataTypes),
  itemCollection:itemCollection,
  // favCollection:favCollection,

};
