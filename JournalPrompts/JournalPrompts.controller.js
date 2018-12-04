const journalModel = require('./JournalPrompts.models');

exports.fetchAllPrompts = function(req, res) {
  journalModel
    .find({
      userID: req.user.id
    })
    .sort("-created")
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
  newJournal.created = new Date();

  console.log(newJournal);

  newJournal.save()
    .then((res, function(journal) {
      res.status(200).json({
        message: 'submitPrompts is working',
        data: journal
      })
    }))
    .catch((function(error) {
      res.status(500).json({
        message: 'submitPrompts is not working ' + error
      })
    }));
}

exports.updateJournalEntry = function (req, res) {

  const updated = {};
  const updateableFields = [
    'answerSelf',
    'answerAnxiety',
    'answerDepression',
    'answerConcentration',
    'answerFamily',
    'answerFriendships',
    'answerTextSelf',
    'answerTextAnxiety',
    'answerTextDepression',
    'answerTextConcentration',
    'answerTextFamily',
    'answerTextFriendships',
    'answerTextGratitude'
  ];
  updateableFields.forEach(field => {
    if(field in req.body) {
      updated[field] = req.body[field];
    }
  });

  updated.lastUpdated = new Date();

  journalModel
    .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
    .then(updatedJournal => res.json(updatedJournal))
    .catch(err => res.status(500).json({
      message: "something went wrong",
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