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
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.use(favicon(path.join(__dirname, '..', 'client', 'build', 'favicon.ico')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '..', 'client', 'build', 'index.html'),
    );
  });
}


// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  let errObj = { message: err.message };

  // for boom errors
  if (err.isBoom) {
    const { statusCode } = err.output;
    res.status(err.output.statusCode || 500);
    if (statusCode === 409 || statusCode === 422) {
      errObj = err.data;
    }
  } else {
    res.status(500);
    errObj.message = 'Internal server error';
  }
  res.json({ error: errObj });
});

module.exports = app;
