/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

    'post /admin/register':'AuthController.add',
    'post /admin/login':'AuthController.login',

    //Add category by admin
    'post /admin/addCategory': 'CategoryController.addCategory',

    //Edit category by admin
    'put /admin/editCategory/:id': 'CategoryController.editCategory',

    //Delete Category by admin
    'post /admin/deleteCategory/:id': 'CategoryController.deleteCategory',

        //List of Category with item  
        'get /admin/listCategory': 'CategoryController.listCategory',


    //Add item through Category
    'post /admin/addItem/:id': 'ItemController.addItem',

      //Edit Item by admin
      'put /admin/editItem/:id': 'ItemController.editItem',


    //Delete Item by admin
    'post /admin/deleteItem/:id': 'ItemController.deleteItem',

    //List of item
    'get /admin/list/:id': 'ItemController.listItem',


    //List of Menu item with Search, Filter, and Pagination
    'post /admin/listMenu': 'ItemController.listMenu',

    //User list for menu item with order and group by menu category.
    'get /admin/list': 'CategoryController.listUser',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
