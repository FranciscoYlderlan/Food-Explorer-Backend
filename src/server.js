import express from 'express';
import 'express-async-errors';
import { AppError } from './utils/AppError.js';
import { routes } from './routes/index.js';

import { sqliteConnection } from './database/sqlite/index.js';

const PORT = '3333';

const app = express();

app.use(express.json());

app.use(routes);

sqliteConnection();

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
