const userModel = require('./User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {PASSPORT_SECRET} = require('../config');

exports.registerUser = (req, res) => {

  userModel.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        res.status(401).json({
          message: 'user with this account already exists'
        })
        return;
      }

      let newUser = new userModel();

      newUser.email = req.body.email;
      bcrypt.hash(req.body.password, 10, (error, hashPassword) => {
        if (error) {
          res.status(401).json({
            message: 'an error occurred during password encryption'
          })
          return;
        }

        newUser.password = hashPassword;
        newUser.save()
          .then((user) => {
            res.status(200).json({
              message: 'user successfully created'
            })
          }).catch((error) => {
            res.status(500).json({
              message: 'there was an error'
            })
          })
      })
   }).catch((error) => {
       res.status(500).json({
         message: 'something happened'
       })
    })
}

exports.loginUser = (req, res) => {

  userModel.findOne({
    email: req.body.email
  })
  .then(user => {
    if (!user) {
      res.status(401).json({
        message: 'user does not exist'
      })
      return;
    }

    if(!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(401).json({
        message: 'password does not match'
      })
      return;
    }

    let userToken = {
      email: user.email,
      id: user._id
    }

    let token = jwt.sign(userToken, PASSPORT_SECRET);

    res.status(200).json({
      message: 'user successfully logged in',
      data: {
        email: userToken.email,
        id: userToken.id,
        token: token
      }
    })

 }).catch((error) => {
    res.status(500).json({
      message: 'something happened'
    })
  })

}