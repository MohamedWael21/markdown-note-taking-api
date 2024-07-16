import AppError from "../utils/app-error";
import { catchAsyncError } from "../utils/catch-async-error";
import fs from "fs/promises";

const LIMIT_OF_CHARACTERS = 4000;

const validateFileExist = catchAsyncError(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("Please provide file to process", 400));
  }

  next();
});

const parseFileContent = catchAsyncError(async (req, res, next) => {
  if (!req.file) return next();
  const textContent = await fs.readFile(req.file.path, { encoding: "utf-8" });

  if (textContent.split("").length > LIMIT_OF_CHARACTERS) {
    return next(new AppError("Can't process more than 4k characters", 400));
  }
  if (!textContent) {
    return next(new AppError("No content has been provided", 400));
  }
  req.textContent = textContent;

  next();
});

const removeFile = catchAsyncError(async (req, res, next) => {
  if (req.file) {
    await fs.unlink(req.file.path); // delete file after processing
  }

  next();
});

export { validateFileExist, parseFileContent, removeFile };
