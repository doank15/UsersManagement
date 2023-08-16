const express = require('express');
const router = express.Router();
const userController = require('../controllers/User')
const protectRoute = require('../middleware/protectRoute');

// create, find, delete, update
//Router
// View
router.get('/',protectRoute, userController.view)
// view user 
router.get('/views/view-user/:id', userController.viewUser);
// Find
router.post('/user', userController.find)
// New User
router.get('/views/add-user',protectRoute,userController.form)
// Add User
router.post('/views/add-user',protectRoute,userController.addUSer);
// Edit User by Id
router.get('/views/edit-user/:id',protectRoute, userController.editUser);
// Update User from Edit User
router.post('/views/edit-user/:id', protectRoute, userController.updateUser);
// Delete User By ID 
router.get('/:id',protectRoute,userController.deleteUser);

// send email
router.get('/views/sendEmail/:id', protectRoute, userController.sendEmail);
router.post('/views/sendEmail',protectRoute,userController.sendEmailToUser);
module.exports = router;