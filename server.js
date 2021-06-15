var express = require('express');
var cors = require('cors');
var multer = require('multer');
var mime = require('mime');
require('dotenv').config()

var app = express();
var upload = multer({dest:"uploads/"});

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

///api/fileanalyse

app.post("/api/fileanalyse",upload.single("upfile"),function(req,res)
{
  try
  {

var ext=(req.file.originalname).split('.').pop();


    console.log(req.file);
    console.log("I got this as ext value : "+ext);
    console.log(mime.getType(ext));
    res.json(
      {"name" : req.file.originalname,
      "type" : req.file.mimetype,         // => 'text/plain'
      "size" : req.file.size
      });
    //res.json("Upload was successful !")
  }
  catch(err)
  {
    //res.send(400);
    res.json("Upload Failed :( ")
  }
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
