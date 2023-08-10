const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  through: {
    model: Post
  }
});

Comment.belongsTo(User, {
  through: {
    model: Post
  }
});

module.exports = { User, Post, Comment };
