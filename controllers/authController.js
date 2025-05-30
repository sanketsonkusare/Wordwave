const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Registering a user

exports.signup = async (req, res) => {
    try{
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: "User already exists "});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User ({username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

//Login user

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};