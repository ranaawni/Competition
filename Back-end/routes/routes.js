const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const mongoose = require("mongoose");

router.post("/signup", async (req, res) => {
  //Check if email is used!
  const addUser = await User.findOne({
    $or: [{ email: req.body.email }],
  });

  if (addUser) {
    return res.status(400).send("email used");
  }

  //Securing password
  const saltPassword = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, saltPassword);
  console.log(req.body, "req");

  const name = req.body.name;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const country = req.body.country;
  const photo = req.body.photo;
  const qualifications = req.body.qualifications;
  const password = securePassword;

  //Adding a new user
  const newUser = await User.create({
    name: name,
    email: email,
    mobile: mobile,
    country: country,
    photo: photo,
    qualifications: qualifications,
    password: password,
  });
  try {
    const saveUser = await newUser.save();
    res.send({ id: newUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login user
router.post("/signin", async (req, res) => {
  //checking if there is an account for this email
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("there is no account with this email");
  }

  //Checking if password is correct
  const validpassword = bcrypt.compareSync(req.body.password, user.password);
  if (!validpassword) return res.status(400).send("password not correct");

  //Authentication
  const token = jwt.sign({ _id: user._id }, "jkhkgjfyhfdydtd");
  var decoded = jwt_decode(token);
  res.header("addUser-token", token).json({ token });
});

//GET all participants
router.get("/participants", async function (req, res) {
  await User.find()
    .populate("userId")
    .exec((err, User) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(User);
    });
});

//GET participants by id
router.get("/participant/:id", function (req, res) {
  User.findById(req.params.id, function (err, User) {
    if (!User) {
      res.status(404).send("No result found");
    } else {
      res.json(User);
    }
  });
});

module.exports.router = router;
