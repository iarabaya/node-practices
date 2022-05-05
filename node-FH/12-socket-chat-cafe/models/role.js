const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'There must be a role']
  }
})

module.exports = model('Role', RoleSchema);