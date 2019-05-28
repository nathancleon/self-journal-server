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

  let newJournal = new journalModel();
  
  newJournal.answerValues.answerSelf = req.body.journalData.answer.answerSelf;
  newJournal.answerValues.answerAnxiety= req.body.journalData.answer.answerAnxiety;
  newJournal.answerValues.answerDepression = req.body.journalData.answer.answerDepression;
  newJournal.answerValues.answerConcentration = req.body.journalData.answer.answerConcentration;
  newJournal.answerValues.answerFamily = req.body.journalData.answer.answerFamily;
  newJournal.answerValues.answerFriendships = req.body.journalData.answer.answerFriendships;

  newJournal.answerTextValues.answerTextSelf = req.body.journalData.answerText.answerTextSelf;
  newJournal.answerTextValues.answerTextAnxiety = req.body.journalData.answerText.answerTextAnxiety;
  newJournal.answerTextValues.answerTextDepression = req.body.journalData.answerText.answerTextDepression;
  newJournal.answerTextValues.answerTextConcentration = req.body.journalData.answerText.answerTextConcentration;
  newJournal.answerTextValues.answerTextFamily = req.body.journalData.answerText.answerTextFamily;
  newJournal.answerTextValues.answerTextFriendships = req.body.journalData.answerText.answerTextFriendships;
  newJournal.answerTextValues.answerTextGratitude = req.body.journalData.answerText.answerTextGratitude;

  newJournal.userID = req.body.journalData.userID;

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

exports.updatePrompts = function (req, res) {
  const updatedData = req.body;
  updatedData.lastUpdated = new Date();

  journalModel
    .findOneAndUpdate(req.params._id, 
      { $set: updatedData },
      { new: true })
    .then(updatedJournal => res.json(updatedJournal))
    .catch(err => res.status(500).json({
      message: "something went wrong"
    }));
};

exports.deleteJournalEntry = function(req, res) {

  journalModel
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: 'journal entry successfully deleted',
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'something did not work correctly ' + error,
      });
    });
};