const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'ashisa$good';

// Route 1 :  Create a User using : POST "/api/auth/createUser." doesnt require auth
router.post('/createUser', [
   body('name', "Enter a valid name").isLength({ min: 3 }),
   body('email', 'Enter a valid Email').isEmail(),
   body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
   let success = false;
   // if there are errror return bad request and the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
   }
   // check whether user with same email exists ? 
   try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(400).json({success, error: 'Sorry, a user with this email already exists' })
      }

      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password, salt);
      
      // Create a new user
      user = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: secPass,
      });

      const data = {
         user : {
            id: user.id,
         }
      }
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);

      // res.json(user);
      res.json({success, authToken});
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
})

// Route 2 : Create a User using : POST "/api/auth/login." doesnt require auth
router.post('/login', [
   body('email', 'Enter a valid Email').isEmail(),
   body('password', 'Password cannot be blank').exists()
], async (req, res) => {
   let success = false;
   // if there are errror return bad request and the errors
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }

   const {email, password} = req.body;
   try {
      let user = await User.findOne({email});
      if(!user){
         return res.status(400).json({error: "Please try to login with correct credentials"});
      }

      const passCompare = await bcrypt.compare(password, user.password);
      if(!passCompare){
         return res.status(400).json({ success, error: "Please try to login with correct credentials"});
      }

      const data = {
         user : {
            id: user.id,
         }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success, authToken});

   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
})

// Route 3 : get loggedin User details : POST "/api/auth/getUser". login required
router.post('/getUser', fetchuser, async (req, res) => {
   try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send({user});
   } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
   }
})

module.exports = router;