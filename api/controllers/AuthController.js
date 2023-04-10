/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  
    add: async (req,res) =>
 {
  

    try{

    const data = await Auth.create(
            {
                 email: req.body.email,
                 password: req.body.password    
        
                
            })
        const adminData = await Auth.findOne( { email: req.body.email })

        if(adminData)
        {
            res.status(200).send( {

                message: "This email is already exists, please enter another one"
            })

        }
        else{
            const admin_data = await Auth.save()
            res.status(200).send( {

                success: true,
                data: admin_data 
            })
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({

        message: 'Something went wrong,please try again'

      })
    }
}


};

