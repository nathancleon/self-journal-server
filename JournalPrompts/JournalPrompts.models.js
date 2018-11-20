const mongoose = require('mongoose');

let journalSchema = new mongoose.Schema({ 
  answerSelf: Number,
  answerAnxiety: Number,
  answerDepression: Number,
  answerConcentration: Number,
  answerFamily: Number,
  answerFriendships: Number,
  answerTextSelf: String,
  answerTextAnxiety: String,
  answerTextDepression: String,
  answerTextConcentration: String,
  answerTextFamily: String,
  answerTextFriendships: String,
  answerTextGratitude: String,
  userID: {type: mongoose.Schema.ObjectId, ref: "users"},
  created: { type: String, default: new Date() },
  lastUpdated: { type: String, default: new Date() }
});

module.exports = mongoose.model('journal', journalSchema); 