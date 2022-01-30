const { Role, User, Category } = require('../models');

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

const existsUserById = async ( id ) => {
  const userExists = await User.findById(id);
  if( !userExists ){
    throw new Error (`the user with id ${id} doesn't exists.`);
  }
}

const existsCategory = async ( id ) => {
  const categoryExists = await Category.findById(id);
  if(!categoryExists){
    throw new Error(`the category with id ${id} doesn't exist.`);
  }
}

module.exports = {
  isValidRole,
  emailExists,
  existsUserById,
  existsCategory
}