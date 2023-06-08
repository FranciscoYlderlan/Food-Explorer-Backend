import multer from 'multer';
import path from 'path';
import Path from '../utils/Path.js';
import crypto from 'crypto';

const TMP_FOLDER = path.resolve(Path.dirname(import.meta.url), '..', '..', 'tmp');

const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads');

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;
            return callback(null, filename);
        },
    }),
};

export default {
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
};
