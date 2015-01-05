var fs = require('fs'),
    express = require('express'),
    socketio = require('socket.io'),
    http = require('http');


var app = express(),
    server = http.createServer(app).listen(3000, function(){console.log('start...')}),
    io = socketio.listen(server);

    
app.use('/',express.static(__dirname+'/'));

app.get('/', function(req, res) { //index 파일 지정
    fs.readFile('index.html',{ encoding : 'utf8' }, function(error, data){

        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end(data);
    })
});

io.sockets.on('connection',function(socket){
    console.log('클라이언트연결');
    id = socket.id;
    socket.on('clientPush',function(data){
        console.log(data);
        socket.broadcast.emit('serverPush',data);
        socket.emit('serverPush',data);
    });
    
    
});