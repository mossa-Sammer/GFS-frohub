const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const favicon = require('serve-favicon');

const indexRouter = require('./routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable security, CORS, compression
app.use(helmet());
app.use(cors());
app.use(compress());

app.use('/api', indexRouter);

// Serve React (client) files
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '..', '..', 'client', 'build', 'index.html'),
    );
  });

  app.use(favicon(__dirname, '..', '..', 'client', 'build', 'favicon.ico'));
}


// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // send the error object
  if (err.isBoom) {
    // for boom errors
    res.status(err.output.statusCode || 500);
  } else {
    // for unexpected internal server errors
    res.status(err.statusCode || 500);
  }
  res.json({ error: err.message });
});

module.exports = app;
