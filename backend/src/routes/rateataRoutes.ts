import express from "express";
import { addRateATA } from "../controllers/rateataController";
import multer from "multer";

const upload = multer();

const router = express.Router();

router.route("/add").post(addRateATA);

export default router;