import cors from 'cors';
import express, { Request, Response } from 'express';
import connectDB from "./config/db.config";
import userRoutes from './routes/userRoutes';
import profRoutes from './routes/profRoutes';
import courseRoutes from './routes/courseRoutes';
import taRoutes from './routes/taRoutes';
import rateataRoutes from './routes/rateataRoutes';


const app = express();
const port = 3000;

// Basic express setup
app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/prof", profRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/tas",taRoutes)
app.use("/api/rateata", rateataRoutes);


app.listen(port, () => {
    console.log('Backend is running on port: ' + port)
})

