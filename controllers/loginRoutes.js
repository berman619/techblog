const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user.js');

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/home');
      return;
    }
    res.render('login');
  });

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ where: { username } })
      .then(user => {
        if (user) {
          // Compare the password using bcrypt
          bcrypt.compare(password, user.password)
            .then(match => {
              if (match) {
                // Passwords match
                req.session.userId = user.id;
                req.session.loggedIn = true;
  
                req.session.save(() => {
                  res.redirect('/home'); // redirect to the home page
                });
              } else {
                // Passwords don't match
                res.redirect('/login?error=Invalid password');
              }
            })
            .catch(error => {
              console.error('Error:', error);
              res.status(500).json({ message: 'Internal server error' });
            });
        } else {
          // User not found
          res.redirect('/login?error=User not found');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
  });  

module.exports = router;