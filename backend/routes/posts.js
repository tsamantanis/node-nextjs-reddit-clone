const router = require('express').Router()
const {
    newPost,
    allPosts,
    postBySlug,
    postsBySub
} = require('../controllers/posts')

router.get("/", allPosts)
router.get("/r/:sub", postsBySub)
router.get("/r/:sub/:slug", postBySlug)
router.post("/new", newPost)

module.exports = router
