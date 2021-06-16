const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

exports.auth = (Role) => (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedtoken) => {
      if (!err && decodedtoken.role === Role) {
        res.currentUser = await User.findOne({ _id: decodedtoken.id }).select(
          '-password -enabled'
        );
        next();
      } else {
        return res
          .clearCookie('token')
          .json({ isAuth: false, role: '', ifError: 'ifError' });
      }
    });
  } else {
    return res.json({ isAuth: false, role: '', ifNotToken: 'ifNotToken' });
  }
};
