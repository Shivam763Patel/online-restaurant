/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


module.exports = {
 
add: async (req,res) =>
 {
 
        const email = req.body.email
        const password  = req.body.password
   
    try{


        const adminData = await Auth.find( { email: req.body.email })


        if(adminData.length > 0)
        {

            res.status(200).send( {


                message: "This email is already exists, please enter another one !"
            })

     
        }


        else{
        
            await Auth.create(
            {
                 email: req.body.email,
                 password: req.body.password    
               
               
            }
            )
            .fetch()
            .then(result => {


                res.status(200).send( {


                    success: true,
                    data: result,
                    message: 'User has been registered !'
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

 login: async (req,res) => 
    {

        const email = req.body.email
        const password = req.body.password

        try{
        
        //Check for Authentication 
        const adminData = await Auth.findOne({ email: email })
        console.log('admin id',adminData.id);
        //Validate password
        bcrypt.compare(password, adminData.password)
       .then(result => {
            

                if(result){

                    console.log('email',adminData.email)
                    console.log('email',adminData.id)

                    //JWT Authentication
                    const jwt_secret = process.env.JWT_KEY || 'secret'
                    const token = jwt.sign(
                    {
                        email: adminData.email,
                        authid: adminData.id,
                        isrole: adminData.isrole

                    },
               
                
                    jwt_secret,
                    { expiresIn: '12h' },

            
                  );

                    //Store Token in cookie named tokenall 
                  const result = { email: adminData.email }
                    res.cookie('tokenall', token, { httpOnly: true }).status(200).send({


                        success: true,
                        data: result,
                        message: 'Logged in successfull !'

                    })

                }
                else
                {
                    return res.status(500).send({
                      
                        message: 'Please, enter valid credential to login !',
                        
                    })
                }
            })
            
        }
        catch(error){
         
            console.log(error)

            res.status(500).json({
                error: error.message
            })
        
        }
    },

    
}
