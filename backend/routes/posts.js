const router = require('express').Router()
const {
    newPost,
    allPosts,
    postBySlug,
    postsBySub
} = require('../controllers/posts')

const {
    newComment
} = require('../controllers/comments')

router.get("/", allPosts)
router.get("/r/:sub", postsBySub)
router.get("/r/:sub/:slug", postBySlug)
router.post("/new", newPost)
router.post("/:postId/comments/new", newComment)

module.exports = router
