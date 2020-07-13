//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//project schema and model
const ProjectSchema = new Schema({
    name: String,
    developers:Number,
    dailyScrum: Number,
    pmsInvolved: Number,
    pmOverhead: Number,
    comments: String,
    consultant: String
})

module.exports = mongoose.model('Project', ProjectSchema);
