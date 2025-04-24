const express = require("express");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email:{
        type: String,
        required: true,
        unique: true
},
    userName:{
       type: String,
       required: true,
    },
    password: {
        type: String,
        required: true
    }
});

const user = new mongoose.model("User", userSchema);
module.exports = user;