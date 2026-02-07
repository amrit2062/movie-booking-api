const User = require("../models/user.model");
const { USER_STATUS, USER_ROLE } = require("../utils/constants");

exports.createUser = async (data) => {
  try {
    if (!data.userRole || data.userRole == USER_ROLE.customer) {
      if (data.userStatus && data.userStatus !== USER_STATUS.approved) {
        throw {
          err: "No cannot set for the another status for the customer ",
          code: 400,
        };
      }
    }
    if (data.userRole && data.userRole !== USER_ROLE.customer) {
      data.userStatus = USER_STATUS.painding;
    }

    const response = await User.create(data);
    console.log(response);
    return response;
  } catch (error) {
    //console.log(error);
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: 422 };
    }
    throw error;
  }
};
exports.getUserByEmail = async (email) => {
  try {
    const response = await User.findOne({
      email: email
    });
    if (!response) {
      throw { err: "No user found for the  given email", code: 404 };
    }
    // console.log(response );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

exports.getUserById = async (id)=>{
  try{
     const user =  await User.findById(id);
     if(!User){
      throw {err:"No user  found for the given id", code: 404};
     } 
      return user ;

  }
  catch(error){
    console.log(error);
    throw error; 
  }
};