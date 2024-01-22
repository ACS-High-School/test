const http = require('http');

const hostname = '0.0.0.0'; // 모든 네트워크 인터페이스에서 수신 대기합니다.
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
