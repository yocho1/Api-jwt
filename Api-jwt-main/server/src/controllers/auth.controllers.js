/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const xelor = require('../utiles');
const User = require('../models/user.models');
const {
  registerValidations,
  loginValidations,
  updateValidations,
} = require('../validations/auth.validations');

exports.registerController = async (req, res) => {
  const { error } = registerValidations(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) return res.status(400).json(`${req.body.email} existant`);
  const newUser = new User({ ...req.body });
  // envoi password par mail
  const hashedpassword = await bcrypt.hash(req.body.password, 12);
  newUser.password = hashedpassword;
  const saveUser = newUser.save();
  if (saveUser) return res.status(201).json('loged');
};
exports.loginController = async (req, res) => {
  // console.log(req.body);
  const { error } = loginValidations(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const userExist = await User.findOne({ email: req.body.email });

  if (
    !userExist ||
    !(await bcrypt.compare(req.body.password, userExist.password))
  )
    return res.status(400).json('identifiant ou password incorect');
  if (userExist.enabled === false)
    return res.status(200).json({ enabled: false, id: userExist._id });
  const token = jwt.sign(
    { id: userExist._id, role: userExist.role },
    process.env.SECRET_TOKEN,
    {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    }
  );
  return res
    .status(200)
    .cookie('token', token, {
      maxAge: process.env.JWT_EXPIRATION_TIME,
      httpOnly: true,
    })
    .json({ isAuth: true, role: userExist.role });
};

exports.updatePassword = async (req, res) => {
  const { error } = updateValidations(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  console.log(req.params.id);
  const UserExist = await User.findOne({ _id: req.params.id });
  if (!UserExist) return res.status(400).json('Id non Valid');
  const hashedpassword = await bcrypt.hash(req.body.password, 12);
  UserExist.password = hashedpassword;
  UserExist.enabled = true;
  console.log(UserExist);
  const saveUser = await UserExist.save();
  if (saveUser) {
    const token = jwt.sign(
      { id: UserExist._id, role: UserExist.role },
      process.env.SECRET_TOKEN,
      {
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      }
    );
    return res
      .status(200)
      .cookie('token', token, {
        maxAge: process.env.JWT_EXPIRATION_TIME,
        httpOnly: true,
      })
      .json({ isAuth: true, role: UserExist.role });
  }
};
exports.usersController = async (req, res) => {
  const finder = req.body.role ? { role: req.body.role } : {};
  await xelor.getAll(res, User, finder);
};

exports.logoutController = (req, res) =>
  res.clearCookie('token').json({ isAuth: false, role: '' });
