/* eslint-disable no-unused-vars */
const router = require('express').Router();
const UserController = require('../controllers/userController.js');

const controller = new UserController();

router
  .route('/')
  .get(controller.checkAuth);

router
  .route('/login')
  .post(controller.authUser);

router
  .route('/register')
  .post(controller.registerUser);

router
  .route('/logout')
  .get(controller.logoutUser);

module.exports = router;
