//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pmEstimateSchema= new Schema({
    submittedDate: { type: Date, default: Date.now },
    owner: { type: Schema.ObjectId, ref: "User"},
    project:{type:Schema.ObjectId,ref: "Project"},
    task: String,
    quantity:Number,
    meetingPreparation:Number,
    actualMeeting:Number,
    meetingReview:Number,
    consultants:Number,
    certainity:Number,
    sum:Number,
    adjustedSum:Number
  });

  module.exports = mongoose.model("pmEstimate", pmEstimateSchema);
