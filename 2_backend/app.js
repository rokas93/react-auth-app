const express = require('express');
const cors = require('cors');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const connectMongoDB = require('./config/db.js');
const User = require('./models/User.mode.js');
const generateToken = require('./config/generateToken.js');

const app = express();
const PORT = process.env.PORT || 5000;
// --- contenting DB
connectMongoDB();

// Middlewares
const auth = require('./middlewares/auth/auth.js');
app.use(express.json());
app.use(cors());

// Routes
// -- signup new user (registration)
app.post(
  '/api/users',
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // --- checking if user with given email already exists
    const userExists = await User.findOne({ email });

    // --- if exists: throw error
    if (userExists) {
      res.status(400).send('User already exists');
      throw new Error('User already exists');
    }

    // --- if not exist: saving user data to database
    const user = await User.create({
      name,
      email,
      password,
    });

    // --- after data save to db, sending confirmation to user
    if (user) {
      res.status(201).json({
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send('Invalid user data.');
      throw new Error('Invalid user data.');
    }
  })
);

// -- login user (authentification)
app.post(
  '/api/users/login',
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // -- checking if user with given email already exists and passwords matches
    const user = await User.findOne({ email });
    const isPasswordCorrect = await user.matchPassword(password);

    if (user && isPasswordCorrect) {
      // -- if user exists: sending confirmation that user is logged in
      res.status(200).json({
        token: generateToken(user._id),
      });
    } else {
      // -- if user not exists: sending message
      res.status(400).send('Invalid email or passowrd');
      throw new Error('Invalid email or passowrd');
    }
  })
);

// -- get account data (authorization)
app.get(
  '/api/users/account',
  auth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404).send('User not found!');
      throw new Error('User not found!');
    }
  })
);

app.listen(PORT, () => console.log(`Server is runnging on port: ${PORT}`));
