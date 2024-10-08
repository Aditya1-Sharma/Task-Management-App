import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/userController.js";
import {
  createtask,
  deleteTask,
  getAllTask,
  getTask,
  updateTask,
} from "../controller/taskController.js";
import {
  generateShortURL,
  getAnalytics,
  redirectURL,
} from "../controller/urlController.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: [1, "Cannot upload more than one "],
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);

// Task Routes Started
router.route("/create").post(verifyJWT, createtask);
router.route("/getTask/:taskId").get(verifyJWT, getTask);
router.route("/update/:taskId").put(verifyJWT, updateTask);
router.route("/getAllTask").get(verifyJWT, getAllTask);
router.route("/deleteTask/:taskId").delete(verifyJWT, deleteTask);

// Routes for url shortner

router.route("/url").post(generateShortURL);

router.route("/url/:shortId").get(redirectURL);

router.route("/url/ana/:shortId").get(verifyJWT, getAnalytics);
export default router;
