const mocha = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
const {app, runServer, closeServer} = require('../server.js');
const expect = chai.expect;
const {TEST_PORT, DB_TEST_URL} = require('../config');

chai.use(chaiHTTP);

let token;
var journal;
let userID;

function cleanDB() {
  return new Promise((resolve, reject) => {
    mongoose.connection.dropDatabase()
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  });
}

describe('journal-tests', () => {
  before(() => {
    runServer(DB_TEST_URL, TEST_PORT);
  });

  after(() => {
    cleanDB().then(() => {
      closeServer();
    })
  });

  it('should create a user', (done) => {
    chai.request(app)
      .post('/auth/register')
      .send({
        email: 'test@test.com',
        password: 'password123'
      })
      .then(res => {
        console.log("user successfully registered");
        userID = res.body.data.id;
        token = res.body.data.token;
        expect(res).to.have.status(200);
        done();
      })
      .catch(err => {
        throw err;
      })
  });

  it('should log in the user', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      })
      .then(res => {
        token = res.body.data.token;
        expect(res).to.have.status(200);
        done();
      })
      .catch(err => {
        throw err;
      })
  });

  it('should create a new journal', (done) => {
    chai.request(app)
      .post(`/journal/submit?token=${token}`)
      .set('content-type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        journalData: { 
          answerSelf: "Good",
          answerAnxiety: "Slightly",
          answerDepression: "Slightly",
          answerConcentration: "Good",
          answerFamily: "Good",
          answerFriendships: "Good",
          answerTextSelf: "Test input text",
          answerTextAnxiety: "Test input text",
          answerTextDepression: "Test input text",
          answerTextConcentration: "Test input text",
          answerTextFamily: "Test input text",
          answerTextFriendships: "Test input text",
          answerTextGratitude: "Test input text",
          userID: userID,
          created: new Date(),
        }
      })
      .then(res => {
        journal = res.body.data._id;
        expect(res).to.have.status(200);
        done();
    })
    .catch(err => {
      throw err;
    })
  });

  it('should retrieve all the journal entries', (done) => {
    chai.request(app)
    .get(`/journal/all?token=${token}`)
    .then(res => {
      expect(res).to.have.status(200);
      done();
    })
  });

  it('should update a journal', (done) => {
   chai.request(app)
      .put(`/journal/one/${journal}?token=${token}`)
      .set('content-type', 'application/json; charset=utf-8')
      .send({ 
        journalData: {
          answerSelf: "Good",
        answerTextSelf: "self eval updated"
      }
      })
      .then(res => {
        console.log(res);
        expect(res).to.have.status(200);
        done();
    })
    .catch((err) => {
      throw err;
    })
  });

  it('should delete a journal', (done) => {
   chai.request(app)
      .delete(`/journal/one/${journal}?token=${token}`)
      .then(res => {
        expect(res).to.have.status(200);
        done();
    })
    .catch((err) => {
      throw err;
    })
  })
});