//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consultantEstimateSchema= new Schema({
    submittedDate: { type: Date, default: Date.now },
    owner: { type: Schema.ObjectId, ref: "User", required: true },
    project: {type:Schema.ObjectId,ref: "Project", required: true },
    task: String,
    quantity:Number,
    meetingPreparation:Number,
    actualMeeting:Number,
    meetingReview:Number,
    certainity:Number,
    sum:Number,
    adjustedSum:Number
  });

  module.exports = mongoose.model("consultantEstimate", consultantEstimateSchema);
