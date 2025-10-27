import { Router } from "express";
import { authenticate } from "../middleware/jwt.js";
import * as user from "../controllers/userController.js";

const userRouter = Router();

userRouter
  .post("/register", user.registeration)
  .post("/login", user.login)
  .get("/currentUser", authenticate, user.getCurrentUser)
  .put("/balance", authenticate, user.balance);

export default userRouter;
