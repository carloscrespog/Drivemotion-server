
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

var activeClients = 0;
  var room ='room';

app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

var server=http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);
io.configure(function () {
  io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});
io.sockets.on('connection', function(socket){
  clientConnect(socket);
});

function clientConnect(socket){

  activeClients +=1;
  io.sockets.in(room).emit('message', {clients:activeClients});
  socket.on('subscribe', function(room) { socket.join(room);
  io.sockets.in(room).emit('message', {clients:activeClients}); });
  socket.on('info',function(msg){
    console.log("------------------------");
    console.log(msg);
    io.sockets.in(room).emit('data',{
      eHealth:msg
    });
  });
  socket.on('disconnect', function(){
    clientDisconnect();
  });
}

function clientDisconnect(){
  activeClients -=1;
  io.sockets.emit('message', {clients:activeClients });
}