import { Router } from "express"
import {
    newPost,
    allPosts,
    postBySlug
} from "../controllers/posts"

const router = Router()

router.get("/", allPosts)
router.get("/:slug", postBySlug)
router.post("/new", newPost)

module.exports = router
