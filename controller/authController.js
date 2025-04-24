const jwt = require('jsonwebtoken');
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");


exports.createUser = async (req, res) => {
    const { name, role, email, password, userName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
    //     const adminUser = await User.findOne({ role: "admin" });
    //   if (User.role === 'admin' && adminUser) {
    //      return res.status(400).json({ error: "Admin user already exist" })

        const newUser = await new User({ name, role, email, password: hashedPassword, userName });
        const response = await newUser.save();


        if (response) {
            return res.status(200).json({ message: "user created successfully", response });
        }

    }
    catch (error) {
        return res.status(500).json({ message: "internal Server error" });
    }
}

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" })
       return res.json(user);
    }
    catch (error) {
        console.log(error);
        
        return res.status(500).json({ message: "internal Server error" });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const user = await User.find();
        if (user) {
            return res.status(200).json({ message: "User geted successfully", user });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "internal Server error" });
    }
}

exports.updateUser = async (req, res) => {
    try {
        // const userId = req.params.id;
        // const updatedData = req.body;

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);

        if (updatedUser) {
            return res.status(201).json({ message: "user updated successfully", updatedUser});
        }
    }
    catch (error) {
        return res.status(500).json({ message: "internal Server error" });
    }
}

exports.deleteUser = async (req, res) => {

    // id: mongodb Id like as(680778132abd788b4473e833),
    //  Id is totally different

    
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);

        if (deleteUser) {
            return res.status(201).json({ message: "User deleted successfully" });
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "internal Server error" });
    }
}

exports.Register = async (req, res) => {

    const { name, email, userName, password, role} = req.body;
    try {
        // let user = await User.findOne({ email });
        // if (user) {
        //     return res.status(400).json({ message: "User already exist" })
        // }
        const adminUser = await User.findOne({ role: "admin" });
      if (User.role === 'admin' && adminUser) {
         return res.status(400).json({ error: "Admin user already exist" })
      }
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ name, email, userName, password: hashedPassword, role });
        const existingUser = await newUser.save();

        res.status(201).json({ message: "User registered successfully", existingUser });
    }
    catch (error) {
        return res.status(500).json({ message: "internal Server error" });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
}



