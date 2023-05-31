const express = require('express');
const router = express.Router();

const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const loginRoutes = require('./loginRoutes');
const signupRoutes = require('./signupRoutes');
const blogpostRoutes = require('./blogpostRoutes');
const editRoutes = require('./editRoutes');

router.use('/home', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);
router.use('/post', blogpostRoutes);
router.use('/edit', editRoutes);

module.exports = router;