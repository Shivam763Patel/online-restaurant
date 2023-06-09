/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  AuthController: {

    '*': 'isAdmin',
    'add': true,
    'login': true
  },
  
  CategoryController: {


    'addCategory' : 'isAdmin',
    'editCategory': 'isAdmin',
    'deleteCategory': 'isAdmin',
    'listCategory': 'isAdmin',
    'listUser': 'isAdmin'


  },

  ItemController: {
  'addItem': 'isAdmin',
  'editItem': 'isAdmin',
  'deleteItem': 'isAdmin',
  'listItem': 'isAdmin',
  'listMenu': 'isAdmin'

  },

};
