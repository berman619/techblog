const express = require('express');
const router = express.Router();
const { Blogpost } = require('../models');

router.get('/', (req, res) => {
  Blogpost.findAll()
      .then(blogposts => {
          const serializedBlogposts = blogposts.map(blogpost => blogpost.get({ plain: true }));
          res.render('home', { blogposts: serializedBlogposts });
      })
      .catch(error => {
          console.error('Error:', error);
          res.status(500).json({ message: 'Internal server error' });
      });
});

module.exports = router;