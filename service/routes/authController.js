import express from "express";
import config from "../config/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import usersService from "../services/usersService";

let router = express.Router();

/* GET users listing. */
router.post('/register', function(req, res, next) {
  let user = new User(req.body);
  user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));

  usersService.create(user).then((createdUser)=>{
    const token = jwt.sign(createdUser.toIdentityJson(), config.secretKey, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).json(createdUser.setToken(token).toJson());
  }).catch(err => res.status(500).json(err));
});

export default router;
