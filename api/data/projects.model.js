var mongoose = require('mongoose');
/*
var reviewSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  rating : {
    type : Number,
    required : true,
    min : 0,
    max : 5
  },
  review : {
    type : String,
    required : true
  },
  createdOn : {
    type : Date,
    "default" : Date.now
  }
});

var roomSchema = new mongoose.Schema({
  type : String,
  number : Number,
  description : String,
  photos : [String],
  price : Number
});
*/
var projectSchema = new mongoose.Schema({
  projectName : {
    type : String,
    required : true
  },
  client : {
    type : String,
  },
  customerName : {
    type : String,
    required : true
  },
  typeOfProject : {
    type : String,
    required : true
  },
  projectTimeFrame : {
    type : String,
    required : true
  },
  projectBudget : {
    type : Number
  },
  crew : {
    type: [String]
  },
  photos : {
    type : [String]
  },
  location : {
    address : String,
    // Always store coordinates longitude (East/West), latitude (North/South) order.
    coordinates : {
      type : [Number],
      index : '2dsphere'
    }
  }
});

mongoose.model('Project', projectSchema);