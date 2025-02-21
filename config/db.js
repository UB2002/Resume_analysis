const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


let connect= async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connect;