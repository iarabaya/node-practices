const bcryptjs = require("bcryptjs");
const { response } = require("express")
const User = require('../models/user');

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

    //TODO Generate JWT
    
    res.json({
      msg: 'Login ok',
      email,
      password
    })

  } catch (error) {

    console.log(error);
    return res.status(500).json({
      msg: 'Something went wrong:'
    })

  }

}

module.exports = {
  login
}