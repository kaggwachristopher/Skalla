//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//project schema and model
const ProjectSchema = new Schema({
    name: {type:String, unique:true},
    developers:Number,
    dailyScrum: Number,
    pmsInvolved: { type: Schema.ObjectId, ref: "User"},
    pmOverhead: Number,
    comments: String,
    consultant: String,
    consultantEstimate:{type:Boolean,default:false},
    consultantDueDate:{ type: String },
    consultantComment:String
})

module.exports = mongoose.model('Project', ProjectSchema);
