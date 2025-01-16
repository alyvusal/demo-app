// server.js
const express = require('express');
const os = require('os');
const path = require('path');
const app = express();
const port = 3000;

// Serve static HTML
app.use(express.static(path.join(__dirname, 'public')));

// Pod Info API
app.get('/info', (req, res) => {
  const podIP = Object.values(os.networkInterfaces())
    .flat()
    .filter(i => i.family === 'IPv4' && !i.internal)
    .map(i => i.address)
    .join(', ');

  res.json({
    podName: os.hostname(),
    podIP: podIP,
    xForwardedFor: req.headers['x-forwarded-for'] || req.socket.remoteAddress
  });
});

// Start Server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});

process.on('SIGINT', function() {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit(0);
});
