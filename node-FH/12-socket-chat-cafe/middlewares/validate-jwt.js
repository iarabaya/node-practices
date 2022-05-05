const { response, request } = require('express');
const jwt =  require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req=request, res=response, next) => {
  const token  = req.header('x-token');

  if(!token){
    return res.status(401).json({
      msg: 'token required in the request.'
    })
  }

  try {
    //return payload
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //Read user which has that uid
    const authUser = await User.findById(uid);
    if(!authUser){
      return res.status(401).json({
        msg: 'invalid token - user does not exist in db'
      })
    }
    
    //Verify if user has state:true
    if( !authUser.state ){
      return res.status(401).json({
        msg: 'invalid token - user state: false'
      })
    }
    
    req.authUser = authUser;
    next();
    // console.log(token, payload);
    
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'invalid token'
    })
  }
}

module.exports = {
  validateJWT
}