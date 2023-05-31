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
  