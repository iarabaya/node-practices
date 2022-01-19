const { response, request } = require('express');
const bcryptjs = require('bcryptjs'); //hash one-way passwords

const User = require('../models/user');

/* PATH: /api/users */

const usersGet = (req = request ,res = response ) => {

  // const queryParams = req.query;
  const { q, nombre = "No name", apiKey, page = 1, limit } = req.query;

  res.json({
    msg: 'get API - Controller',
    q,
    nombre,
    apiKey,
    page,
    limit
  })
};

const usersPost = async (req,res = response )=>{

  const { name, email, password, role }= req.body;
  const user = new User({name, email, password, role});

  //Verify email
  const emailExists = await User.findOne({email});
  if( emailExists ){
    return res.status(400).json({
      msg: 'The email is already registered'
    })
  }

  //Hash password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt );

  //Save in db
  await user.save();

  res.json({
    msg: 'post API - Controller',
    user
  })
};

const usersPut = (req,res = response )=>{

  const id = req.params.id;

  res.status(400).json({
    msg: 'put API - Controller',
    id
  })
};

const usersPatch = (req,res = response )=>{
  res.status(200).json({
    msg: 'patch API - Controller'
  })
};

const usersDelete = (req,res = response )=>{
  res.json({
    msg: 'delete API - Controller'
  })
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete
}