import path from 'path';
import express, { Request, response, Response } from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import messageRoutes from './routes/message.routes'
import userRoutes from './routes/user.routes'
import connectMongoDB from './db/connectMongoDb';
import { app, server } from './socket/socket';

import cors from 'cors';
import protectRoute from './middleware/protectRoute';
const PORT = process.env.PORT || 5000;


dotenv.config();

app.use(cors({
    origin: 'http://localhost:3000', // Specify the frontend's origin
    credentials: true,   
               // Allow cookies and authentication headers
}));
app.use(express.json()); // to parse the incoming request with JSON payload from req.body
app.use(cookieParser());


app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", protectRoute, userRoutes);

app.use(express.static(path.join(__dirname, "../../CHAT-APP-frontend/build")));

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../CHAT-APP-frontend", "build", "index.html"));
});


// app.get('/', (req: Request, res: Response) => {
//     res.send('Hello World!');
// });


server.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server running on port ${PORT}`)
});
