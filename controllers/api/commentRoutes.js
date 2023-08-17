const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// The '/api/comments' endpoint
router.get('/api/comments', (req, res) => res.json( { User, Post, Comment } ));

// GET all comments
router.get('/', async (req, res) => {
  try {
    const commentsData = await Comment.findAll({
      // include: [{model: Comment}]
    });
    res.status(200).json(commentsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new comment when a user is logged in
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a comment by its 'id' value when the user is logged in
router.put('/:id', withAuth, async (req, res) => {
  try {
    await Comment.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    })
    const commentData = await Comment.findByPk(req.params.id);
    if (!commentData) {
      res.status(404).json({ message: 'No comment with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a comment when the user is logged in
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
