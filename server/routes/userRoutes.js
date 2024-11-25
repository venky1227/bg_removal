import express from "express";
import { clerkWebhooks } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post("/api/user/webhooks",clerkWebhooks)

export default userRouter