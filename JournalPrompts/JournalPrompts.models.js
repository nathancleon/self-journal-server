const mongoose = require('mongoose');

let journalSchema = new mongoose.Schema({ 
  answerSelf: String,
  answerAnxiety: String,
  answerDepression: String,
  answerConcentration: String,
  answerFamily: String,
  answerFriendships: String,
  answerTextSelf: String,
  answerTextAnxiety: String,
  answerTextDepression: String,
  answerTextConcentration: String,
  answerTextFamily: String,
  answerTextFriendships: String,
  answerTextGratitude: String,
  userID: {type: mongoose.Schema.ObjectId, ref: "users"},
  created: { type: Date, default: new Date() },
  lastUpdated: { type: Date, default: new Date() }
});

module.exports = mongoose.model('journal', journalSchema); 