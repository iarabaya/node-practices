const { response, request } = require('express');
const { Category } = require('../models');

//Get categories - pagination - total - populate
const getCategories = async (req= request, res= response) => {
  const { limit = 5, offset = 0 } = req.query;

  const [ total, categories] = await Promise.all([
    Category.countDocuments({state:true}),
    Category.find({state: true})
            .skip(Number(offset))
            .limit(Number(limit))
            .populate('user', 'name')
  ])

  res.json({
    msg: 'GET all categories - Controller',
    total,
    categories
  });
}

//Get one category - populate()
const getCategoryById = async (req= request, res= response) => {
  const { id } = req.params;
  const category = await Category.findById(id).populate('user', 'name');

  res.status(200).json({
    msg: 'GET category by id - Controller',
    category
  })
}

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  
  const categoryDB = await Category.findOne({ name });

  if( categoryDB ){
    return res.status(400).json({
      msg:`The category ${categoryDB.name} already exists.`
    });
  }

  //Generate data to save
  const data = {
    name,
    user: req.authUser._id
  }

  // console.log(data);
  const category = new Category( data );
  //Save in DB
  await category.save();

  res.status(201).json(category);

}

//Update category - name
const updateCategory = async (req= request, res = response) =>{
  const { id } = req.params;
  // const{ state, user, ...data } = req.body;
  //data.name = data.name.toUpperCase();

  const name = req.body.name.toUpperCase();
  const user = req.user._id;

  const category = await Category.findByIdAndUpdate(id,{ name }, {returnDocument: 'after'}).populate('user','name');

  res.status(200).json({
    msg:'UPDATE category - Controller',
    category,
    user
  })
}

//delete category - change state:true to false
const deleteCategory = async(req= request, res= response) =>{

  const { id } = req.params;

  const categoryDeleted = await Category.findByIdAndUpdate(id, {state: false}, {new:true});

  res.json({
    msg:'DELETE category - Controller',
    categoryDeleted
  })

}


module.exports = {
   getCategories,
   getCategoryById,
   createCategory,
   updateCategory,
   deleteCategory
}