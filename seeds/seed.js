const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const seed = async () => {
    await User.bulkCreate(userData);
    await Post.bulkCreate(postData);
    await Comment.bulkCreate(commentData);
    await process.exit(0);
  };

  seed();
};

seedDatabase();
