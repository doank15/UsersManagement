const mongoose = require('mongoose');
const User = require('./server/model/Users');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const connectDB = require('./config/db');
// connect DB
mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  );

// read data
const users = JSON.parse(fs.readFileSync(`${__dirname}/data/user.json`), 'utf8');

// import data
const importData = async () => {
    try {
        await User.create(users);
        console.log('Imported Data');
        process.exit(0);
    }catch(err) {
        console.log(err);
    }
}

const deleteData = async () => {
    try {
        await User.deleteMany();
        console.log("Deleted Data");
        process.exit(0);
    } catch (error) {
        console.log(error);
    }
}

if(process.argv[2] === '-i') {
    importData();
}else if(process.argv[2] === '-d') {
    deleteData();
}