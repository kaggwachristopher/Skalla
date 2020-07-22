//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//project schema and model
const ProjectSchema = new Schema({
    name: {type:String, unique:true},
    developers:Number,
    dailyScrum: Number,
    pmsInvolved: Number,
    pmOverhead: Number,
    comments: String,
    consultant: String,
    consultantEstimate:{type:Boolean,default:false}
})

module.exports = mongoose.model('Project', ProjectSchema);
