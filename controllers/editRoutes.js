const express = require('express');
const router = express.Router();
const { BlogPost } = require('../models');
const { isLoggedIn } = require('../middlewares');

router.get('/:id?', isLoggedIn, (req, res) => {
    if (req.params.id) {
        BlogPost.findOne({
            where: {
                id: req.params.id,
                user_id: req.session.user.id
            }
        })
        .then(blogPost => {
            if (blogPost) {
                res.render('edit', { blogPost });
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Error retrieving blog post' });
        });
    } else {
        res.render('edit');
    }
});

router.post('/', isLoggedIn, (req, res) => {
    BlogPost.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user.id
    })
    .then(blogPost => {
        res.redirect('/dashboard');
    })
    .catch(err => {
        res.status(500).json({ message: 'Error creating blog post' });
    });
});

router.put('/:id', isLoggedIn, (req, res) => {
    BlogPost.update({
        title: req.body.title,
        content: req.body.content,
    }, {
        where: {
            id: req.params.id,
            user_id: req.session.user.id
        }
    })
    .then(updated => {
        if (updated[0] > 0) {
            res.status(200).json({ message: 'Blog post updated successfully' });
        } else {
            res.status(404).json({ message: 'Blog post not found' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Error updating blog post' });
    });
});

module.exports = router;