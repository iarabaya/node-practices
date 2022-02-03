const generateJWT = require('./generate-jwt');
const dbValidators = require('./db-validators');
const googleVerify = require('./google-verify');
const uploadFile = require('./upload-file');

module.exports = {
  ...generateJWT,
  ...dbValidators,
  ...googleVerify,
  ...uploadFile,
}