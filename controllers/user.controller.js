const userService = require('../services/user.service');
const {errorResponseBody,successResponseBody} = require('../utils/responsebody');


exports.update = async (req,res)=>{
    try{
         const response = await userService.updateUserRoleStatus(req.body,req.params.id);
         successResponseBody.data = response ;
         successResponseBody.message = "Successfully updated to the user ";
         return res.status(200).json(successResponseBody);
         

    }
    catch(error){
        if(error.err){
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error ;
         return res.status(500).json(errorResponseBody);

    }

}