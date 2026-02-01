const User = require("../models/user.model");

 exports. createUser =  async(data)=>{
    try{
        const response =  await User.create(data);
        return response ;

    }
    catch( error){
        console.log(error);
        throw error ; 

    }
 }
 