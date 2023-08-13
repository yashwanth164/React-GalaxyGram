const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const userRoute=require("./routes/users");
const authRoute=require("./routes/auth");
const postRoute=require("./routes/posts");
const multer=require("multer");


const app=express();
dotenv.config();
async function connectToDB() {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to DB");
    } catch (error) {
      console.error("Error connecting to DB:", error.message);
    }
  }
connectToDB();

//CORS
app.use(function (req, res, next) {
  // Allow cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});


//for parsing the post requests
app.use(express.json());
//for secure development and setting security headers
app.use(helmet());
//Logs message on the console when ever a request is made to the server.
app.use(morgan("common"));

//post uploading
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"./public/images");
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name);
  },
});
const upload=multer({ storage: storage });
app.post("/api/upload",upload.single("file"), (req,res)=>{
  try{
    return res.status(200).json("File uploaded successfully");
  }catch(err){
    console.log(err);
  }
});

//Routers
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);


app.listen(8800, ()=>{
    console.log("Backend Server is running")
})

