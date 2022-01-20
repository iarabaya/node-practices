const { response } = require('express');

const isAdminRole = (req, res = response, next) =>{

  if( !req.authUser ){
    return res.status(500).json({
      msg: 'Verify role without token authentication first'
    })
  }

  const { role, name } = req.authUser;

  if(role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      msg: `${name} is not an administrator - Unauthorized action`
    })
  }

  next();
}

const hasRole = ( ...roles ) => {
  return (req, res=response, next) => {
    if( !req.authUser ){
      return res.status(500).json({
        msg: 'Verify role without token authentication first'
      })
    }

    if(!roles.includes(req.authUser.role)){
      return res.status(401).json({
        msg: `One of this roles is required ${ roles }`
      })
    }

    next();
   }
}

module.exports = {
  isAdminRole,
  hasRole
}