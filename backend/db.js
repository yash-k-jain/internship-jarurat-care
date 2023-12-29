const mongoose = require('mongoose');

// db = process.env.MONGO_URI
// db = "mongodb+srv://yashjain7139:yashjain7139@inotebook-cluster.qc2bwpa.mongodb.net/inotebook?retryWrites=true&w=majority"
db = "mongodb+srv://yashjain7139:yashjain7139@inotebook-cluster.zcakpdw.mongodb.net/inotebook?retryWrites=true&w=majority"

const connectToMongo = () => {
    mongoose.connect(db, { useNewUrlParser: true })
        .then(() => console.log("MongoDB Connected..."))
        .catch(err => console.log(err));
}
module.exports = connectToMongo;
