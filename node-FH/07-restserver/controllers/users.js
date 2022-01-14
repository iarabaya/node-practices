const { response, request } = require('express')

const usersGet = (req = request ,res = response ) => {

  // const queryParams = req.query;
  const { q, nombre = "No name", apiKey, page = 1, limit } = req.query;

  res.json({
    msg: 'get API - Controller',
    q,
    nombre,
    apiKey,
    page,
    limit
  })
};

const usersPost = (req,res = response )=>{
  // const body = req.body;
  const { nombre, edad } = req.body;

  res.status(201).json({
    msg: 'post API - Controller',
    nombre, 
    edad
  })
};

const usersPut = (req,res = response )=>{

  const id = req.params.id;

  res.status(400).json({
    msg: 'put API - Controller',
    id
  })
};

const usersPatch = (req,res = response )=>{
  res.status(200).json({
    msg: 'patch API - Controller'
  })
};

const usersDelete = (req,res = response )=>{
  res.json({
    msg: 'delete API - Controller'
  })
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete
}