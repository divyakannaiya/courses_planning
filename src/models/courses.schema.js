const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({

   courseName: {
    type: String
   },
   address: {
    type: String
   },
   mobileNo: {
    type: String
   },
   city: {
    type: String
   },
   state:{
    type: String
   },
   active: {
    type: Boolean,
    default: true
   }
}, { timestamps: true });

module.exports.course = mongoose.model('course', courseSchema);
