const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Route to render the create account page
router.get('/', (req, res) => {
  res.render('createaccount');
});

// Route to create a new account
router.post('/', (req, res) => {
  const { username, password } = req.body;
  console.log(`Username: ${username}, Password: ${password}`);

  // Check if username and email are unique
  User.findOne({ where: { username } })
    .then(user => {
      console.log(`User: ${JSON.stringify(user)}`);
      if (user) {
        if (user.username === username) {
          console.log('Username already taken');
          res.redirect('/create-account?error=Username already taken');
        }
      } else {
        // Create new user in the database
        User.create({ username, password })
        .then(() => {
            res.redirect('/login'); // redirect to the login page
          })
          .catch(error => {
              console.error(error);
              res.status(500).json({ message: 'Internal server error' });
          });
      }
    })
    .catch(error => {
      console.error(error);
      console.log(JSON.stringify(req.body));
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
