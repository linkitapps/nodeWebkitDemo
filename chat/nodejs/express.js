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
    });
});

io.sockets.on('connection',function(socket){

    console.log('클라이언트연결');

    var _wData = '';

    id = socket.id;

    function workFile(_val){
        fs.readFile('./msg.html', 'utf8', function (err,data) {

            if (err) {
                return console.log(err);
            }

            _wData = data+('<li>'+_val+'</li>\n');

            fs.writeFile ('./msg.html', _wData, function(err) {
                if (err) throw err;
                console.log('complete');
            });

            socket.broadcast.emit('bindHtml',_wData,_val);
            socket.emit('bindHtml',_wData,_val);

        });
    }

    socket.on('readFile',function(_val){
        workFile(_val);
    });

    workFile('');
    
});