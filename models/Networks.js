const mongoose = require("mongoose");

const networksSchema = mongoose.Schema({
    networkIcon: {
        type: String,
        required: true
    },
    networkLink: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("network", networksSchema)