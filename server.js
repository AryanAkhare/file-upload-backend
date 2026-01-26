//app create
const express=require('express')

const app=express()

//port find
require('dotenv').config()
const PORT=process.env.PORT

//middleware
app.use(express.json())
const fileupload=require("express-fileupload")
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))

//db connect
const db=require("./config/database")
db.connect();
//cloud connect
const cloudinary=require("./config/cloudinary")
cloudinary.cloudinaryConnect();


//api route mont
const Upload=require("./routes/FileUpload")
app.use('/api/v1/upload', Upload);

//activate server
app.listen(PORT,()=>{
    console.log(`App running at ${PORT}`)
})
