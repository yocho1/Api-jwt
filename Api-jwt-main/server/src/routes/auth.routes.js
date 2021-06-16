const express = require('express');
const { auth } = require('../middlewares/auth.middlewares');

const authRoutes = express.Router();
const {
  registerController,
  loginController,
  logoutController,
  updatePassword,
  usersController,
} = require('../controllers/auth.controllers');

authRoutes.post('/register', registerController);
authRoutes.post('/login', loginController);
authRoutes.post('/updatepassword/:id', updatePassword);
authRoutes.post('/allusers', usersController);
authRoutes.get('/logout', logoutController);

module.exports = authRoutes;
