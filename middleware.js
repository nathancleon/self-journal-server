const jwt = require('jsonwebtoken');
const {PASSPORT_SECRET} = require('./config');

exports.verifyToken = (req, res, next) => {
  const token = req.params.token || req.body.token;

  if(!token) {
    res.status(401).json({
      message: 'token not provided'
    })
    return;
  }

  jwt.verify(token, PASSPORT_SECRET, (error, userToken) => {
    if(error) {
      res.status(500).json({
        message: 'there was an error'
      })
      return;
    }

    req.user = userToken;

    next();
  })
}