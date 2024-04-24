const http = require('http');
const app=require('./app')
const port =3000
// http.createServer(function (req, res) {
//   res.write("hello world");
//   res.end();
// }).listen(3000);
const server=http.createServer(app)
server.listen(3000)
