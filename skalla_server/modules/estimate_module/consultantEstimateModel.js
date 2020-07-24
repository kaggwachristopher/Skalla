//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consultantEstimateSchema= new Schema({
  submittedDate: { type: Date, default: Date.now },
  owner: { type: Schema.ObjectId, ref: "User"},
  project:{type:Schema.ObjectId,ref: "Project",required:true},
  task: {type:String, required:true},
  quantity:Number,
  meetingPreparation:Number,
  actualMeeting:{type:Number,required:true},
  meetingReview:Number,
  consultants:Number,
  certainity:Number,
  sum:Number,
  adjustedSum:Number,
  comments:""
  });

  module.exports = mongoose.model("consultantEstimate", consultantEstimateSchema);
