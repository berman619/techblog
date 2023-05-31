const express = require('express');
const router = express.Router();

router.get('/post/:id', (req, res) => {
    // Get the id from the route params
    const { id } = req.params;
  
    // Find the blog post with this id
    BlogPost.findById(id)
      .then(post => {
        // Render the blogpost view with this post's data
        res.render('blogpost', post);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
  

  router.get('/edit/:id?', (req, res) => {
    if (req.params.id) {
      // Fetch the post with this ID and pass it to the view
    } else {
      // Render the view without passing in any post data
    }
  });
  
  module.exports = router;