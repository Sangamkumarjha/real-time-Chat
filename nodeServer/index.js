//Node server to handle socket io connection
const io= require('socket.io')(8080);

const users={};

io.on('connection',(socket) =>{
    //if any new usersare connected to the server
    socket.on('new-user-joined',name =>{
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    //if someone send the message and 
    socket.on('send',message =>{
        socket.broadcast.emit('receive',{message:message, name: users[socket.id]});
    });
    //if someone leave the message
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
      });
})