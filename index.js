var express = require('express');
var cors = require('cors');
var multer = require('multer');
var fs = require('fs');
require('dotenv').config()

var app = express();
var upload = multer({ dest: './' });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname, filename, size, mimetype } = req.file;

  fs.renameSync(`./${filename}`, `./${originalname}`);
  res.json({ name: originalname, type: mimetype, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
