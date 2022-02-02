const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } =  require('../models');

const availableCollections = [
  'categories',
  'products',
  'roles',
  'users'
]

const searchUsers = async(term = '', res= response) =>{
  const isMongoId = ObjectId.isValid(term); //TRUE

  if( isMongoId ){
    const user = await User.findById(term);
    return res.json({
      results: (user) ? [ user ] : []
    });
  }

  const regex = new RegExp( term, 'i');

  const users = await User.find({ 
    $or: [{name: regex}, {email: regex}],
    $and: [{state: true}]
   });

  res.json({
    results: users
  })
}

const searchCategories = async(term = '', res= response) =>{
  const isMongoId = ObjectId.isValid(term); //TRUE

  if( isMongoId ){
    const category = await Category.findById(term);
    return res.json({
      results: (category) ? [ category ] : []
    });
  }

  const regex = new RegExp( term, 'i');
  const categories = await Category.find({ name: regex, state:true});

  res.json({
    results: categories
  })
}

const searchProducts = async(term = '', res= response) =>{
  const isMongoId = ObjectId.isValid(term); //TRUE

  if( isMongoId ){
    const product = await Product.findById(term).populate('category','name');
    return res.json({
      results: (product) ? [ product ] : []
    });
  }

  const regex = new RegExp( term, 'i');

  const users = await Product.find({ 
    $or: [{name: regex}, {description: regex}],
    $and: [{state: true}]
   }).populate('category','name');

  res.json({
    results: users
  })
}

const search = (req, res = response) => {
  const { collection, term } = req.params;

  if( !availableCollections.includes(collection)){
    return res.status(400).json({
      msg: `The available collections are ${availableCollections}`
    })
  }

  switch (collection) {
    case 'category': searchCategories(term, res)
      break;
    case 'products': searchProducts(term, res)
      break;
    case 'users': searchUsers(term, res)
      break;
  
    default: res.status(500).json({
      msg: 'Ups, we forgot to make this search'
    })
      break;
  }

}

module.exports = { 
  search
}