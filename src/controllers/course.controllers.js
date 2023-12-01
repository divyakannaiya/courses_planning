const {to, ReE, ReS, isNull, isEmpty} = require('../service/helper')
const HttpStatus = require("http-status")
const courseSchema = require('../models/courses.schema');
const { isObjectIdOrHexString} = require('mongoose');
const course = require('../models/courses.schema')
module.exports.CreateCourse = async (req,res) => {
    const {  address, mobileNo, city, state } = req.body;
    const courseName =req.body.courseName;
    let err,savedCourse;

    const newcourse = new course({
        courseName: courseName,
        address: address,
        mobileNo: mobileNo,
        city: city,
        state: state
          
    });

    console.log(newcourse);

    // let savedCourse = await newcourse.save();

    [err,savedCourse] = await to(newcourse.save())


    if(err){
        return ReE(res,{message :"Server Error"},HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if(isNull(savedCourse)) {
        return ReE(res,{ message: 'Courses Not Created sucessfully'},HttpStatus.BAD_REQUEST)
    }

    if(!isNull(savedCourse)) {
        return ReS(res,{ message: 'Course saved sucessfully', data: savedCourse}, HttpStatus.CREATED)
    }

}



// route - /course/:id, Method - GET
module.exports.GetCourseById = async (req, res) => {
    console.log(req.params);

    const courseId = req.params.id;


    //check id in params is valid or not
    if (!isObjectIdOrHexString(courseId)) {
        return ReE(res, { message: `select a valid course Id` }, HttpStatus.BAD_REQUEST)
    }

    // let check the requested user is valid or not
    let err, existingCourse;

    [err, existingCourse] = await to(course.findOne({ _id: courseId, active: true }));

    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }


    if (isNull(existingCourse)) {
        return ReE(res, { message: `Course was not found` }, HttpStatus.NOT_FOUND)
    }

    if (!isNull(existingCourse)) {
        return ReS(res, { message: `Course found successfully`, data:existingCourse }, HttpStatus.OK)
    }
}

// route - /course, Method - GET
module.exports.GetAllCourse = async (req, res) => {
    let err, existingCourse;

    //let check the existing Course for requested users 
    let getAllCourse;

    [err,  getAllCourse] = await to(course.findOne({ active: true}));

    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if (isEmpty(getAllCourse)) {
        return ReE(res, { message: `No Course were found` }, HttpStatus.NOT_FOUND)
    }

    if (!isEmpty(getAllCourse)) {
        return ReS(res, { message: `Course done successfully`, data:getAllCourse }, HttpStatus.OK)
    }
}


// route - /course/:id, Method - PUT
module.exports.UpdateCourse = async (req, res) => {
    const { courseId } = req.params.id;
    
    const data = req.body;
    
    
    //let check the course master is valid or not
    if (!isObjectIdOrHexString(courseId)) {
        return ReE(res, { message: `select a valid course Id` }, HttpStatus.BAD_REQUEST)
    }
    
    if (isEmpty(data)) {
        return ReE(res, { message: `edit something to update course` }, HttpStatus.BAD_REQUEST)
    }
    
    // let check the requested course is valid or not
    let err, existingCourse,UpdateCourse;
    
    [err, existingCourse] = await to(course.findOne({ _id: courseId, active: true, }));
    
    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
    if (isNull(existingCourse)) {
        return ReE(res, { message: `Requested course was not exists` }, HttpStatus.NOT_FOUND)
    }
    
    [err,UpdateCourse] = await to(course.updateOne({_id : courseId}, { $set: { ...data}}))
    console.log(UpdateCourse);
        if(UpdateCourse.modifiedCount == 0) {
            return ReE(res, { message: `course was not updated. contact site admin`}, HttpStatus.NOT_IMPLEMENTED)
        }
    
        if(UpdateCourse.modifiedCount == 1) {
            return ReS(res, { message: `course updated successfully`}, HttpStatus.OK)
        }
    }


    // route - /course/:id, Method - DELETE
module.exports.DeleteCourse= async (req, res) => {
    const courseId = req.params.id; 

    // let check the requested course is valid or not
    let err, existingCourse, deleteCourse;

    
     //let check the course is valid or not
     if (!isObjectIdOrHexString(courseId)) {
        return ReE(res, { message: `select a valid course Id` }, HttpStatus.BAD_REQUEST)
    }


    [err, existingCourse] = await to(course.findOne({ _id: courseId, active: true, }));

    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
    if (isNull(existingCourse)) {
        return ReE(res, { message: `Requested course was not exists` }, HttpStatus.NOT_FOUND)
    }


    [err,deleteCourse] = await to(course.updateOne({_id : courseId,active: false}))
   if(err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  
    console.log(deleteCourse);
    if(deleteCourse.modifiedCount == 0) {
        return ReE(res, { message: `Cannot delete course, contact site admin`}, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if(deleteCourse.modifiedCount == 1) {
        return ReS(res, { message: `course deleted successfully`}, HttpStatus.OK)
    }
    
}

   
    
    
    
    
    
    
    
    
    
    
    
    
