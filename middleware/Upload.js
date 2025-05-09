const multer  = require('multer')
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './Uploadimage');
  },
  filename: function (req, file, cb) {
      //console.log(file.originalname);
      cb(null , file.originalname );
  }
});

const upload = multer({ storage: storage })


module.exports = upload;