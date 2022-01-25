const bcryptjs = require("bcryptjs");
const { response } = require("express");

const User = require('../models/user');

const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {

  const { email, password } =  req.body;

  try {
    //Verify if email exists
    const user = await User.findOne({ email });
    if( !user ){
      return res.status(400).json({
        msg: 'The user or password is invalid. - email'
      })
    }

    //Verify if user is active
    if( !user.state ){
      return res.status(400).json({
        msg: 'The user or password is invalid. - state:false'
      })
    }

    //Verify password
    const validPassword = bcryptjs.compareSync(password, user.password);
    if( !validPassword ){
      return res.status(400).json({
        msg: 'The user or password is invalid. - password'
      })
    }

    //Generate JWT
    const token =  await generateJWT( user.id );
    
    res.json({
      msg: 'Login ok',
      user,
      token
    })

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      msg: 'Something went wrong:'
    })

  }

}

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, img, email } = await googleVerify( id_token )
    let user = await User.findOne({email});

    if(!user){
      //Have to create the user
      const data = {
        name,
        email,
        password: ':C',
        img, 
        google: true,
        role: 'USER_ROLE'
      }

      user = new User(data);
      await user.save();
    }

    //if user already is state:false
    if( !user.state ){
      return res.status(401).json({
        msg:'User inactive and blocked, communicate with administrators.'
      });
    }

    //generate JWT
    const token =  await generateJWT( user.id );
    
    res.json({
      user,
      token
    })
    
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Unable to verify token'
    })
  }

}

module.exports = {
  login,
  googleSignIn
}