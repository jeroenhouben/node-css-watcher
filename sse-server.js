#!/usr/bin/env node

var fs = require('fs');
var http = require('http');

// folders to watch for CSS changes
// TODO: allow nested dirs
// TODO: support providing this from the command line
var dirs = ['../stylesheets'];

var server = http.createServer(function(req, res){

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  var msg;
  var notifyClients = function (event, f) {
    msg = 'css changed: ' + f
    res.write('data: ' + msg  + ' \n\n');
    console.log(msg +  ' ' + (new Date).toLocaleTimeString())
  }

  var i=0, l=dirs.length;
  for (i; i<l; i++) {
    fs.watch(dirs[i], notifyClients);
  }
  
  req.on('end', function(){
    console.log('clien disconnected');
  });

});


// TODO: support providing this from the command line
var PORT = 4000;

console.log('Server started on http://localhost:'+PORT.toString());
server.listen(PORT);
