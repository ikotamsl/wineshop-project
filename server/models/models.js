"use strict";

const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const Customer = sequelize.define('customer', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    first_name: {type: DataTypes.STRING, primaryKey: false},
    second_name: {type: DataTypes.STRING, primaryKey: false},
    patronymic_name: {type: DataTypes.STRING, primaryKey: false},
    login: {type: DataTypes.STRING, primaryKey: false},
    password: {type: DataTypes.STRING, primaryKey: false},
    birth_date: {type: DataTypes.DATE}
});

const Employee = sequelize.define('employee', {
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

const Position = sequelize.define('position', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    name: {type: DataTypes.STRING, isNull: false},
    year: {type: DataTypes.INTEGER, isNull: false},
    price: {type: DataTypes.REAL, isNull: false},
    stock: {type: DataTypes.INTEGER, isNull: true},
    image: {type: DataTypes.STRING, isNull: true},
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

const Contact = sequelize.define('contact', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    type: {type: DataTypes.STRING, isNull: false},
    string: {type: DataTypes.STRING, isNull: false}
});

const Attribute = sequelize.define('attribute', {
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
});

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    name: {type: DataTypes.STRING, isNull: false},
    code: {type: DataTypes.STRING, isNull: false},
});

const Grape = sequelize.define('grape', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    name: {type: DataTypes.STRING, isNull: false},
    code: {type: DataTypes.STRING, isNull: false},
});



Customer.hasMany(Address, {
    foreignKey: 'customer_id'
});
Address.belongsTo(Customer, {
    foreignKey: 'customer_id'
});

Customer.hasMany(Contact, {
    foreignKey: 'customer_id'
});
Contact.belongsTo(Customer, {
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

Employee.hasMany(Order, {
    foreignKey: 'emp_id'
});
Order.belongsTo(Employee, {
    foreignKey: 'emp_id'
});

Employee.hasMany(Contact, {
    foreignKey: 'emp_id'
});
Contact.belongsTo(Employee, {
    foreignKey: 'emp_id'
});

Position.hasMany(Attribute, {
    foreignKey: 'position_id'
});
Attribute.belongsTo(Position, {
    foreignKey: 'position_id'
});
Position.belongsTo(Type, {
    foreignKey: 'type_id'
});
Position.belongsTo(Grape, {
    foreignKey: 'grape_id'
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

Position.belongsToMany(Cart, {through: 'cart_position', foreignKey: 'position_id'});

Cart.belongsToMany(Position, {through: 'cart_position', foreignKey: 'cart_id'})

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
        const third = await Cart.findByPk(instance.cart_id);
        const fourth = await Address.findByPk(instance.address_id);
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

Employee.addHook('beforeCreate', async (instance) => {
    if (!instance.login) {
        throw new Error('login must be provided');
    } else {
        const employeeRow = await Employee.findAll({where: {login: instance.login} });

        if (employeeRow.length > 0) {
            throw new Error('Employee already exits');
        }
    }
});
module.exports = {
    Customer, Employee, Position, Attribute, Contact, Address, Order, Cart, Cart_position, Grape, Type
}