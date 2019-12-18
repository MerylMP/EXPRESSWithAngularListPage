const { validationResult } = require('express-validator');
var db = require('../db/db');
var ObjectId = require('mongodb').ObjectId;

// Display all users
module.exports.users_list = function (req, res, next) {

    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }

    db.get().db('apidb').collection('users').find().toArray(function (err, result) {
        if (err) {
            next(new Error('Error al obtener la lista de usuarios.'));
            return;
        } else {
            res.send(result);
        }
    });
};


// Display one user
module.exports.getUserById = function (req, res, next) {

    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }

    db.get().db('apidb').collection('users').find({ _id: ObjectId(req.params.id) }).toArray(function (err, result) {
        if (err) {
            next(new Error('Error al listar usuario.'));
            return;
        } else {
            res.send(result);
        }
    });
};


// Create user
module.exports.users_create = function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const user = {};
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.age = req.body.age;
    user.dni = req.body.dni;
    user.dateOfBirth = req.body.dateOfBirth;
    user.favouriteColour = req.body.favouriteColour;
    user.gender = req.body.gender;
    user.notes = req.body.notes;

    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }

    db.get().db('apidb').collection('users').insertOne(user, function (err, result) {
        if (err) {
            next(new Error('Error al crear usuario'));
            return;

        } else {
            res.send(result);
        }
    });
};


// Update user
module.exports.users_update_one = function (req, res, next) {

    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }

    const filter = { _id: ObjectId(req.params.id) };
    const update = {
        $set: {
            name: req.body.name,
            surname: req.body.surname,
            age: req.body.age,
            dni: req.body.dni,
            dateOfBirth: req.body.dateOfBirth,
            favouriteColour: req.body.favouriteColour,
            gender: req.body.gender,
            notes: req.body.notes
        }
    };

    db.get().db('apidb').collection('users').updateOne(filter, update, function (err, result) {
        if (err) {
            next(new Error('Error al actualizar usuario.'));
            return;
        } else {
            res.send(result);
        }
    });
};


// Delete users
module.exports.users_delete_one = function (req, res, next) {

    if (db.get() === null) {
        next(new Error('La conexión no está establecida'));
        return;
    }

    const filter = { _id: ObjectId(req.params.id) };
    db.get().db('apidb').collection('users').deleteOne(filter, function (err, result) {
        if (err) {
            next(new Error('Error al eliminar usuario.'));
            return
        } else {
            res.send(result);
        }
    });
};