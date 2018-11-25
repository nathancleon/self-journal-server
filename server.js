const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const journalRoutes = require('./JournalPrompts/JournalPrompts.routes');
const authRoutes = require('./auth/User.routes');
const app = express();
const {DB_URL, PORT } = require('./config')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/journal', journalRoutes);

mongoose.set('useFindAndModify', false);

let server;

function runServer(dbString, port) {
  return new Promise((resolve, reject) => {
    mongoose.connect(dbString, { useNewUrlParser: true }, (error) => {
      if (error) {
        return reject(error);
      }
      mongoose.set('debug', true);
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
