const { to, ReE, ReS, isNull, isEmpty } = require('../service/helper')
const { company } = require('../models/company.schema');
const HttpStatus = require("http-status");
const { isObjectIdOrHexString } = require('mongoose');
const objectId = require('mongoose').objectId;
const axios = require('axios');


module.exports.CreateCompany = async (req, res) => {
    const { 
         companyName,
         addressLine1,
         addressLine2, 
         country,
         city, 
         state, 
         area, 
         pincode, 
         companyEmail, 
         courseId, 
         phoneNo

        } = req.body;
    
    //validate the companyName
    if (isNull(companyName)) {
        return ReE(res, { message: "please enter a valid companyName" }, HttpStatus.BAD_REQUEST);
    }

    if (isNull(addressLine1)) {
        return ReE(res, { message: "please enter a valid addressLine1" }, HttpStatus.BAD_REQUEST);
    }

    if (isNull(addressLine2)) {
        return ReE(res, { message: "please enter a valid addressLine2" }, HttpStatus.BAD_REQUEST);
    }

    if (isNull(country)) {
        return ReE(res, { message: "please enter a valid country" }, HttpStatus.BAD_REQUEST);
    }

    if (isNull(city)) {
        return ReE(res, { message: "please enter a valid city" }, HttpStatus.BAD_REQUEST);
    }

    if (isNull(state)) {
        return ReE(res, { message: "please enter a valid state" }, HttpStatus.BAD_REQUEST);
    }

     if (isNull(area)) {
        return ReE(res, { message: "please enter a valid area" }, HttpStatus.BAD_REQUEST);
    }

    if (isNull(pincode)) {
        return ReE(res, { message: "please enter a valid pincode" }, HttpStatus.BAD_REQUEST);
    }

    if (isNull(companyEmail)) {
        return ReE(res, { message: "please enter a valid companyEmail" }, HttpStatus.BAD_REQUEST);
    }

    if (isNull(courseId)) {
        return ReE(res, { message: "please enter a valid courseId" }, HttpStatus.BAD_REQUEST);
    }

    if (isNull(phoneNo)) {
        return ReE(res, { message: "please enter a valid phoneNo" }, HttpStatus.BAD_REQUEST);
    }

    let err, createCompany;
    const newcompany = new company({
        companyName: companyName,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        country: country,
        city: city,
        state: state,
        area: area,
        pincode: pincode,
        companyEmail: companyEmail,
        courseId: courseId,
        phoneNo: phoneNo

    });

    // let createCompany = await newcompany.save(); 

    [err,createCompany] = await to(newcompany.save())


    if (err) {
        return ReE(res, { message: "Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR)
    }


    if (isNull(createCompany)) {
        return ReE(res, { message: 'Company not created sucessfully' }, HttpStatus.BAD_REQUEST);
    }

    if (!isNull(createCompany)) {
        return ReS(res, { message: 'Company saved sucessfully', data: createCompany}, HttpStatus.OK);
    }

}

// route - /company/:id, Method - GET
module.exports.GetCompanyById = async (req, res) => {
    console.log(req.params);

    const companyId = req.params.id;


    //check id in params is valid or not
    if (!isObjectIdOrHexString(companyId)) {
        return ReS(res, { message: 'Select a valid companyId' }, HttpStatus.BAD_REQUEST);
    }


    // let check the requested user is valid or not
    let err, existingCompany;

    [err, existingCompany] = await to(company.findOne({ _id: companyId, active: true }));

    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if (isNull(existingCompany)) {
        return ReE(res, { message: `Company was not found` }, HttpStatus.NOT_FOUND)
    }

    if (!isNull(existingCompany)) {
        return ReS(res, { message: `Company found successfully`, data: existingCompany }, HttpStatus.OK)
    }
}

// route - /company, Method - GET
module.exports.GetAllCompany = async (req, res) => {
    let err, existingCompany;

    //let check the existing Company for requested users
    let getAllCompany;

    [err, getAllCompany] = await to(company.find({ active: true })
        .populate({ path: 'courseId', 'select': 'coursesName' }));

    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    //get all axios
    await axios.get('http://192.168.3.169:8000/api/projects')
        .then(function (response) {
            console.log('axios response', response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            console.log('finally');
        });

    //fetch
    let response = await axios('http://192.168.3.169:8000/api/product', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(response);
    // const data = await response.json();
    console.log('fetch response', response.data)


    if (isEmpty(getAllCompany)) {
        return ReE(res, { message: `No Company were found` }, HttpStatus.NOT_FOUND)
    }

    if (!isEmpty(getAllCompany)) {
        return ReS(res, { message: `Company done successfully`, data: getAllCompany }, HttpStatus.OK)
    }

}

// route - /company/:id, Method - PUT
module.exports.UpdateCompany = async (req, res) => {
    const companyId = req.params.id;

    const data = req.body;


    //let check the company master is valid or not
    if (!isObjectIdOrHexString(companyId)) {
        return ReE(res, { message: `select a valid company Id` }, HttpStatus.BAD_REQUEST)
    }

    if (isEmpty(data)) {
        return ReE(res, { message: `edit something to update company` }, HttpStatus.BAD_REQUEST)
    }

    // let check the requested company is valid or not
    let err, existingCompany, UpdateCompany;

    [err, existingCompany] = await to(company.findOne({ _id: companyId, active: true, }));

    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if (isNull(existingCompany)) {
        return ReE(res, { message: `Requested company was not exists` }, HttpStatus.NOT_FOUND)
    }

    [err, UpdateCompany] = await to(company.updateOne({ _id: companyId }, { $set: { ...data } }))
    console.log(UpdateCompany);
    if (UpdateCompany.modifiedCount == 0) {
        return ReE(res, { message: `company was not updated. contact site admin` }, HttpStatus.NOT_IMPLEMENTED)
    }

    if (UpdateCompany.modifiedCount == 1) {
        return ReS(res, { message: `company updated successfully` }, HttpStatus.OK)
    }
}


// route - /company/:id, Method - DELETE
module.exports.DeleteCompany = async (req, res) => {

    const companyId = req.params.id;

    // let check the requested company is valid or not
    let err, existingCompany, deleteCompany;

    //let check the company is valid or not
    if (!isObjectIdOrHexString(companyId)) {
        return ReE(res, { message: `select a valid company Id` }, HttpStatus.BAD_REQUEST)
    }


    [err, existingCompany] = await to(company.findOne({ _id: companyId, active: true, }));

    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if (isNull(existingCompany)) {
        return ReE(res, { message: `Requested company was not exists` }, HttpStatus.NOT_FOUND)
    }


    [err, deleteCompany] = await to(company.updateOne({ _id: companyId, active: false }))
    if (err) {
        return ReE(res, err, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    console.log(deleteCompany);
    if (deleteCompany.modifiedCompany == 0) {
        return ReE(res, { message: `Cannot delete company, contact site admin` }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    if (deleteCompany.modifiedCount == 1) {
        return ReS(res, { message: `company deleted successfully` }, HttpStatus.OK)
    }

}













