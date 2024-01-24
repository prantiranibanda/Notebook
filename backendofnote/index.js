import express from 'express';
import mongoConnect from './dbconnect.js';
import authRouter from './routes/auth.js';
import ntsRouter from './routes/nts.js';
import cors from 'cors';

const app = express();
const port = 5000;
mongoConnect();
app.use(cors());

//Available routes.............................
app.use('/api/auth', authRouter);
app.use('/api/nts', ntsRouter);

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})