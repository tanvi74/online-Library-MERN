const router = require('express').Router();
const User = require('../models/User');
const {registerValidation , loginValidation} = require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Register
router.post('/register', async (req,res)=>{
    console.log(req.body);
 
    // Lets validate the things
    const {error} = registerValidation(req.body);
    if(error){
        return res.json({
            status: "invalidData"
        })
    }
    // } return res.send(error.details[0].message);

    // Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist){
        return  res.json({
            status: "userExists",
        });
    } 

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    console.log(hashPassword);
    // Create New User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        categoryoflogin: req.body.categoryoflogin
    });
    try{
        const savedUser = await user.save();
        const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token);
        res.json({
            status: "success",
            token: token,
            email: req.body.email,
            type: req.body.categoryoflogin,
            name: req.body.name
        });
        // res.send({user: user._id});
    }catch(err){
        res.send(err);
    }


});

// Login
router.post('/login', async(req,res)=>{
    console.log(req.body);

    // Lets validate the things
    const {error} = loginValidation(req.body);
    if(error){
        return res.json({
            status: "invalidData"
        })
    }
    // } return res.send(error.details[0].message);

    // Checking if the user is already in the database
    const user = await User.findOne({email: req.body.email, categoryoflogin: req.body.categoryoflogin});
    if(!user){
        return res.json({
            status: "badPass"
        })
    }
    //  return res.send("Email doesn't exist or you selected the wrong category");


    // PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        return res.json({
            status: "wrongPassword"
        })
    }
    //  return res.send('Invalid Password');


    // Create ab assign a token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token);

    res.json({
        status: "success",
        token: token,
        email: req.body.email,
        type: req.body.categoryoflogin,
        name: user.name
    });
    // res.redirect('/api/dashboard/user');
    
})

module.exports = router;


