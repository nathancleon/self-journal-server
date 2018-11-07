const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const journalRoutes = require('./JournalPrompts/JournalPrompts.routes');
const app = express();
const {DB_URL, PORT } = require('./config')

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(bodyParser.json());

app.use('/journal', journalRoutes);

let server;

function runServer(dbString, port) {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbString, { useNewUrlParser: true }, (error) => {
      if (error) {
        return reject(error);
      }
      server = app.listen(port, () => {
        console.log(`app is running on port ${port}`);
        resolve();
      })
      .on('error', (error) => {
        mongoose.disconnect();
        reject(error);
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('closing server');
      server.close((error) => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  });
}

if(require.main === module) {
  runServer(DB_URL, PORT).catch((error) => {
    console.log(error);
  });
}

module.exports = {app, runServer, closeServer};
