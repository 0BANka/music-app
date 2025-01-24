import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import * as path from 'path';

const rootPath = path.resolve(__dirname, '..');
export const pathToFiles = path.join(rootPath, 'public/uploads');

const config = {
  rootPath,
  uploadPath: pathToFiles,
};

export const storage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, randomUUID() + path.extname(file.originalname));
    },
  }),
};
