import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import TA from "../models/TA";
import CourseQ from "../models/CourseQ";
import { parse } from 'csv-string';
import TAC from "../models/TAC";
import TACourse from "../models/TACourse"

// @Desc Get all Profs
// @Route /api/prof
// @Method GET
export const getAllTAs = asyncHandler(async (req: Request, res: Response) => {
  const tas = await TA.find({});
  res.status(200).json({
    tas
  });
});

export const getAll = asyncHandler(async (req: Request, res: Response) => {
  const g = TACourse.aggregate(
    [
      {
        '$lookup': {
          'from': 'tacs',
          'localField': 'TAName',
          'foreignField': 'TAName',
          'as': 'work'
        }
      }, {
        '$unwind': {
          'path': '$work'
        }
      }
    ])
  const tacourses = await g
  res.status(200).json({
    tacourses
  });
});



export const getAllCourseQs = asyncHandler(async (req: Request, res: Response) => {
  const courseqs = await CourseQ.find({});
  res.status(200).json({
    courseqs
  });
});

export const getAllTACs = asyncHandler(async (req: Request, res: Response) => {
  const tacs = await TAC.find({});
  res.status(200).json({
    tacs
  });
});


export const getAllTACourses = asyncHandler(async (req: Request, res: Response) => {
  const tacourses = await TACourse.find({});
  res.status(200).json({
    tacourses
  });
});
// @Desc Upload course quota csv
// @Route /api/tas/upload
// @Method POST

export const addCourseQuota = asyncHandler(async (req: Request, res: Response) => {
  const csv = req.file;
  if (csv) {
    const fileContent = parse(csv.buffer.toString('utf-8'));
    for (let record of fileContent) {
      const courseq = new CourseQ({
        termYear: record[0],
        courseNum: record[1],
        courseType: record[2],
        courseName: record[3],
        instructorName: record[4],
        courseEnrollment: record[5],
        TAQuota: record[6],
      });
      courseq.save(); // can be made concurrent
    }
  } else {
    res.status(500);
    throw new Error("File upload unsuccessful.");
  }
  res.status(200).json({});
});


export const addTAC = asyncHandler(async (req: Request, res: Response) => {
  const csv = req.file;
  if (csv) {
    const fileContent = parse(csv.buffer.toString('utf-8'));
    for (let record of fileContent) {
      const tac = new TAC({
        termYear: record[0],
        TAName: record[1],
        studentID: record[2],
        legalName: record[3],
        Email: record[4],
        gradUgrad: record[5],
        supervisorName: record[6],
        Priority: record[7],
        Hours: record[8],
        dateApplied: record[9],
        Location: record[10],
        Phone: record[11],
        Degree: record[12],
        courseList: record[13],
        otherCourse: record[14],
        Notes: record[15],
      });
      tac.save(); // can be made concurrent
    }
  } else {
    res.status(500);
    throw new Error("File upload unsuccessful.");
  }
  res.status(200).json({});
});

// @Desc Register TA to a Course
// @Route /api/tas/register
// @Method POST
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { termYear, courseNum, TAName, studentID, assignedHours } = req.body;
  const tacourse = new TACourse({ termYear, courseNum, TAName, studentID, assignedHours });
  await tacourse.save();
  res.status(201).json({
    termYear: tacourse.termYear,
    courseNum: tacourse.courseNum,
    TAName: tacourse.TAName,
    studentID: tacourse.studentID,
    assignedHours: tacourse.assignedHours
  });
})

// @Desc Delete user by ID
// @Route /api/users/:id
// @Method DELETE
export const deleteTA = asyncHandler(async (req: Request, res: Response) => {
  const { TAName, courseNum } = req.body;

  let tacourse = await TACourse.findOne({ TAName });
  if (!tacourse) {
    res.status(404);
    throw new Error("TA not found");
  }
  if (tacourse.courseNum = courseNum) {
    await TACourse.findOneAndDelete({ TAName })
  }
  res.status(201).json({});
})



export const helper = asyncHandler(async (req: Request, res: Response) => {
  const { TAName } = req.body;

  let tacourse = await TACourse.findOne({ TAName });
  let tac = await TAC.findOne({ TAName })
  if (!tacourse && !tac) {
    res.status(404);
    throw new Error("TA not found");
  }
  else if (!tacourse) {
    res.status(200).json({
      tac
    });
  }
  else if (!tac) {
    res.status(200).json({
      tacourse
    });
  }
  else {
    res.status(200).json({
      tac
    });
    res.status(200).json({
      tacourse
    });
  }
})