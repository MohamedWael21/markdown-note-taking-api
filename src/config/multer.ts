import multer from "multer";
import AppError from "../utils/app-error";

const storage: multer.StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOAD_FOLDER_PATH!);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const options: multer.Options = {
  storage,
  // reject any file that not in markdwon format
  fileFilter: (req, file, cb) => {
    if (file.mimetype != "text/markdown") {
      return cb(new AppError("Please provide makrdown file", 400));
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1000_000, // 1MB
  },
};

const upload = multer(options);

export default upload;
