const multer = require('multer');
const storage= multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        let type = "";
        if( file.mimetype === "application/octet-stream" || !file.mimetype) type =".jpg"
        cb(null, Date.now() + "-" + file.originalname + type)
    }
})

const uploads = multer ({storage})

module.exports= uploads