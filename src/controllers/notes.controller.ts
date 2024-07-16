import { catchAsyncError } from "../utils/catch-async-error";
import * as noteService from "../services/notes.service";

export const check = catchAsyncError(async (req, res, _) => {
  const mistakes = await noteService.checkGrammer(req.textContent!);

  res.status(200).json({
    status: "success",
    data: {
      mistakes,
      totalMistakes: mistakes.length,
    },
  });
});

export const saveFile = catchAsyncError(async (req, res, _) => {
  res.status(200).json({
    status: "success",
    data: {
      fileName: req.file?.filename,
    },
  });
});

export const convert = catchAsyncError(async (req, res, _) => {
  const html = await noteService.convertToHtml(req.textContent!);
  res.status(200).json({
    status: "success",
    data: {
      html,
    },
  });
});
