const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

//Get posts listed
router.get('/', postController.index);
//call a certain post
router.get('/:userId-:postId', postController.post);
//post on a certain post
router.post('/:userId-:postId', postController.deletePost);
//call the create Post form
router.get('/create', postController.create);
//creation of a new post
router.post('/create', postController.submit);

module.exports = router;