/**
 * Item.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tablename: 'itemRestaurant',
  attributes: {



    categoryid:{
      model: 'category'
    },
    
    itemName: {
      type:'string'
    },

    description:{

      type:'string'
    },

    price:{

      type: 'number'
    },

    displayOrder: {
      type:'number',
      unique: true


    },
  
  },

};

