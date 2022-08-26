const multer = require('multer')
const { type } = require('os')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'images/')
    }, 
    filename(req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const types = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({storage, fileFilter})