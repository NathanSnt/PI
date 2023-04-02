import multer from 'multer';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const nome = `${Date.now()}-${file.originalname}`;
        cb(null, nome);
    },
    destination: (req, file, cb) => {
        const path = 'public/images/users';
        cb(null, path);
    }
});

const upload = multer({ storage });

export default upload;
