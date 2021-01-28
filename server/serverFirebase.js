const express=require('express')
const compression=require('compression')
const path=require('path')
const app = express()

//upload picture
const saltedMd5=require('salted-md5')
const path=require('path');
const multer=require('multer')
const upload=multer({storage: multer.memoryStorage()})
require('dotenv').config()


// view engine setup
app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(express.json());
app.use(compression())
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))

//
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BUCKET_URL
});
app.locals.bucket = admin.storage().bucket()

app.post('/upload',upload.single('file'),async(req,res)=>{
    const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!')
    const fileName = name + path.extname(req.file.originalname)
    await app.locals.bucket.file(fileName).createWriteStream().end(req.file.buffer)
    res.send('done');
    })