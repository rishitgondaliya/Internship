const http = require('http');

// const {reqHandler} = require('./routes')
const routes = require('./routes')

console.log(routes.text)

const server = http.createServer(routes.reqHandler)

server.listen(3000);
