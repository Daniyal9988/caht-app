const express = require("express"); // Import Express.js framework
const http = require("http"); // Import Node.js built-in HTTP module
const cors = require("cors"); // Import CORS middleware for enabling Cross-Origin Resource Sharing
const SocketIO = require("socket.io"); // Import Socket.IO library for real-time bidirectional communication

// Create an Express application
const app = express();
const port = 4500;


app.use(cors()); // This allows requests from another domain


app.get("/", (req, res) => {
    res.send("its working");
});

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.IO by passing the HTTP server instance
const io = SocketIO(server);

// Listen for the "connection" event, which occurs when a new client connects to the server
io.on("connection", () => {
    console.log("new connection established");
});

// Start the server and listen for incoming requests on the specified port
server.listen(port, () => {
    console.log(`the server is listening to request on ${port}`);
});
