const jwt = require('jsonwebtoken');
const PASSPORT_SECRET = require('../config');

exports.verifyToken = (req, res, next) => {

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  const token = req.query.token;

  // console.log('verify token ', req.body);

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