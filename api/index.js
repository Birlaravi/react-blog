const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const DB =
  "mongodb+srv://ravi:9CeCo5NDnZg82eQt@cluster0.oz1yh.mongodb.net/blog?retryWrites=true&w=majority";

const mongoose = require("mongoose");
// dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))
mongoose
  .connect(DB)
  .then(() => {
    console.log("Backend is running");
  })
  .catch((err) => {
    console.log(err);
  });

//for images upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/routes/auth", authRoute);
app.use("/api/routes/users", userRoute);
app.use("/api/routes/posts", postRoute);
app.use("/api/routes/categories", categoryRoute);

// app.put('/', (req, res) => {    /*used for http request methods */
//   res.send('Hello World ')
// })
app.listen("5000", () => {
  console.log("hello");
});
