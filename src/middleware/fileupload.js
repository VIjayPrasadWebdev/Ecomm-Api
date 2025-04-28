import multer from "multer";

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    let filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

export let fileUpload = multer({ storage: storage });
