import express from "express";
import multer from "multer"; // its a middleware

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/*
in html:
<form action="/profile" method="post" enctype="multipart/form-data">
  <input type="file" name="avatar" />
</form>
*/

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 1000000, // in bytes
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(doc|docx|pdf)$/)) {
      return callback(new Error("File must be a PDF!"));
    }

    callback(undefined, true);

    // note:
    // callback(new Error('File must be an image!'));
    // callback(undefined, true); // accept upload
    // callback(undefined, false); // reject upload
  },
});

app.post("/upload", upload.single("avatar"), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send("done");
});

/* Other usage examples:
app.post('/profile', upload.single('avatar'), function (req, res) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res) {
  
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

const uploadMiddleware = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', uploadMiddleware, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})
  */
