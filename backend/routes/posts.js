import { Router } from "express"
import {
    newPost,
    allPosts,
} from "../controllers/posts"

const router = Router()

router.get("/", allPosts)
router.post("/new", newPost)

module.exports = router
