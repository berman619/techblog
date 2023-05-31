const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // render dashboard with user's blog posts
  });
  
  router.delete('/:id', (req, res) => {
    // delete a blog post
  });

  module.exports = router;