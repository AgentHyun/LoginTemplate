const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require("./models/Models/User");

// application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World! '));

app.get('/api/hello', (req, res) => res.send('Hello World! '));

app.post('/api/users/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(200).json({
      success: true
    });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Provided email does not match any user."
      });
    }

    const isMatch = await user.comparePassword(req.body.password);

    if (!isMatch) {
      return res.json({ loginSuccess: false, message: "Incorrect password." });
    }

    const userWithToken = await user.generateToken();
    res.cookie("x_auth", userWithToken.token)
      .status(200)
      .json({ loginSuccess: true, userId: userWithToken._id });
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  });
});

app.get('/api/users/logout', auth, async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.json({ success: false, error });
  }
});

const port = 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
