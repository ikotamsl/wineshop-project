"use strict";

const sequelize = require('../db');
const {DataTypes} = require('sequelize');
const {add} = require("nodemon/lib/rules");

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

const cart = sequelize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    quantity: {type: DataTypes.INTEGER, min: 1, isNull: false},
});

const cart_position = sequelize.define('cart_position', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true}
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

Customer.hasMany(order, {
    foreignKey: 'customer_id'
});
order.belongsTo(Customer, {
    foreignKey: 'customer_id'
});

Address.hasMany(order, {
    foreignKey: 'address_id'
});
order.belongsTo(Address, {
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

Customer.hasOne(cart,{
    foreignKey: 'customer_id'
});
cart.belongsTo(Customer, {
    foreignKey: 'customer_id'
});
cart.hasMany(cart_position, {
    foreignKey: 'cart_id'
});
cart_position.belongsTo(cart, {
    foreignKey: 'cart_id'
});

position.hasMany(cart_position, {
    foreignKey: 'position_id'
});
cart_position.belongsTo(cart_position, {
    foreignKey: 'position_id'
})

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

module.exports = {
    Customer, employee, position, attribute, contact, Address
}