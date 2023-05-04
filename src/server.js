import express from 'express';
import 'express-async-errors';

const app = express();

app.use(express.json());

const PORT = '3333';



app.post('/user/create', (request, response) => {
    const { name, email, password } = request.body;
    
    return response.status(201).json({message:"Hello World!" ,name, email, password});
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

