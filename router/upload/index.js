const multer = require('multer');
const mkdir = require('../../dao/mkdir');


// 控制文件存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body);
    let url = req.body.url;
    mkdir.mkdirs('../data/' + url, err => {
      console.log(err);
    });

    cb(null, './data/'+url)
  },
  filename: function (req, file, cb) {
    // let name = req.body.name;
    let type = file.originalname.replace(/.+\./, '.')
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + type)
  }
})

const upload = multer({ storage })

module.exports = (app) => {
  app.post('/upload', upload.fields([{name: 'avatar', maxCount: 1}]), function (req, res, next) {
    res.json({
      message: 'success',
      src: 'http://localhost:3000/images/' + req.files['avatar'][0].filename
    })
  })
}