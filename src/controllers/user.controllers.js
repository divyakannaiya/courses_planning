const {to, ReE, ReS, isNull, isEmpty} = require('../service/helper')
const {user}  = require('../models/user.schema');
const HttpStatus = require("http-status");
const { isObjectIdOrHexString, isValidObjectId } = require('mongoose');


module.exports.CreateUser = async (req,res)=> {
    const { firstName, userName, email, mobileNumber, usertype, active, block } = req.body;
   
    //validate the firstName
    if(isNull(firstName)){
        return ReE( res , {message:"please enter a valid name"},HttpStatus.BAD_REQUEST)
    }

    if(isNull(userName)){
        return ReE( res , {message:"please enter a valid userName"},HttpStatus.BAD_REQUEST)
    }

    if(isNull(email)){
        return ReE( res , {message:"please enter a valid email"},HttpStatus.BAD_REQUEST)
    }

    
    if(isNull(mobileNumber)){
        return ReE( res , {message:"please enter a valid mobileNumber"},HttpStatus.BAD_REQUEST)
    }

     if(isNull(usertype)){
        return ReE( res , {message:"please enter a valid usertype"},HttpStatus.BAD_REQUEST)
    }

    if(isNull(active)){
        return ReE( res , {message:"please enter a valid active"},HttpStatus.BAD_REQUEST)
    }

    if(isNull(block)){
        return ReE( res , {message:"please enter a valid block"},HttpStatus.BAD_REQUEST)
    }

let err, existinguser;

    [err, existinguser] = await to(user.findOne({
        userName: userName,
        active: true
    }));

    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if (!isNull(existinguser)) {
        return ReE(res, { message: `User already exists` }, HttpStatus.BAD_REQUEST)
    }

    const newuser = new user({ 
        userName: userName,
        firstName: firstName,
        email: email,
        mobileNumber: mobileNumber,
        usertype: usertype,
        active: active,
        block: block
        
    });
    let createuser;

    [err, createuser] = await to(newuser.save());

    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if (isNull(createuser)) {
        return ReE(res, { message: `User was not created. contact site admin` }, HttpStatus.NOT_FOUND)
    }

    if (!isNull(createuser)) {
        return ReS(res, { message: "User created successfully", data :createuser,token : createuser.getJWT()  }, HttpStatus.OK)
    }

       
}


// route - /user/:id, Method - GET
module.exports.GetUserById = async (req, res) => {
   

    const userId = req.params.id;

    //   console.log(isObjectIdOrHexString(userId), 'valid id')
    //check id in params is valid or not
    if (!isObjectIdOrHexString(userId)) {
        return ReE(res, { message: "Select a valid user Id" }, HttpStatus.BAD_REQUEST);
      }
      

    // let check the requested user is valid or not
    let err, existingUser;

    [err, existingUser] = await to(user.findOne({ _id:userId, active: true }));

    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if (isNull(existingUser)) {
        return ReE(res, { message: "User was not found" }, HttpStatus.NOT_FOUND);
    }

    if (!isNull(existingUser)) {
        return ReS(res, { message:"User found successfully", data:existingUser,token : existingUser.getJWT() }, HttpStatus.OK)
    }
} 


// route - /user, Method - GET
module.exports.GetAllUser = async (req, res) => {
   
    let err, existingUser;

    //let check the existing User for requested users 
    
    let getAllUser;

    [err,  getAllUser] = await to(user.findOne({ active: true}));

    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if (isEmpty(getAllUser)) {
        return ReE(res, { message: `No User were found` }, HttpStatus.NOT_FOUND);
    }

    if (!isEmpty(getAllUser)) {
        return ReS(res, { message: `User done successfully`, data:getAllUser,token : getAllUser.getJWT() }, HttpStatus.OK)
    }
}


// route - /user/:id, Method - PUT
module.exports.UpdateUser = async (req, res) => {
    const userId = req.params.id;
     console.log("validate the id",req.params.userId)
     const data = req.body;
    //let check the user master is valid or not
    if (!isObjectIdOrHexString(userId)) {
        return ReE(res, { message: `select a valid user id` }, HttpStatus.BAD_REQUEST)
    }
    
    if (isEmpty(data)) {
        return ReE(res, { message: `edit something to update id` }, HttpStatus.BAD_REQUEST)
    }
    
    // let check the requested user is valid or not
    let err, existingUser,UpdateUser;
    
    [err, existingUser] = await to(user.findOne({ _id: id, active: false, }));
    
    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
    
    if (isNull(existingUser)) {
        return ReE(res, { message: `Requested user was not exists` }, HttpStatus.NOT_FOUND)
    }
    
    
    [err,UpdateUser] = await to(user.updateOne({_id : id}, { $set: { ...data}}))
    console.log(err)
    console.log(UpdateUser);
    
        if(UpdateUser.modifiedCount == 0) {
            return ReE(res, { message: `user was not updated. contact site admin`}, HttpStatus.NOT_FOUND)
        }
    
        if(UpdateUser.modifiedCount == 1) {
            return ReS(res, { message: `user updated successfully`}, HttpStatus.OK)
        }
}


    // route - /user/:id, Method - DELETE
module.exports.DeleteUser= async (req, res) => {
    const id = req.params.id;
// console.log(id);
   

    // let check the requested user is valid or not
    let err, existingUser, deleteUser;

    
     //let check the course is valid or not
     if (!isObjectIdOrHexString(id)) {
        return ReE(res, { message: `select a valid user Id` }, HttpStatus.BAD_REQUEST)
    }



    [err, existingUser] = await to(user.findOne({ _id: id, active: true, }));

    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
    if (isNull(existingUser)) {
        return ReE(res, { message: `Requested user was not exists` }, HttpStatus.NOT_FOUND)
    }


    [err,deleteUser] = await to(user.updateOne({_id : id, active: false}))
   if(err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  
    console.log(deleteUser);
    if(deleteUser.modifiedCount == 0) {
        return ReE(res, { message: `Cannot delete user, contact site admin`}, HttpStatus.NOT_ACCEPTABLE);
    }

    if(deleteUser.modifiedCount == 1) {
        return ReS(res, { message: `user deleted successfully`}, HttpStatus.OK);
    }
    
}

   
    
    
    
    
    
    
    
    
    
    
    
    
