const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Route to render the create account page
router.get('/', (req, res) => {
  res.render('createaccount');
});

// Route to create a new account
router.post('/create-account', (req, res) => {
    const { username, password } = req.body;
    // Check if username is unique
    User.findOne({ where: { username } })
      .then(user => {
        if (user) {
          // Username already taken
          res.redirect('/create-account?error=Username already taken');
        } else {
          // Create new user in the database
          User.create({ username, password })
          .then(newUser => {
              req.session.userId = newUser.id;
              req.session.loggedIn = true;
  
              req.session.save(() => {
                  res.redirect('/dashboard'); // redirect to the dashboard page
              });
          })
          .catch(error => {
              console.error('Error:', error);
              res.status(500).json({ message: 'Internal server error' });
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      });
  });  

module.exports = router;
