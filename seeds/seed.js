const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // const users = await User.bulkCreate(userData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  // const createdPosts = [];

  // for (const post of postData) {
  //   await Post.create({
  //     ...post,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  //   createdPosts.push(post);
  // }

  // for (const comment of commentData) {
  //   await Comment.create({
  //     ...comment,
  //     post_id: createdPosts[Math.floor(Math.random() * createdPosts.length)].id,
  //   });
  // }

  const users = [
    {
      "name": "Nostradamus",
      "email": "nostradamus@hotmail.com",
      "password": "password12345"
    },
    {
      "name": "Aristotle",
      "email": "aristotle@gmail.com",
      "password": "password12345"
    },
    {
      "name": "Ptolemy",
      "email": "ptolemy@aol.com",
      "password": "password12345"
    }
  ];

  const posts = [
    {
      "title": "Why MVC is so Important",
      "content": "MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.",
      "user_id": 2,
      "date_created": "04/01/2022"
    },
    {
      "title": "Authentication vs. Authorization",
      "content": "There is a different between authentication and authorization. Authentication means confirming your own identity whereas authorization means being allowed access to the system.",
      "user_id": 3,
      "date_created": "05/15/2022"
    },
    {
      "title": "Object-Relational Mapping",
      "content": "I have really loved learning about ORMs. It's really simplified the way I create queries in SQL.",
      "user_id": 1,
      "date_created": "06/21/2022"
    }
  ];

  const comments = [
    {
      "content": "No kidding! Why did I make this distinction before? Thanks for the clarification!",
      "post_id": 2,
      "user_id": 1,
      "date_created": "05/18/2022"
    },
    {
      "content": "This makes so much sense! Now, I don't have to worry about giant files with 400 lines of code anymore.",
      "post_id": 1,
      "user_id": 3,
      "date_created": "05/18/2022"
    },
    {
      "content": "I was hoping for a workaround to having to type all those nit-picky SQL commands, and I think I've found it.",
      "post_id": 3,
      "user_id": 2,
      "date_created": "05/18/2022"
    }
  ];

  const seed = async () => {
    await User.bulkCreate(users);
    await Post.bulkCreate(posts);
    await Comment.bulkCreate(comments);
    await process.exit(0);
  };

  seed();
};

seedDatabase();
