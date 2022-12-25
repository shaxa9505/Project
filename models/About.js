const mongoose = require("mongoose");


const aboutSchema = mongoose.Schema({
    aboutTitle: {
        type: Object,
        required: true
    },
    aboutMe: {
        type: Object,
        required: true
    },
    aboutImg: [{
        type: Object,
        required: true
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("about", aboutSchema)