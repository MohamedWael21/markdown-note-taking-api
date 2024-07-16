import "dotenv/config";
import express from "express";
import morgan from "morgan";
import noteRoutes from "./routes/notes.route";
import golbalHandleError from "./utils/global-handle-error";
const app = express();

app.use(morgan("tiny"));

app.use(express.static("./notes-uploaded"));

app.use("/api/notes", noteRoutes);

app.use(golbalHandleError);

app.use("*", (_, res: ExpressResponse) => {
  res.status(404).json({
    status: "error",
    message: "The requested resources not exist",
  });
});
export default app;
