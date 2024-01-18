import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASS;

if (!mongoUser || !mongoPass) {
  console.error('MongoDB username or password not provided.');
  process.exit(1);
}

const url = `mongodb+srv://${mongoUser}:${mongoPass}@students.qei2tgm.mongodb.net/?retryWrites=true&w=majority`;

const connection = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

export default connection;
