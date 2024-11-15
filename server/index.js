import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import ExpressFormidable from 'express-formidable'
import uploadFileToCloud from './utils/CloudinaryConfig/cloudConfig.js'
import authRouter from './routers/authRouter.js'
import cors from 'cors'
import AppError from './utils/ErrorHandlers/AppError.js'
import filesRouter from './routers/filesRouter.js'

const app = express()
const corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.listen(process.env.PORT, async () => {
    console.log("Server Started at => http://localhost:" + process.env.PORT);
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MONGO_DB connected.")
    } catch (error) {
        console.log("ERROR WHILE CONNECTING TO MONGO_DB\n", error);
        process.exit(1);
        return;
    }
})


app.get("/", async (req, res, next) => {
    return res.send("Server Started...");
})

app.use("/auth", authRouter);
app.use("/files",filesRouter);



app.all("*", (req, res, next) => {
    return next(new AppError(404, "NOT FOUND"));
})
app.use((error, req, res, next) => {
    const { status = 500, message = "INTERNAL SERVER ERROR" } = error;
    return res.status(status).json({
        message
    })
})
