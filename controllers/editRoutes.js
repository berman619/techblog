const express = require('express');
const router = express.Router();

router.get('/edit/:id?', (req, res) => {
    // render edit page with or without existing post data
  });
  
  router.post('/edit', (req, res) => {
    // create new blog post
  });
  
  router.put('/edit/:id', (req, res) => {
    // update a blog post
  });  

  module.exports = router;