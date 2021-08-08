var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var fs = require('fs');
const User = require('../models/user'); 
const user = require('../models/user');

const RSA_PRIVATE_KEY = fs.readFileSync('./keys/private.key');

router.post('/', async(req, res) => {
    try{
      const username = req.body.username;
      const password = req.body.password;

      const user = await User.findOne({"username": username});

      if(user == null)
        res.status(200).send("Invalid username or password");

      if(user.password === password){
        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
          algorithm: 'RS256',
          expiresIn: 12000,
          subject: username
        })
            
        res.status(200).json({
          "idToken": jwtBearerToken, 
          "expiresIn": 12000
        });
      } else
        res.status(200).send("Invalid username or password");
    } catch(err){
      if(err.name === "CastError")
        res.status(200).send("Invalid username or password");
      else
        res.status(500).send(err);
    }
});
  
module.exports = router;