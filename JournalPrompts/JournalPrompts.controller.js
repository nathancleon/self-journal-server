const journalModel = require('./JournalPrompts.models');

exports.fetchAllPrompts = function(req, res) {
  journalModel
    .find({
      userID: req.user.id
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
  console.log('submit prompts ', req.body);

  let newJournal = new journalModel();
  
  newJournal.answerSelf = req.body.journalData.answerSelf;
  newJournal.answerAnxiety= req.body.journalData.answerAnxiety;
  newJournal.answerDepression = req.body.journalData.answerDepression;
  newJournal.answerConcentration = req.body.journalData.answerConcentration;
  newJournal.answerFamily = req.body.journalData.answerFamily;
  newJournal.answerFriendships = req.body.journalData.answerFriendships;

  newJournal.answerTextSelf = req.body.journalData.answerTextSelf;
  newJournal.answerTextAnxiety = req.body.journalData.answerTextAnxiety;
  newJournal.answerTextDepression = req.body.journalData.answerTextDepression;
  newJournal.answerTextConcentration = req.body.journalData.answerTextConcentration;
  newJournal.answerTextFamily = req.body.journalData.answerTextFamily;
  newJournal.answerTextFriendships = req.body.journalData.answerTextFriendships;
  newJournal.answerTextGratitude = req.body.journalData.answerTextGratitude;

  newJournal.userID = req.body.journalData.userID;

  console.log(newJournal);

  newJournal.save()
    .then((res, function() {
      res.status(200).json({
        message: 'submitPrompts is working'
      })
    }))
    .catch((function() {
      res.status(500).json({
        message: 'submitPrompts is not working ' + error
      })
    }));
}