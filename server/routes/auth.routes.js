// routes/auth.routes.js
import express from "express";
import {
  signup,
  login,
  logout,
  checkAuth,
  bookmark,
  fetchbookmarks,
  deletebookmark,
  adddicussion,
  fetchDiscussion,
  deleteDiscussion,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// 🔓 Public Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/bookmark", bookmark);
router.get("/fetch-bookmark", fetchbookmarks);
router.delete("/delete-bookmark", deletebookmark);
router.post("/add-discussion", adddicussion);
router.get("/fetch-discussion", fetchDiscussion);
router.delete("/delete-discussion", deleteDiscussion);

// ✅ Protected Route
router.get("/check-auth", protectRoute, checkAuth);

export default router;