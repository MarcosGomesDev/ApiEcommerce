import multer from 'multer';
import path from 'node:path';

const upload = multer({
    storage: multer.diskStorage({
        // filename(req, file, callback) {
        //     callback(null, `${Date.now()}-${file.originalname}`);
        // },
    }),
    fileFilter: (_, file, callback) => {
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            callback(null, true)
        } else {
            callback(new Error('somente imagens com a extensão jpeg, jpg ou png'))
        }
    }
})

export default upload;