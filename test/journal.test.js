const mocha = require('mocha');
const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
const {app, runServer, closeServer} = require('../server.js');
const {DB_TEST_URL, TEST_PORT} = require('../config');
const expect = chai.expect;

chai.use(chaiHTTP);


let token;
let journal;
let userID;

function cleanDB() {
  return new Promise((resolve, reject) => {
    mongoose.connection.dropDatabase()
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

describe('journal-tests', () => {
  before(() => {
    runServer(DB_TEST_URL, TEST_PORT);
  });

  after(() => {
    cleanDB();
    closeServer();
  });

  it('should create a user', () => {
    return chai.request(app)
      .post('/auth/register')
      .send({
        email: 'test@test.com',
        password: 'password123'
      })
      .then((res) => {
        console.log("user successfully registered");
        userID = res.body.data.id;
        token = res.body.data.token;
        expect(res).to.have.status(200);
      });
  });

  it('should log in the user', () => {
    return chai.request(app)
      .post('/auth/login')
      .send({
        email: 'test@test.com',
        password: 'password123'
      })
      .then((res) => {
        token = res.body.data.token;
        expect(res).to.have.status(200);
      });
  });

  it('should create a new journal', () => {
    return chai.request(app)
      .post('/journal/submit?token=' + token)
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
      .then((res) => {
        journal = res.body.data._id;
        expect(res).to.have.status(200);
    })
    .catch((error) => {
      console.log(error);
      expect(res).to.have.status(500);
    })
  });

  it('should update a journal', () => {
    return chai.request(app)
      .put(`/journal/one/${journal}?token=` + token)
      .set('content-type', 'application/json; charset=utf-8')
      .send({ 
        journalData: {
          answerSelf: "Good",
        answerTextSelf: "self eval updated"
      }
      })
      .then(function(err, res) {
        expect(res).to.have.status(200);
    });
  });

  it('should delete a journal', () => {
    return chai.request(app)
      .delete(`/journal/one/${journal}?token=` + token)
      .then(function(err, res) {
        expect(res).to.have.status(200);
    });
  });
});