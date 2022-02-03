const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, extensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {

  return new Promise( (resolve, reject) => {

    const { file } = files;
    const splitName =  file.name.split('.');
    const extension = splitName[ splitName.length - 1 ]
  
    //validate extension
    const validExtensions = extensions;
    if( !validExtensions.includes(extension)){
      return reject(`${extension} is an invalid file extension`);
    }
  
    const tempName = uuidv4() + '.' + extension;
    const uploadPath = path.join(__dirname, '../uploads/', folder, tempName );
  
    file.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }
  
      resolve(uploadPath);
    });
  })

}

module.exports = {
  uploadFile
}