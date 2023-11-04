require('dotenv').config();
const express = require('express');
const cookieParser =require('cookie-parser');
const cors = require('cors');
const connectDB =require('./db/config');
const authRoute = require('./Routes/auth');
const userRoute = require('./Routes/user');
const doctorRoute = require('./Routes/doctor');
const reviewRoute = require('./Routes/review');
const app = express();

const corsOptions = {
    origin: true
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api/v1/auth',authRoute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/doctor',doctorRoute);
app.use('/api/v1/review',reviewRoute);

const PORT = process.env.PORT || 3245;

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT,()=>{
            console.log(`Server is listening on http://localhost:${PORT}`);
        });
    }catch(error){
        console.log(error);
    }
}

start();