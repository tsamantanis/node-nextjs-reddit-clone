const router = require('express').Router();

router.use('/posts', require('./posts'));

module.exports = router;
