"use strict";

const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const {add} = require("nodemon/lib/rules");

const customer = sequelize.define('customer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    first_name: {type: DataTypes.STRING, primaryKey: false},
    second_name: {type: DataTypes.STRING, primaryKey: false},
    patronymic_name: {type: DataTypes.STRING, primaryKey: false},
    login: {type: DataTypes.STRING, primaryKey: false},
    password: {type: DataTypes.STRING, primaryKey: false},
    birth_date: {type: DataTypes.DATE}
});

const employee = sequelize.define('employee', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    first_name: {type: DataTypes.STRING, primaryKey: false},
    second_name: {type: DataTypes.STRING, primaryKey: false},
    patronymic_name: {type: DataTypes.STRING, primaryKey: false},
    login: {type: DataTypes.STRING, primaryKey: false},
    password: {type: DataTypes.STRING, primaryKey: false},
    birth_date: {type: DataTypes.DATE}
});

const admin = sequelize.define('admin', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    login: {type: DataTypes.STRING, primaryKey: false},
    password: {type: DataTypes.STRING, primaryKey: false}
});

const order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    quantity: {type: DataTypes.INTEGER, min: 1, isNull: false},
    comment: {type: DataTypes.STRING, isNull: true},
    is_special: {type: DataTypes.BOOLEAN, isNull: false}
});

const position = sequelize.define('position', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    name: {type: DataTypes.STRING, isNull: false},
    type: {type: DataTypes.STRING, isNull: false},
    year: {type: DataTypes.INTEGER, isNull: false},
    grape: {type: DataTypes.STRING, isNull: false},
    price: {type: DataTypes.REAL, isNull: false}
});

const address = sequelize.define('address', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    country: {type: DataTypes.STRING, isNull: false},
    city: {type: DataTypes.STRING, isNull: false},
    house: {type: DataTypes.STRING, isNull: false},
    apartment: {type: DataTypes.STRING, isNull: false},
    zip: {type: DataTypes.STRING, isNull: false}
});

const contact = sequelize.define('contact', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    type: {type: DataTypes.STRING, isNull: false},
    string: {type: DataTypes.STRING, isNull: false}
});

const attribute = sequelize.define('attribute', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    attr_name: {type: DataTypes.STRING, isNull: false},
    attr_value: {type: DataTypes.STRING, isNull: false}
});

const cart = sequelize.define('card', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    quantity: {type: DataTypes.INTEGER, min: 1, isNull: false},
})

customer.hasMany(address, {
    foreignKey: 'customer_id'
});
address.belongsTo(customer, {
    foreignKey: 'customer_id'
});

customer.hasMany(contact, {
    foreignKey: 'customer_id'
});
contact.belongsTo(customer, {
    foreignKey: 'customer_id'
});

customer.hasMany(order, {
    foreignKey: 'customer_id'
});
order.belongsTo(customer, {
    foreignKey: 'customer_id'
});

address.hasMany(order, {
    foreignKey: 'address_id'
});
order.belongsTo(address, {
    foreignKey: 'address_id'
})

employee.hasMany(order, {
    foreignKey: 'emp_id'
});
order.belongsTo(employee, {
    foreignKey: 'emp_id'
});

employee.hasMany(contact, {
    foreignKey: 'emp_id'
});
contact.belongsTo(employee, {
    foreignKey: 'emp_id'
});

position.hasMany(attribute, {
    foreignKey: 'position_id'
});
attribute.belongsTo(position, {
    foreignKey: 'position_id'
});

position.hasMany(cart, {
    foreignKey: 'position_id'
});
cart.belongsTo(position, {
    foreignKey: 'position_id'
});

module.exports = {
    customer, employee, position, attribute, contact, address, admin
}