const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

let companySchema = new mongoose.Schema({
   companyName: {
    type: String
   },
   addressLine1: {
    type: String
   },
   addressLine2: {
    type: String
   },
   country: {
    type: String
   },
   city: {
    type: String
   },
   state: {
    type: String
   },
   area: {
    type: String
   },
   pincode: {
    type: String
   },
   companyEmail: {
    type: String
   },
   courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courses',
   },
   active: {
    type: Boolean,
    default: true
   }
},
{ timestamps: true });


module.exports.company = mongoose.model('company', companySchema)

