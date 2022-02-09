const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { uploadFile } = require('../helpers');

const { User, Product } = require('../models')

const uploadFiles = async (req, res = response) => {
  // console.log('req.files >>>', req.files); 
  try {
    //txt, md
    // const name = await uploadFile( req.files, ['txt', 'md'], 'texts');
    const name = await uploadFile( req.files, undefined , 'imgs');
    res.json({ name });

  } catch (error) {
    res.status(400).json({ error })
  }

}

const updateImage = async (req, res= response) => {
  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if(!model) { return res.status(400).json({ msg: `The user with id ${id} doesn't exist.`})}
      
      break;

    case 'products':
      model = await Product.findById(id);
      if(!model) { return res.status(400).json({ msg: `The product with id ${id} doesn't exist.`})}
   
      break;
  
    default:
      return res.status(500).json({ msg: 'Forgot to validate this'})
  }
  
  //clean previous images
  if( model.img ){
    //delete img from server
    const imgPath = path.join( __dirname, '../uploads', collection, model.img );
    if( fs.existsSync( imgPath) ){
      fs.unlinkSync( imgPath );
    }
  }

  const name = await uploadFile( req.files, undefined , collection );
  model.img = name;
  await model.save();

  res.json({ model })
}

const showImage = async(req, res= response) => {
  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if(!model) { return res.status(400).json({ msg: `The user with id ${id} doesn't exist.`})}   
      break;

    case 'products':
      model = await Product.findById(id);
      if(!model) { return res.status(400).json({ msg: `The product with id ${id} doesn't exist.`})}
      break;
  
    default:
      return res.status(500).json({ msg: 'Forgot to validate this'})
  }

    if( model.img ){
      //delete img from server
      const imgPath = path.join( __dirname, '../uploads', collection, model.img );
      if( fs.existsSync( imgPath) ){
       return res.sendFile( imgPath );
      }
    }

  res.sendFile(path.join(__dirname, '../assets/no-image.jpg'));
}

module.exports = {
  uploadFiles,
  updateImage,
  showImage
}