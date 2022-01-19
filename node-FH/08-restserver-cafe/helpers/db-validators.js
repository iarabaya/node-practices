const Role = require('../models/role');

const isValidRole = async (role = '') => {
  const roleExists  = await Role.findOne({ role });
  if( !roleExists ){
       throw new Error(`The role ${role} is not valid.`)   
  }
}

module.exports = {
  isValidRole
}