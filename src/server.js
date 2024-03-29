import express from 'express';
import 'express-async-errors';
import { AppError } from './utils/AppError.js';
import { routes } from './routes/index.js';
import cors from 'cors';
import 'dotenv/config.js';
import uploadConfigs from './configs/uploads.js';
//TODO: order por nome e/ou por ordem alfabetica
const PORT = process.env.SERVER_PORT || '3333';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use('/files', express.static(uploadConfigs.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
    const clientError = error instanceof AppError;

    if (clientError) {
        return response.status(error.statusCode).json(error.message());
    }
    console.error(error);

    const serverError = AppError.ServerErrorMessage();

    return response.status(serverError.error).json(serverError);
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
