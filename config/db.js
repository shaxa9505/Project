const mongoose = require("mongoose");
module.exports = () => {
    mongoose.connect(process.env.MONGO_URI)
    mongoose.connection.on("open", () => console.log("Mongodb ga ulandik"))
    mongoose.connection.on("error", (err) => console.log("Xatolik =>", err))
}