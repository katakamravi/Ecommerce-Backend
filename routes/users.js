var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
exports.users_list =(req,res) => {
  MongoClient.connect(url,{ useUnifiedTopology: true }, function(dberr, db) {
    if (dberr) throw err;
    var dbo = db.db("shopping");
    dbo.collection("users").find({}).toArray(function(err, resp) {
      if (err) throw err;
     res.send(resp);
      db.close();
    });
  });
}


exports.saveUsers = upload.single('avatar'),(req, res) => {
  MongoClient.connect(url,{ useUnifiedTopology: true }, function(dberr, db) {
    if (dberr) throw err;
    var dbo = db.db("shopping");
    console.log(req.body);
    console.log(req.file);

    const saveobj = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      image: req.file.path
    }
    dbo.collection("users").insert(saveobj, function(err, resp) {
      if (err) throw err;
     res.send(resp);
      db.close();
    });
  });
}