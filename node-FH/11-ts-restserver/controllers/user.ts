import { Request, Response } from "express";
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) =>{
  
  const users = await User.findAll();
  
  res.json({
    msg: 'getUsers',
    users
  })
}

export const getUser = async (req: Request, res: Response) =>{
  const { id } = req.params;

  const user = await User.findByPk(id);
  if( user ){
    res.json({
      msg: 'getUser',
      user
    })
  } else {
    res.status(404).json({
      msg: `Inexistent user with id ${id}`
    })
  }
  
}

export const postUser = async (req: Request, res: Response) =>{
  const { body } = req;
  
  try {
    const emailExists = await User.findOne({ 
      where: { email: body.email }
    })

    if (emailExists){
      return res.status(400).json({
        msg: 'An user with that email already exist' + body.email
      })
    }
    const user = await User.create(body);

    res.json( user );
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Comunicate with administrator'
    })
  }

}

export const putUser = async (req: Request, res: Response) =>{
  const { id } = req.params;
  const { body } = req;

  try {
   const user = await User.findByPk(id);
   if(!user){
     return res.status(404).json({
        msg: `An user with id ${id} doesn't exist.`
      })
   }

   await user.update(body);

   res.json( user );
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Comunicate with administrator'
    })
  }
  
}

export const deleteUser = (req: Request, res: Response) =>{
  const { id } = req.params;
  
  res.json({
    msg: 'deleteUser',
    id
  })
}
