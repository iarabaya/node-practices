const mongoose = require('mongoose');

const dbConnection = async () =>{
  try {
        //Deprecated
        // const options =  {
        //   useNewUrlParser: true,
        //   useUnifiedTopology: true,
        //   useCreateIndex: true,
        //   useFindAndModify: false
        // }

    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('Base de datos online');

  } catch (error) {
    console.log(error);
    throw new Error('Error at initializing database');
  }
}

module.exports = {
  dbConnection
}