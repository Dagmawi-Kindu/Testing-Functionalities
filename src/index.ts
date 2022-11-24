require('dotenv').config();   
require('./controllers/UserController')      
import { userRouter } from "./routes/routes";    
import { authRouter } from "./routes/auth.Router"; 
            
import { AppDataSource } from "./data-source"
import express from 'express';
const app = express();
app.use(express.json());

AppDataSource.initialize().then(async () => {
    console.log("Database started");   
    
}).catch(error => console.log(error));

app.use("/api/auth",authRouter)
app.use('/', userRouter);


app.listen(process.env.NODE_PORT, () => {
    console.log('Server Started!');
})