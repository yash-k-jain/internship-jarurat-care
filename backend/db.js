const mongoose = require('mongoose');

db = process.env.MONGO_URI

const connectToMongo = () => {
    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => console.log("MongoDB Connected..."))
        .catch(err => console.log(err));
}
module.exports = connectToMongo;