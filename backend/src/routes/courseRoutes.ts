import express from 'express';
import { getAllCourses, addCourses, registerCourseFromFile, deleteCourse } from '../controllers/courseController';
import multer from "multer";
const upload = multer();

const router = express.Router();

router.route("/").get(getAllCourses);
router.route("/add").post(addCourses);
router.route("/upload").post(upload.single("csvFile"), registerCourseFromFile);
router.route("/delete").delete(deleteCourse);

export default router;