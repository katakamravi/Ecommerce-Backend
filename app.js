// var createError = require('http-errors');
var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var route = require('./router');
// var indexRouter = require('./routes/index');
 var usersRouter = require('./routes/users');
 var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb://localhost:27017/";
 var multer  = require('multer');
 var cors = require('cors');
 var bodyParser = require('body-parser')
var app = express();
// var DIR = './uploads/';
 
// var upload = multer({dest: DIR});
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));


 let storage  = multer.diskStorage({
    destination: (req,file, cb) => {
      cb(null , './uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })


let uploadimg = multer({
  storage: storage
});
// var upload = multer({storage:  storage}).single('image');
app.use('/uploads', express.static('uploads'));

app.use('/users', route);

app.use(express.urlencoded({ extended: false }));


app.post('/saveimage', uploadimg.single('image'),function (req, res, next) {
  console.log(req.file);
 console.log(req.body);
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(dberr, db) {
      if (dberr) throw err;
      var dbo = db.db("shopping");
      console.log(req.body);
      console.log(req.file);
      const saveobj = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        image: req.file.path,
        password: req.body.password
      }
      dbo.collection("users").insertOne(saveobj, function(err, resp) {
        if (err) throw err;
       res.send(resp);
        db.close();
      });
    });
   
})
 module.exports = app;
