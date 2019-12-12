const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

// Register
exports.signup = (req,res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        })
    });
};

// Login
exports.signin = (req,res) => {
    // Find user based on email
    const {email, password} = req.body;
    User.findOne({email}, (err, user) => {
        // If no user, send error.
        if (err || !user){
            return res.status(400).json({
                error: 'User with that email does not exist.'
            })
        }
        // If user, ensure email/password match.
        if (!user.authenticate(password)){
            return res.status(401).json({
                error: 'Invalid login.'
            })
        }

        // Gen token with user id + secret.
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

        // Persist token in cookie w expiry date
        res.cookie('t', token, {expire: new Date() + 99999 });

        // Return user + token to fe.
        const { _id, name, role } = user;
        return res.json({
            token,
            user: {_id, email, name, role}
        })
    });
};

// Signout
exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({
        message: "User signed out"
    })
};

// METHOD: Middleware Require Sign in
exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});

// METHOD: Is Authenticated
exports.isAuth = (req,res,next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user){
      return res.status(403).json({
          error: 'Access denied.'
      })
  }
  next();
};

// METHOD: Is Admin
exports.isAdmin = (req,res,next) => {
    // Check if user is admin
    // Admin role value is 1. Public user role is 0
    if ((req.profile.role === 0)){
      return res.status(403).json({
          error: 'Admin Resource. Access denied'
      })
    }
    next();
};