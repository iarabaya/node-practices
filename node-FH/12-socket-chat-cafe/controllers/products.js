const { response, request } = require('express');
const { Category, Product } = require('../models');

//Get all products
const getProducts = async(req= request, res= response) => {
  const { limit = 5, offset = 0 } = req.query;

  const [ total, products ] = await Promise.all([
    Product.countDocuments({state:true}),
    Product.find({state: true})
            .skip(Number(offset))
            .limit(Number(limit))
            .populate('user', 'name')
            .populate('category', 'name')
  ])

  res.json({
    msg: 'GET all products - Controller',
    total,
    products
  });
}

//Get one product by id
const getProductById = async(req= request, res= response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
                              .populate('user', 'name')
                              .populate('category', 'name');

  res.status(200).json({
    msg: 'GET product by id - Controller',
    product
  })
}

//Create product - checks database
const createProduct = async(req= request, res= response) => {
  
  const { state, user, name, ...body } = req.body
  
  const productDB = await Product.findOne({ name: name.toUpperCase() });

  if( productDB ){
    return res.status(400).json({
      msg:`The product ${productDB.name} already exists.`
    });
  }

  // const category  = await Category.findOne({name: req.body.category.toUpperCase()})
  //Generate data to save
  const data = {
    ...body,
    name: name.toUpperCase(), 
    user: req.authUser._id,
  }

  const product = new Product( data );
  //Save in DB
  await product.save();

  res.status(201).json(product);
}

//UPDATE by id
const updateProduct = async(req= request, res= response) => {
  const { id } = req.params;
  const{ state, user , ...data } = req.body;

  if( data.name ){
    data.name = data.name.toUpperCase();
  }
  //the last user that made the change
  data.user = req.authUser._id;

  const product = await Product.findByIdAndUpdate(id,{ ...data }, {returnDocument: 'after'}).populate('category','name');

  res.status(200).json({
    msg:'UPDATE product - Controller',
    product
  })
}

//DELETE by id
const deleteProduct = async(req= request, res= response) => {
  const { id } = req.params;

  const productDeleted = await Product.findByIdAndUpdate(id, {state: false}, {new:true});

  res.json({
    msg:'DELETE product - Controller',
    productDeleted
  })
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}