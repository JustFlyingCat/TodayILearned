const express = require('express');
const router = express.Router();

//Get posts listed
router.get('/', function(req, res) {
    res.send('list of posts');
});
//call a certain post
router.get('/:postId', function(req, res) {
    res.send("the post '" + req.params.postId + "' does not exsist");
});

module.exports = router;