"use strict";

const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const {add} = require("nodemon/lib/rules");
const ApiError = require("../error/Error");

const Customer = sequelize.define('customer', {
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

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    comment: {type: DataTypes.STRING, isNull: true},
    is_special: {type: DataTypes.BOOLEAN, isNull: false}
});

const position = sequelize.define('position', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    name: {type: DataTypes.STRING, isNull: false},
    type: {type: DataTypes.STRING, isNull: false},
    year: {type: DataTypes.INTEGER, isNull: false},
    grape: {type: DataTypes.STRING, isNull: false},
    price: {type: DataTypes.REAL, isNull: false},
    stock: {type: DataTypes.INTEGER, isNull: true}
});

const Address = sequelize.define('address', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    country: {type: DataTypes.STRING, isNull: false},
    city: {type: DataTypes.STRING, isNull: false},
    street: {type: DataTypes.STRING, isNull: false},
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

const Cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
});

const Cart_position = sequelize.define('cart_position', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    quantity: {type: DataTypes.INTEGER, min: 1, isNull: false},
})



Customer.hasMany(Address, {
    foreignKey: 'customer_id'
});
Address.belongsTo(Customer, {
    foreignKey: 'customer_id'
});

Customer.hasMany(contact, {
    foreignKey: 'customer_id'
});
contact.belongsTo(Customer, {
    foreignKey: 'customer_id'
});

Customer.hasMany(Order, {
    foreignKey: 'customer_id'
});
Order.belongsTo(Customer, {
    foreignKey: 'customer_id'
});

Address.hasMany(Order, {
    foreignKey: 'address_id'
});
Order.belongsTo(Address, {
    foreignKey: 'address_id'
})

employee.hasMany(Order, {
    foreignKey: 'emp_id'
});
Order.belongsTo(employee, {
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

Customer.hasOne(Cart,{
    foreignKey: 'customer_id'
});
Cart.belongsTo(Customer, {
    foreignKey: 'customer_id'
});
Cart.hasMany(Cart_position, {
    foreignKey: 'cart_id'
});
Cart.hasOne(Order, {
    foreignKey: 'cart_id'
});
Cart_position.belongsTo(Cart, {
    foreignKey: 'cart_id'
});
position.hasMany(Cart_position, {
    foreignKey: 'position_id'
});
Cart_position.belongsTo(Cart_position, {
    foreignKey: 'position_id'
});

// Hooks for data consistency

Address.addHook('beforeCreate', async (instance, options) => {
    if (!instance.customer_id) {
        throw new Error('customer_id must be provided');
    } else {
        const secondModelInstance = await Customer.findByPk(instance.customer_id);
        if (!secondModelInstance) {
            throw new Error('Associated record in customers does not exist');
        }
    }
});

Order.addHook('beforeCreate', async (instance, options) => {
    if (!instance.is_special) {
        const second = await Customer.findByPk(instance.customer_id);
        const third = await Customer.findByPk(instance.emp_id);
        const fourth = await Customer.findByPk(instance.address_id);
        if (!second || !third || !fourth) {
            throw new Error(`Check if you've provided address, customer or employee`);
        }
    }
});

Customer.addHook('beforeCreate', async (instance) => {
    if (!instance.login) {
        throw new Error('login must be provided');
    } else {
        const customerRow = await Customer.findAll({where: {login: instance.login} });

        if (customerRow.length > 0) {
            throw new Error('Customer already exits');
        }
    }
});

module.exports = {
    Customer, employee, position, attribute, contact, Address, Order, Cart, Cart_position
}