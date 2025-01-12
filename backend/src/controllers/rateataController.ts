import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import RateATA from "../models/RateATA";

// @Desc Add rate a TA
// @Method POST
export const addRateATA = asyncHandler(async (req: Request, res: Response) => {
    const { course, ta, score, comment } = req.body;

    const rateata = new RateATA({ course, ta, score, comment});
    await rateata.save();
    res.status(201).json({
        id: rateata._id,
        course: rateata.course,
        ta: rateata.ta,
        score: rateata.score,
        comment: rateata.comment
    });
});