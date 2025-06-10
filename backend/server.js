import express from 'express'; // If using ES6 modules, otherwise use require
import http from 'http'; // If using ES6 modules, otherwise use require
import cors from 'cors'; // If using ES6 modules, otherwise use require
import {Server} from 'socket.io';

const app = express();
app.use(cors());

// Mock topic of the day
const topicOfTheDay = 'Is AI going to change the world for better or worse?';

app.get('/', (req, res) => {
  res.send('Welcome to the CorrectMe Signal Server! hiiii hahahah');
});

app.get('/topic', (req, res) => {
  res.json({ topic: topicOfTheDay });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // You can also use an array here
    methods: ["GET", "POST"], // Optional: specify allowed methods
    credentials: true // Optional: if you're sending cookies/auth headers
  }
});

// Matchmaking queue
let waitingUser = null;
const partners = {}; // socket.id -> partnerId

function broadcastUserCount() {
  io.emit('user_count', { count: io.engine.clientsCount });
}

io.on('connection', (socket) => {
  broadcastUserCount();
  console.log('User connected:', socket.id);

  socket.on('find_partner', () => {
    if (waitingUser && waitingUser !== socket.id) {
      const partnerId = waitingUser;
      waitingUser = null;
      partners[socket.id] = partnerId;
      partners[partnerId] = socket.id;
      const startTime = Date.now();
      
      // First user (partnerId) should NOT initiate - they wait for offer
      io.to(partnerId).emit('partner_found', { 
        partnerId: socket.id, 
        startTime,
        shouldInitiate: false  // ← ADD THIS
      });
      
      // Second user (socket.id) should initiate - they create offer
      socket.emit('partner_found', { 
        partnerId, 
        startTime,
        shouldInitiate: true   // ← ADD THIS
      });
    } else {
      waitingUser = socket.id;
      socket.emit('waiting_for_partner');
    }
  });

  // WebRTC signaling relay
  socket.on('signal', ({ to, data }) => {
    io.to(to).emit('signal', { from: socket.id, data });
  });

  // Handle leave_call event
  socket.on('leave_call', ({ to }) => {
    io.to(to).emit('force_disconnect');
    // Clean up partners mapping
    delete partners[socket.id];
    delete partners[to];
  });

  socket.on('disconnect', () => {
    if (waitingUser === socket.id) {
      waitingUser = null;
    }
    const partnerId = partners[socket.id];
    if (partnerId) {
      io.to(partnerId).emit('partner_disconnected', { id: socket.id });
      delete partners[partnerId];
      delete partners[socket.id];
    }
    broadcastUserCount();
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});