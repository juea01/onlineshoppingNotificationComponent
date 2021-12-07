const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server,{
    cors:{
        origin: "*",
        methods: ["GET"]
    }
});
const port = process.env.PORT || 1923;

module.exports = {
    socket : any = io.on('connection', (socket) => {
        console.log('User Socket connected');
        socket.on("disconnect", () => console.log(`${socket.id} User disconnected.`));
    })
};

server.listen(port,()=>{
    console.log(`Socket io server listening on port ${port}`);
});