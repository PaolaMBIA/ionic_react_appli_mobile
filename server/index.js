const express=require('express')
const compression=require('compression')
const path=require('path')
const app = express()

const cors = require("cors");

//upload picture
const saltedMd5=require('salted-md5')
//const path=require('path');
const multer=require('multer')
const upload=multer({storage: multer.memoryStorage()})
require('dotenv').config()

const uuid = require('uuid-v4');


// view engine setup
app.set('views', path.join(__dirname, 'static', 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(express.json());
app.use(compression())
app.use('/public', express.static(path.join(__dirname, 'static', 'public')))

app.use(cors());

//
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BUCKET_URL
});
app.locals.bucket = admin.storage().bucket()

//post user info in the cloud firebase
let st = admin.storage();
let db=admin.firestore();

app.post('/data',async (req,res)=>{
    let docRef=db.collection('users')
    await docRef.add({
        pseudo: req.body.users.pseudo,
        email: req.body.users.email,
        password: req.body.users.password,
        //pictureProfil: req.body.user.pictureProfil
    });
    res.send('done');
})

//get all user
app.get('/getAllUser', async (req, res) => {
    let usr=[]
     const users = await db.collection('users').get()
    if (users.docs.length > 0) {
      for (const user of users.docs) {
       usr.push(user.data())
    }}
    res.json(usr)
  })
  

//post user post
app.post('/dataPost',async (req,res)=>{
  let docRef = db.collection('posts')
  

  const resultDoc = await docRef.add({
      id: Math.random().toString(36).substr(2, 9), 
      picturePost: req.body.picturePost,
      title: req.body.title,
      overview: req.body.overview,
      timestamp: new Date().toISOString(),
      comments: [],
      likers:[]
  });


  const resultDocSnapshot = await resultDoc.get()
  console.log({ id: resultDoc.id, ...resultDocSnapshot.data() });
    

})


//ND06u6aGXdaBP6bU5B2F 
//patch data
app.get('/patchComments/:idPost', async (req, res) => {
    let post=[]
    const myPosts = await db.collection('posts').doc(req.params.idPost).get()
    
    try {
      if (myPosts.docs.length > 0) {
          for (const user of myPosts.docs) {
            post.push(user.data())
          }
          res.send(post) 
      } else {
          res.send(404)
      }
       
  } catch (err) {
      res.send(err);
}

})
  

//get all data
app.get('/getAllPosts', async (req, res) => {
    let post=[]
    const myPosts = await db.collection('posts').get()
    try {
        if (myPosts.docs.length > 0) {
            for (const user of myPosts.docs) {
              post.push(user.data())
            }
            res.send(post) 
        } else {
            res.send(404)
        }
         
    } catch (err) {
        res.send(err);
  }

})
  
  
//get specific data
app.get('/getSpecificPost/:title', async (req, res) => {
    let post = [];
    //const query = { 'first_name': { $regex: new RegExp(`^${req.params.title}`), $options: 'i' } };

    const myPosts = await db.collection('posts').where('title', '>=', req.params.title).where('title', '<=', req.params.title + '\uf8ff').get(); 
  

    try {
        if (myPosts.docs.length > 0) {
            for (const userPost of myPosts.docs) {
              post.push(userPost.data())     
            }
           // res.send(post)
          } else {
              res.send(404)
          }
    } catch (err) {
        res.send(err)
    }

    
}) 

app.post('/upload/', async (req, res) => {
     
    let filename = `C:/Users/mbiap/Pictures/Camera Roll/image.jpeg`

    async function uploadFile() {
    
      const metadata = {
        metadata: {
          // This line is very important. It's to create a download token.
          firebaseStorageDownloadTokens: uuid()
        },
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
      };
    
      // Uploads a local file to the bucket
     const done = await app.locals.bucket.upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        metadata: metadata,
      });
    
    res.send(done);
    
    }
    
    uploadFile().catch(console.error);
     
     })

app.listen(4000, () => console.log("The server is running at PORT 4000"));
