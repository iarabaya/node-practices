const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { response } = require("express");

const uploadFile = (req, res = response) => {

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg:'No files to upload.'});
    return;
  }

  console.log('req.files >>>', req.files); // eslint-disable-line

  const { file } = req.files;

  const splitName =  file.name.split('.');
  const extension = splitName[ splitName.length - 1 ]


  //validate extension
  const validExtension= ['png', 'jpg', 'jpeg', 'gif'];
  if( !validExtension.includes(extension)){
    return res.status(400).json({ msg: `${extension} is an invalid file extension`})
  }

  const tempName = uuidv4() + '.' + extension;
  const uploadPath = path.join(__dirname, '../uploads/', tempName );

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ err });
    }

    res.json({ msg: 'File uploaded to ' + uploadPath });
  });
}


module.exports = {
  uploadFile
}