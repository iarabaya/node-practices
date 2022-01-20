const { response, request } = require('express');
const bcryptjs = require('bcryptjs'); //hash one-way passwords

const User = require('../models/user');

/* PATH: /api/users */

const usersGet = async (req = request ,res = response ) => {

  const { limit = 5, offset = 0 } = req.query;

  //returns only active users (not removed ones)
  // const users = await User.find({state: true})
  //                         .skip(Number(offset))
  //                         .limit(Number(limit));

  //returns the total number of active users
  // const total = await User.countDocuments({state: true});

  const [ total, users ] = await Promise.all([
    User.countDocuments({state: true}),
    User.find({state: true})
        .skip(Number(offset))
        .limit(Number(limit))
  ])
  res.json({
    msg: 'get API - Controller',
    total,
    users
  })
};


const usersPost = async (req,res = response )=>{

  const { name, email, password, role }= req.body;
  const user = new User({name, email, password, role});

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


const usersPut = async (req,res = response )=>{

  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if(password){
    //Hash password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync( password, salt );
  }

  //Model.findByIdAndUpdate(id, update, options)
  const user = await User.findByIdAndUpdate( id, rest, {returnDocument: 'after'} );

  res.status(400).json( user );
};


const usersDelete = async (req,res = response )=>{

  const { id } = req.params;

  //delete form database
  // const user = await User.findByIdAndDelete( id );

  //change user's state in inactive ones
  const user = await User.findByIdAndUpdate(id, {state: false});
  // const userAuthenticated = req.authUser;

  res.json({
    msg: 'delete API - Controller',
    user
  })
};


const usersPatch = (req,res = response )=>{
  res.status(200).json({
    msg: 'patch API - Controller'
  })
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete
}