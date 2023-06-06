const express = require('express');
const router = express.Router();
const { Blogpost, Comment, User } = require('../models');
const commentRoutes = require('./commentRoutes');

router.use('/:id/comments', commentRoutes);

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Blogpost.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['username']
      },
      {
        model: Comment,
        as: 'comments',
        include: [
          {
            model: User,
            attributes: ['username'],
            as: 'user'
          }
        ]
      }
    ]
  })
  .then(blogPost => {
    if (blogPost) {
      const blogPostPlain = blogPost.get({ plain: true });
      res.render('blogpost', { blogPost: blogPostPlain, loggedIn: req.session.loggedIn });
    } else {
      res.status(404).send('Blog post not found');
    }
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  });
});

module.exports = router;
