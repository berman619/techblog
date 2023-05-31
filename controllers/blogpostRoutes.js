const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
    const { id } = req.params;
    BlogPost.findById(id)
      .then(post => {
        res.render('blogpost', post);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
  
  router.get('/post/:id', (req, res) => {
    BlogPost.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then((blogPost) => {
      if (blogPost) {
        res.render('post', { blogPost: blogPost }); 
      } else {
        res.status(404).send('Blog post not found');
      }
    })
    .catch((err) => {
      res.status(500).send('Server error');
    });
  });
  
  module.exports = router;