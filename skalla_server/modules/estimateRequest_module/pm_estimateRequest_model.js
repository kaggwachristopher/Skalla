//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Defining pm estimate request schema
const Pm_estimateRequestSchema = new Schema({
    project: { type: Schema.ObjectId, ref: "Project", required: true },
    developer: { type: Schema.ObjectId, ref: "User", required: true },
    projectManager: { type: Schema.ObjectId, ref: "User" },
    ProjectTitle: { type: String },
    quantity: Number,
    preparationTotal: Number,
    actualMeetingTotal: Number,
    meetingReviewTotal: Number,
    certainity: Number,
    dateCreated: { type: Date, default: Date.now },
    dueDate: { type: String },
    DateEstimated: { type: Date, default: Date.now },
    SumTotal: Number,
    AdjustedTotal: Number,
    status: {
        type: String,
        enum: ["Draft", "Submitted", "Estimated"]
      },
});

//exportingthe pm estimate request model
module.exports = mongoose.model("Pm_estimateRequest", Pm_estimateRequestSchema);
