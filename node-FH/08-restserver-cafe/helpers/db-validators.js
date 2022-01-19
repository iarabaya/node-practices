const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  //Verify role
  const roleExists  = await Role.findOne({ role });
  if( !roleExists ){
       throw new Error(`The role ${role} is not valid.`)   
  }
}

const emailExists = async (email = '') => {
  //Verify email
  const emailExists = await User.findOne({email});
  if( emailExists ){
    throw new Error ('The email is already registered.');
  }
}

const existsUserById = async (id ) => {
  const userExists = await User.findById(id);
  if( !userExists ){
    throw new Error (`the id doesn't exists: ${id}`);
  }
}

module.exports = {
  isValidRole,
  emailExists,
  existsUserById
}