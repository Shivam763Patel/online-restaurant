const fs = require('fs')

module.exports = {

    
  friendlyName: 'Uplaod sync',


  description: 'for uplaod image',


  inputs: {
    sourceFilePath: {
        type: 'ref',
      },
    filename: {
      type: "string",
    }

  },


  exits: {

    success: {
      description: 'Upload done ',
      fd: 'File Path'
    },

  },


  fn: async function (inputs){
        console.log(inputs,'input');
        const filename = inputs.filename
        fs.readFile(inputs.sourceFilePath,(err,fileContent)=>{
            if(err){throw err}
            const fileParams = {
                Key: `${inputs.destinationDir}/${inputs.fileName}`,
                Body: fileContent,
                ACL: 'public-read',
                ContentType: 'image/'+ ext[1],
              };
        })
        var uploadLocation = process.cwd() +'/assets/images/uploads/' + filename;
        console.log('file', uploadLocation)

        var tempLocation = process.cwd() + '/.tmp/public/images/uploads/' + filename;

        //Copy the file to the temp folder 
        // fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));
   
        return this.exits.success({ description: 'Uploaded', fd: tempLocation});
      }
    

}