const mongoose = require("mongoose");

const technologySchema = mongoose.Schema({
    technologyImg: {
        type: Object,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("technology", technologySchema)