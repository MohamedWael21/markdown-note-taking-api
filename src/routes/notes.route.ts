import express from "express";
import upload from "../config/multer";
import { check, convert, saveFile } from "../controllers/notes.controller";
import { parseFileContent, removeFile, validateFileExist } from "../middleware/notes";

const router = express.Router();

router.post("/check", upload.single("note"), validateFileExist, parseFileContent, removeFile, check);
router.post("/save", upload.single("note"), validateFileExist, saveFile);
router.post("/convert", upload.single("note"), validateFileExist, parseFileContent, removeFile, convert);

export default router;
