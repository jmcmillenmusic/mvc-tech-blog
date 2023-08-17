const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// The '/api/posts' endpoint
router.get('/api/posts', (req, res) => res.json( { User, Post, Comment } ));

// GET all posts
router.get('/', async (req, res) => {
  try {
    const postsData = await Post.findAll({
      include: [{model: Comment}]
    });
    res.status(200).json(postsData);
    // Testing purposes only
    // console.info(`${req.method} request received`);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one post by 'id'
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, {model: Comment}]
    });
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    res.status(200).json(postData);
    // Testing purposes only
    // console.info(`${req.method} request received`);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new post when a user is logged in
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a post by its 'id' value when the user is logged in
router.put('/:id', withAuth, async (req, res) => {
  try {
    await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })
    const postData = await Post.findByPk(req.params.id);
    if (!postData) {
      res.status(404).json({ message: 'No post with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a post when the user is logged in
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
