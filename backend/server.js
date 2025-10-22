import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import cors from 'cors';
import connectDatabase from './config/db.js'
import userRouter from './routes/user.routes.js';
import resumeDataRoutes from './routes/resumeData.routes.js';
import webhookRouter from './routes/webhook.routes.js';
import {Server } from 'socket.io'
import http from 'http'
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// In-memory map: userEmail -> socketId
const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);

  // client should emit 'register' with email after connecting
  socket.on("register", (email) => {
    if (!email) return;
    userSocketMap.set(email, socket.id);
    console.log(`Registered socket ${socket.id} for ${email}`);
  });

  socket.on("disconnect", () => {
    // cleanup map entry for this socket
    for (const [email, sid] of userSocketMap.entries()) {
      if (sid === socket.id) {
        userSocketMap.delete(email);
        console.log(`Socket ${socket.id} disconnected, removed ${email}`);
        break;
      }
    }
  });
});

// make io and map available to controllers via app.locals
app.set("io", io);
app.set("userSocketMap", userSocketMap);

dotenv.config();
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
await connectDatabase();

app.get('/', (req,res)=>{
    res.send("<h1>Server For Resume Application</h1>")
})
app.use('/api/auth',userRouter);
app.use('/api/resume',resumeDataRoutes);
app.use('/api/webhook',webhookRouter);
const PORT = process.env.PORT 

if(process.env.NODE_ENV !=='production'){
    server.listen(PORT, (req,res)=>{
        console.log(`Server started at PORT ${PORT}`)
    })
}
export default server;
