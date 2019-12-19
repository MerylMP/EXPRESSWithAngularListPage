var express = require('express');
var router = express.Router();
var users_controller = require('../controllers/usersController');
const { check } = require('express-validator');


// Validation rules array
const valid_user = [
  check('name', 'Error de nombre.')
    .isLength({ min: 3 })
    .matches(/^([^\s]+[^0-9])+$/),

  check('surname', 'Error de apellido')
    .isLength({ min: 3 })
    .matches(/^([^\s]+[^0-9])+$/),

  check('age', 'Error de edad')
    .isInt({ gt: -1, lt: 126 }),
    
  check('dni', 'Error de DNI')
    .matches(/^[0-9]{8}[A-Za-z]{1}$/),

  check('dateOfBirth', 'Error de fecha de cumpleaños. Formato válido: YYYY-MM-DD')
    .isISO8601(),

  check('favouriteColour', 'Error de nombre de color')
    .isLength({ min: 3 })
    .matches(/^([^\s]+[^0-9])+$/),

  check('gender', 'Error de género')
    .isIn(['Hombre', 'Mujer', 'Otro', 'No especificado'])

];

// CREATE User
router.post('/', valid_user, users_controller.users_create);

// READ all users / user
router.get('/', users_controller.users_list);
router.get('/:id', users_controller.getUserById);

// UPDATE user
router.put('/:id', valid_user, users_controller.users_update_one);

// DELETE user
router.delete('/:id', users_controller.users_delete_one);

module.exports = router;