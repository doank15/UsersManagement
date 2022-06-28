const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

// create, find, delete, update

//Router

// View
router.get('/', userController.view)
// Find
router.post('/user', userController.find)
// New User
router.get('/views/add-user', userController.form)
// Add User
router.post('/views/add-user', userController.addUSer);
// Edit User by Id
router.get('/views/edit-user/:id', userController.editUser);
// Update User from Edit User
router.post('/views/edit-user/:id', userController.updateUser);
// Delete User By ID 
router.get('/:id', userController.deleteUser);
module.exports = router