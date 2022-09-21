const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/add-user', userController.postAddUser);

router.get('/show-users', userController.getAllUsers);

router.delete('/user/:id', userController.deleteUser);

module.exports = router;