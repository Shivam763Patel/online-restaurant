/**
 * CategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {

        addCategory: async(req,res) => {
    

       
        try{
    
    
            const categoryData = await Category.find( { categoryName: req.body.categoryName })
    
    
            if(categoryData.length > 0)
            {
    
                res.status(200).send( {
    
    
                    message: "This category is already exists, please enter another one !"
                })
    
         
            }
    
    
            else{
                
       
                await Category.create(
                {
                    categoryName: req.body.categoryName
                   
                   
                }
                )
                .fetch()
                .then(result => {

                    res.status(200).send( {
    
    
                        success: true,
                        data: result,
                        message: 'Category has been created !'
                    })
       
    
    
                })
    
            }
        }
    
    
        catch(err){
            console.log(err);
            res.status(500).send({
    
    
            message: 'Something went wrong,please try again'
    
    
          })
        }
     },

     //Edit Category 
     editCategory: async(req,res) => {

        const categoryName = req.body.categoryName
        console.log("Account name is", categoryName)
        const id = req.params.id
        console.log("Updated id", id)

    
         await Category.updateOne({

            id: id

         },
         {
            categoryName: categoryName           
         }
        )   
        .then(result => {

            res.status(200).send( {
    
    
                success: true,
                data: result,
                message: 'Category has been updated !'
            })

        
        })
    },
    

    deleteCategory: async (req, res) => {
        const id = req.params.id
     
        await Category.destroy({ id: id })

            .then(result => {
                res.status(200).send( {
    
                    success: true,
                    data: result,
                    message: 'Category has been deleted !'
                })
            })
    },


    listCategory: async (req,res) => {


        try{
            const demo = req.query.name
        const find = await Category.find({categoryName: demo}).populate('categoryid')
        .then(result => {
            res.status(200).send( {

                success: true,
                data: result,
                message: 'Category details are.. '
            })
        })
     }
    catch(err){
        console.log(err);
        res.status(500).send({


        message: 'Something went wrong,please try again'


      })
    }
},
}


