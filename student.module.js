import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roll: {
    type: String,
    required: true,
  },
  age: {
    type: Number,  // Use Number for age
    required: true,
  },
  gender: {
    type: String,  // Or you can use an Enum for gender
  // Adjust the values based on your requirements
    required: true,
  },
});

const user = mongoose.model("user", userSchema);
export default user;
