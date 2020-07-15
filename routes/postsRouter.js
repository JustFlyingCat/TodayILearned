const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

//Get posts listed
router.get('/', postController.index);
//call a certain post
router.get('/:userId+:postId', postController.post);

module.exports = router;