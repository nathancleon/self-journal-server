const mongoose = require('mongoose');

let journalSchema = new mongoose.Schema({ 
  answerValues: {
    answerSelf: String,
    answerAnxiety: String,
    answerDepression: String,
    answerConcentration: String,
    answerFamily: String,
    answerFriendships: String
  },
  answerTextValues: {
    answerTextSelf: String,
    answerTextAnxiety: String,
    answerTextDepression: String,
    answerTextConcentration: String,
    answerTextFamily: String,
    answerTextFriendships: String,
    answerTextGratitude: String
  },
  userID: {type: mongoose.Schema.ObjectId, ref: "users"},
  created: Date,
  lastUpdated: { type: String, default: new Date() }
});

module.exports = mongoose.model('journal', journalSchema); 