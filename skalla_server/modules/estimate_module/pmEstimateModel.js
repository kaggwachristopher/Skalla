//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pmEstimateSchema= new Schema({
    submittedDate: { type: Date, default: Date.now },
    owner: { type: Schema.ObjectId, ref: "User", required: true },
    project:{type:Schema.ObjectId,ref: "Project", required: true },
    task: String,
    quantity:Number,
    meetingPreparation:Number,
    actualMeeting:Number,
    meetingReview:Number,
    consultantsPresent:Number,
    certainty:Number
  });

  module.exports = mongoose.model("pmEstimate", pmEstimateSchema);
