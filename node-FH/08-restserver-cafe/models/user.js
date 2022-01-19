const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: { 
    type: String, 
    required: [true, 'You must provide a name']
  },
  email: {
    type: String, 
    required: [true, 'You must provide an email'],
    unique: true
  },
  password: {
    type: String, 
    required: [true, 'You must provide a password'],
  },
  img: String,
  role:{
    type: String, 
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE','SALES_ROLE']
  }, 
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
})

//avoid sending the password and version in the response
UserSchema.methods.toJSON = function(){
  const { __v, password, ...user } = this.toObject();
  return user;
}

module.exports = model('User', UserSchema);