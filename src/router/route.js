const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const axios = require('axios');


const auth = passport.authenticate('jwt', { session: false })

//import controller
const UserControllers = require('../controllers/user.controllers')
const CourseControllers = require('../controllers/course.controllers')
const CompanyControllers = require('../controllers/company.controllers')

// Courses controller
router.post('/course', CourseControllers.CreateCourse); 
router.get('/course/get/:id',CourseControllers.GetCourseById);
router.get('/course', CourseControllers.GetAllCourse);
router.put('/course/:id', CourseControllers.UpdateCourse);
router.delete('/course/delete/:id', CourseControllers.DeleteCourse);

// company controller
router.post('/company', CompanyControllers.CreateCompany); 
router.get('/company/get/:id', CompanyControllers.GetCompanyById);
router.get('/company', CompanyControllers.GetAllCompany);
router.put('/company/:id', CompanyControllers.UpdateCompany);
router.delete('/company/delete/:id', CompanyControllers.DeleteCompany);

//user controller
router.post('/user', UserControllers.CreateUser);
router.get('/user/get/:id', UserControllers.GetUserById);
router.get('/user', UserControllers.GetAllUser);
router.put('/user/:id', UserControllers.UpdateUser);
router.delete('/user/delete/:id', UserControllers.DeleteUser);


module.exports = router;