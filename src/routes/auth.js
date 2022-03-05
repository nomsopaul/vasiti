const express = require('express');
const router = express.Router();
const bcrypt = require ('bcryptjs');
const jsonwt = require ('jsonwebtoken');
const passport = require ('passport');
const key = require('../../setup/db');



// import schema for Person to Register
const User = require ('../models/User.js');

//@type POST
//@route /api/auth/login
//@desc  route for login of users
//@ access PUBLIC

router.post ('/register', (req, res) => {
  User.findOne ({email: req.body.email})
    .then (user => {
      if (user) {
        return res
          .status (400)
          .json ({emailerror: 'Email already exists in our Database!'});
      } else {
        const newUser = new User ({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        //encrypt password using bcryptjs
        bcrypt.genSalt (10, (err, salt) => {
          bcrypt.hash (newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save ()
              .then (user => res.json (user))
              .catch (err => console.log (err));
          });
        });
      }
    })
    .catch (err => console.log (err));
});

//@type POST
//@route /api/auth/login
//@desc  route for login of users
//@ access PUBLIC

router.post ('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne ({email})
    .then (user => {
      if (!user) {
        return res.status (404).json ({emailerror: 'User not found'});
      }
      bcrypt
        .compare (password, person.password)
        .then (isCorrect => {
          if (isCorrect) {
            // res.json({success: 'User can login successfully'});
            //use payload and create token for user
            const payload = {
              id: user.id,
              name: user.name,
              email: user.email,
            };
            jsonwt.sign (
              payload,
              key.secret,
              {expiresIn: 3600},
              (err, token) => {
                res.json ({
                  success: true,
                  token: 'Bearer ' + token,
                });
              }
            );
          } else {
            res.status (400).json ({passworderror: 'Invalid password'});
          }
        })
        .catch (err => console.log (err));
    })
    .catch (err => console.log (err));
});

//@type GET
//@route /api/auth/profile
//@desc  route for user profile
//@ access PRIVATE

router.get (
  '/profile',
  passport.authenticate ('jwt', {session: false}),
  (req, res) => {
    // console.log(req);
    res.json ({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;