const express = require('express');
const router = express.Router();

router.get('/:id?', (req, res) => {
    // render edit page with or without existing post data
  });
  
  router.post('/', (req, res) => {
    // create new blog post
  });
  
  router.put('/:id', (req, res) => {
    // update a blog post
  });  

  module.exports = router;