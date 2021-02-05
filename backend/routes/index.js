const router = require('express').Router();

router.use('/posts', require('./posts'));
router.get('/', function(req, res) {
    return res.send("success")
})
module.exports = router;
