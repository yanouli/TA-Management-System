import express from 'express';
import { getAllTAs, addCourseQuota, getAllCourseQs, addTAC, getAllTACs, getAllTACourses, register, deleteTA, helper} from '../controllers/TAController';
import multer from "multer";

const upload = multer();
const router = express.Router();

router.route("/").get(getAllTAs);
router.route("/courseQ").get(getAllCourseQs);
router.route("/tac").get(getAllTACs);
router.route("/tacourse").get(getAllTACourses);
router.route("/uploadCQ").post(upload.single("csvFile"), addCourseQuota);
router.route("/uploadTAC").post(upload.single("csvFile"), addTAC);
router.route("/register").post(register);
router.route("/deleteTA").delete(deleteTA);
router.route("/getAll").post(helper);

export default router;