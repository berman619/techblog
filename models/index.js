const User = require('./user');
const Blogpost = require('./blogpost');
const Comment = require('./Comment');

// Set up associations
User.hasMany(Blogpost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Blogpost.belongsTo(User, {
  foreignKey: 'user_id',
});

Blogpost.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Blogpost, {
  foreignKey: 'blog_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Blogpost, Comment };