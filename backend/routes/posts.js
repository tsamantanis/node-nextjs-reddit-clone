const router = require('express').Router()
const {
    newPost,
    allPosts,
    postBySlug
} = require('../controllers/posts')

router.get("/", allPosts)
router.get("/:slug", postBySlug)
router.post("/new", newPost)

module.exports = router
