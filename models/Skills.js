const mongoose = require("mongoose");


const skillsSchema = mongoose.Schema({
    skillsImg: {
        type: Object,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("skills", skillsSchema)