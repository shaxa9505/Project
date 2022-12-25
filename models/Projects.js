const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    projectLink: {
        type: String,
        required: true
    },
    projectImg: {
        type: Object,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("project", projectsSchema)