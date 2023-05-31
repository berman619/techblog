const express = require('express');
const router = express.Router();

router.get('/', isLoggedIn, (req, res) => {
  BlogPost.findAll({
      where: {
          user_id: req.session.user.id
      }
  })
  .then(blogPosts => {
      res.render('dashboard', { blogPosts });
  })
  .catch(err => {
      res.status(500).json({ message: 'Error retrieving blog posts' });
  });
});
  
router.delete('/:id', isLoggedIn, (req, res) => {
  BlogPost.destroy({
      where: {
          id: req.params.id,
          user_id: req.session.user.id
      }
  })
  .then(deleted => {
      if (deleted) {
          res.status(200).json({ message: 'Blog post deleted successfully' });
      } else {
          res.status(404).json({ message: 'Blog post not found' });
      }
  })
  .catch(err => {
      res.status(500).json({ message: 'Error deleting blog post' });
  });
});

module.exports = router;