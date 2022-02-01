const { Role, User, Category, Product } = require('../models');

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

const existsCategoryById = async ( id ) => {
  const categoryExists = await Category.findById(id);
  if(!categoryExists){
    throw new Error(`the category with id ${id} doesn't exist.`);
  }
}

const existsProductById = async ( id ) => {
  const productExists = await Product.findById(id);
  if(!productExists){
    throw new Error(`the product with id ${id} doesn't exist.`);
  }
}

module.exports = {
  isValidRole,
  emailExists,
  existsUserById,
  existsCategoryById,
  existsProductById
}