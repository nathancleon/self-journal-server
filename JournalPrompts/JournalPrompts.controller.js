const journalModel = require('./JournalPrompts.models');

exports.fetchAllPrompts = function(req, res) {
  journalModel
    .find({
      userID: req.params.id
    })
    .then((journal) => {
      res.status(200).json({
        message: 'Retrieved journal prompt entries',
        data: journal
      })
    })
    .catch((error) => {
      res.status(500).json({
        message: 'something happened',
        data: error
      })
    })
};

exports.submitPrompts = function(req, res) {
  console.log(req.body);
  
  let newJournal = new journalModel();
  
  newJournal.answerSelf = req.body.answerSelf;
  newJournal.answerAnxiety= req.body.answerAnxiety;
  newJournal.answerDepression = req.body.answerDepression;
  newJournal.answerConcentration = req.body.answerConcentration;
  newJournal.answerFamily = req.body.answerFamily;
  newJournal.answerFriendships = req.body.answerFriendships;

  newJournal.answerTextSelf = req.body.answerTextSelf;
  newJournal.answerTextAnxiety = req.body.answerTextAnxiety;
  newJournal.answerTextDepression = req.body.answerTextDepression;
  newJournal.answerTextConcentration = req.body.answerTextConcentration;
  newJournal.answerTextFamily = req.body.answerTextFamily;
  newJournal.answerTextFriendships = req.body.answerTextFriendships;

  newJournal.userID = req.body.userID;

  newJournal.save()
    .then((res) => {
      res.status(200).json({
        message: 'submitPrompts is working'
      })
    })
    .catch(() => {
      res.status(500).json({
        message: 'submitPrompts is not working'
      })
    });
}