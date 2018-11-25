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
  
  newJournal.answerValues.answerSelf = req.body.journalData.answerSelf;
  newJournal.answerValues.answerAnxiety= req.body.journalData.answerAnxiety;
  newJournal.answerValues.answerDepression = req.body.journalData.answerDepression;
  newJournal.answerValues.answerConcentration = req.body.journalData.answerConcentration;
  newJournal.answerValues.answerFamily = req.body.journalData.answerFamily;
  newJournal.answerValues.answerFriendships = req.body.journalData.answerFriendships;

  newJournal.answerTextValues.answerTextSelf = req.body.journalData.answerTextSelf;
  newJournal.answerTextValues.answerTextAnxiety = req.body.journalData.answerTextAnxiety;
  newJournal.answerTextValues.answerTextDepression = req.body.journalData.answerTextDepression;
  newJournal.answerTextValues.answerTextConcentration = req.body.journalData.answerTextConcentration;
  newJournal.answerTextValues.answerTextFamily = req.body.journalData.answerTextFamily;
  newJournal.answerTextValues.answerTextFriendships = req.body.journalData.answerTextFriendships;
  newJournal.answerTextValues.answerTextGratitude = req.body.journalData.answerTextGratitude;

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

exports.updatePrompts = function (req, res) {
  
  const updated = {};
  const updateableAnswerFields = [
    'answerSelf',
    'answerAnxiety',
    'answerDepression',
    'answerConcentration',
    'answerFamily',
    'answerFriendships'
  ];

  const updateableAnswerTextFields = [
    'answerTextSelf',
    'answerTextAnxiety',
    'answerTextDepression',
    'answerTextConcentration',
    'answerTextFamily',
    'answerTextFriendships',
    'answerTextGratitude'
  ];

  updateableAnswerFields.forEach(field => {
    if(field in req.body.answerValues) {
      updated.answerValues[field] = req.body.answerValues[field];
    }
  });

  updateableAnswerTextFields.forEach(field => {
    if(field in req.body.answerTextValues) {
      updated.answerTextValues[field] = req.body.answerTextValues[field];
    }
  });

  updated.lastUpdated = new Date();

  journalModel
    .findOneAndUpdate(req.params._id, { $set: updated }, { new: true })
    .then(updatedJournal => res.json(updatedJournal))
    .catch(err => res.status(500).json({
      message: "something went wrong"
    }));
};