const http = require('http');

const app = require('./server/app');

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const parsedPort = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(parsedPort)) {
    // named pipe
    return val;
  }

  if (parsedPort >= 0) {
    // port number
    return parsedPort;
  }

  return false;
}

/**
 * Event listener for HTTP server "listening" event.
 */
server.listen(port, () => console.log(`Listening on http://localhost:${port}/api`))

