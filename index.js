// node server which will handel socket
const io = require( 'socket.io' )( 8000,{
    cors:{
        origin:["https://cat-chat-app-by-meow.netlify.app"],
    },
} )
console.log("suraj")
const users = {};
io.on( 'connection', socket => {
    console.log("suraj1")
    socket.on( 'new-user-joined', names => {    
        users[ socket.id ] = names;
        
        socket.broadcast.emit( 'user-joined', names );
    } );
    socket.on( 'send', message => {
        socket.broadcast.emit( 'receive', { message: message, names: users[ socket.id ] } )
    } )
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id]
    })
} );
