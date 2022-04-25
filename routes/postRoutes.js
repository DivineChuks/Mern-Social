import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import auth from "../middleware/auth.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// @route    POST api/post
// @desc     Create a new post
// @access   private

router.post(
  "/",
  [auth, [body("text", "Post is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      return res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const post = await Post.find().sort({ date: -1 });
    return res.json(post);
  } catch (error) {
    console.error(error.message);
  }
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.json({ msg: "There is no post for this user" });
    }
    return res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
    if (error.kind == "ObjectId") {
      return res.json({ msg: "There is no post for this user" });
    }
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id) {
      return res.json({ msg: "User not authorized" });
    }
    await post.remove();

    return res.json({ msg: "Post deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() == req.user.id).length >
      0
    ) {
      return res.json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

// @route   PUT api/posts/unlike/:id
// @desc    Like a post
// @access  Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.json({ msg: "Post has not been liked yet" });
    }
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );
    await post.save();
    return res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "objectId") {
      return res.json({ msg: "Post not found" });
    }
    res.status(500).send("server error");
  }
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private

router.post(
  "/comment/:id",
  [auth, [body("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ error: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      console.log(req.body.text);
      post.comments.unshift(newComment);
      await post.save();
      return res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   DELETE api/post/comment/:id/:comment_id
// @desc    Delete comment from post
// @access  Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // Remove comment
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    if (req.user.id !== comment.user.toString()) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    post.comments = post.comments.filter(
      (comment) => comment.id !== req.params.comment_id
    );
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      res.status(401).json({ msg: "Comment not found" });
    }
    res.status(500).send("Server Error");
  }
});

export default router;

// https://github.com/omeramiel/DevConnector/blob/master/routes/api/posts.js
