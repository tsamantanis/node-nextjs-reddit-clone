import { Router } from "express"
import {
    newPost
} from "../controllers/posts"

const router = Router()

router.post("/new", newPost);

module.exports = router;
