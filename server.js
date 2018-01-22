// server.js
const express = require('express');
const http = require('http');
const path = require('path');

//const api = require('.app/app-routing');
const app = express();
// Run the app by serving the static files
// in the dist directory
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
//app.use(forceSSL());
app.use(express.static(path.join(__dirname + '/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3001';
app.set('port', port);

// Start the app by listening on the default
// Heroku port
const server = http.createServer(app);
server.listen(port, () => console.log('Running'));
//app.listen(process.env.PORT || 8080);