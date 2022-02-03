const { response } = require("express");
const { uploadFile } = require('../helpers');

const uploadFiles = async (req, res = response) => {
  // console.log('req.files >>>', req.files); 

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg:'No files to upload.'});
    return;
  }
  
  try {
    //txt, md
    // const name = await uploadFile( req.files, ['txt', 'md'], 'texts');
    const name = await uploadFile( req.files, undefined , 'imgs');

    res.json({ name })
  } catch (error) {
    res.status(400).json({ error })
  }

}


module.exports = {
  uploadFiles
}