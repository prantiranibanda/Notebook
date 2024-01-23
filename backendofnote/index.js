import express from 'express';
import mongoConnect from './dbconnect.js';
import authRouter from './routes/auth.js';
import ntsRouter from './routes/nts.js';

const app = express();
const port = 5000;
mongoConnect();

//Available routes.............................
app.use('/api/auth', authRouter);
app.use('/api/nts', ntsRouter);

// app.use(express.json())
// app.post("/", (req, res)=>{
//    res.json(req.body);
// })

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`);
})