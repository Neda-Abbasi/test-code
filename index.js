// Import required packages
import express from 'express'
import mongoose from 'mongoose'
// import dotenv from 'dotenv'
import 'dotenv/config'
// Create an Express app
const app = express()

// Load environment variables from .env file
dotenv.config()

// Set the port from environment variables or default to 7000
const PORT = process.env.PORT || 7000


// Get the MongoDB connection URL from environment variables
const MONGOURL = process.env.MONGO_URL

// Connect to MongoDB and start the server
mongoose.connect(MONGOURL).then(() => {
  console.log('Database connected successfully.')
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
.catch((error) => console.log(error));

const userSchema = new mongoose.Schema({
    name: String,
    lname: String,
  });

const UserModel = mongoose.model("users", userSchema);

app.get("/getusers", async (req, res) => {
    // Await fetching all user data from the database using the UserModel
    const userData = await UserModel.find();
    // Send the user data as a JSON response
    res.json(userData);
  });
