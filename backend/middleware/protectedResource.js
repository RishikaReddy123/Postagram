const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

dotenv.config();

module.exports = (req, res, next) => {
    const{authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: "User not logged in!"});
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (error, payload)=>{
        if(error){
            return res.status(401).json({error: "User not logged in!"});
        }
        const{_id} = payload;
        userModel.findById(_id)
        .then(dbUser=>{
            req.dbUser = dbUser;
            next();
        });
    });
}