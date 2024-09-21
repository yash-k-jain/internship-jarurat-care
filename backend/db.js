const mongoose = require('mongoose');

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then(() => console.log("MongoDB Connected..."))
        .catch(err => console.log(err));
}
module.exports = connectToMongo;
