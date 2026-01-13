import express from "express";
import cors from "cors";
import { connectDB } from "./DB/Database.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// 1) Connect to MongoDB
connectDB();

// 2) Body parser (must come before routes)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 3) CORS — allow your three origins and handle preflight
const allowedOrigins = [
  "https://main.d1sj7cd70hlter.amplifyapp.com",
  "https://expense-tracker-app-three-beryl.vercel.app",
  "http://localhost:3000"
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"), false);
    },
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
    credentials: true
  })
);
// ensure preflight is handled
app.options("*", cors());

// 4) Security & logging
app.use(helmet());
app.use(morgan("dev"));

// 5) Debug ping (test this!)
app.get("/api/auth/ping", (req, res) => {
  res.json({ ok: true, route: "ping" });
});

// 6) Mount your routers
app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

// 7) Root health-check
app.get("/", (req, res) => res.send("🔥 API up!"));

// 8) Error handler for CORS
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ success: false, message: err.message });
  }
  next(err);
});

// 9) Start server
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
