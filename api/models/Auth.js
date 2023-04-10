/**
 * Auth.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const bcrypt = require('bcrypt')

module.exports = {
tablename: 'adminRestaurant',
  attributes: {

    email:
    {
        type:'string',
        isEmail: true,
        unique: true,
        required: true

    },
  
    password:
    {
        type: 'string',
        minLength: 5,
        required: true

    },
    
  },

  beforeCreate: function(values, cb) {
    // Hash password
    bcrypt.hash(values.password, 10, function(err, hash) {
        if (err) return cb(err);
    
        values.password = hash;
 
        cb();
    });
    
},


};

