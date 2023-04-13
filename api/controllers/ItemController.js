/**
 * ItemController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    addItem: async (req,res) => {

        const id = req.params.id
        let demo
            try{
                await req.file('image').upload({dirname : process.cwd() + '/assets/images/uploads/'},
                     
                function (err, uploadedFiles) {
                   if (err) return res.send(500, err);
                    
                   
                     var image = uploadedFiles[0].fd.substring(uploadedFiles[0].fd.lastIndexOf('/')+1);
                     var uploadLocation = process.cwd() +'/assets/images/uploads/' + image;
                     var tempLocation = process.cwd() + '/.tmp/public/images/uploads/' + image;
                     
                    //  //copt file into temp and fetch
                    //  fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));

                        demo = uploadedFiles[0].fd
                        console.log('data',demo)

                    })

            
                    Item.create(
                    {
                        
                        categoryid: id,

                        itemName: req.body.itemName,

                        description: req.body.description,

                        price: req.body.price,

                        image: demo,

                        displayOrder: req.body.displayOrder


                       
                    })
                    
                    .then(result => {
    
                        res.status(200).send( {
        
        
                            success: true,
                            data: result,
                            message: 'Item has been created !'
                        })
        
        
                    })
    
            }
        
        
            catch(err){
                console.log(err);
                res.status(422).send({
        
        
                message: 'Something went wrong,please try again !'
        
        
              })
            }
         },



    //Edit Item 
     editItem: async(req,res) => {

        const itemName = req.body.itemName
        const description = req.body.description
        const price = req.body.price
        const displayOrder = req.body.displayOrder



        console.log("Account name is", itemName)
        const id = req.params.id
        console.log("Updated id", id)

    
         await Item.updateOne({

            id: id

         },
         {
            itemName: itemName,
            description: description,
            price: price,
            displayOrder: displayOrder

         }
        )   
        .then(result => {

            res.status(200).send( {
    
    
                success: true,
                data: result,
                message: 'Item has been updated !'
            })

        
        })
    },
    


         //List of item with display order
         listItem : async (req,res) => {

            const id = req.params.id
            try{
              
             
          
                const display = await Item.find({ where: {categoryid: id} }).sort([
                    { displayOrder: 'ASC' }
                  ])
                  .then(result => {
  
                      res.status(200).send( {
      
      
                          success: true,
                          Items: result,
                          message: 'Item listed !'
                      })
         
      
      
                  })
                }
            

            catch(error)
            {
                console.log(error);
                res.status(500).send({
        
        
                message: 'Something went wrong,please try again'
        
        
              })
            }
            
        },

    // list of Menu item with sort,filter, and pagination
    listMenu : async(req,res) => {

      

    try{
        const itemName = req.body.itemName

        const { page, limit, name } = req.query

 

        let skip


        if(page<=1)
        {
            skip=0
        }
        else
        {
            skip= (page-1)*limit
        }

            const result=await Item.find({ itemName: req.body.search.itemName.trim() }).populate('categoryid')
            .skip(skip)
            .limit(1)
            .then(result => {
                
        res.status(200).send
        (
            {
                message: 'Successfull, Item details are',
                data: result
            }
        )
        })
    }
      catch(error){
        console.log(error);
        res.status(500).send({


        message: 'Something went wrong,please try again'


      })
    }
},


deleteItem: async (req, res) => {
    const id = req.params.id
 
    await Item.destroy({ id: id })

        .then(result => {
            res.status(200).send( {

                success: true,
                data: result,
                message: 'Item has been deleted !'
            })
        })

},


}

