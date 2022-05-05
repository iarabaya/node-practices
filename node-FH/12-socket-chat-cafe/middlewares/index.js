const validateInput = require('../middlewares/validate-input');
const validateJWT = require('../middlewares/validate-jwt');
const validateRoles = require('../middlewares/validate-roles');
const validateFile = require('../middlewares/validate-file');
//reference to all the middlewares, avoid writing al these imports
module.exports = {
  ...validateInput,
  ...validateJWT,
  ...validateRoles,
  ...validateFile
}