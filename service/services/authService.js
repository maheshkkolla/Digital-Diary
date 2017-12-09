import jwt from "jsonwebtoken";
import config from "../config/index";
import usersService from "../services/usersService";
import usersRepository from "../repositories/usersRepository";
import bcrypt from "bcryptjs";

let authSerivce = {};

authSerivce.authenticate = (token) => {
  const self = this;
  return new Promise((resolve, reject) => {
    if(!token) {
      reject({status: 401, message: "Token not found"});
      return;
    }
    jwt.verify(token, config.secretKey, (err, decoded) => {
      err ? reject({status: 500, message: "Failed to authenticate token"}) : resolve(decoded);
    }).then(decoded => usersRepository.find(decoded.id));
  });
};

authSerivce.register = (user) => {
  user = user.setPassword(bcrypt.hashSync(user.password, bcrypt.genSaltSync(8)));
  return usersService.create(user).then((createdUser)=>{
    const token = authSerivce.generateToken(createdUser);
    return Promise.resolve(createdUser.setToken(token).toJson());
  });
};

authSerivce.login = (user) => {
  return new Promise((resolve, reject) => {
    usersRepository.findByEmail(user.email)
      .then(dbUser => {
        (dbUser && bcrypt.compareSync(user.password, dbUser.password)) ? resolve(dbUser) : reject({status: 401, message: "Invalid Credentials"});
      }).then(dbUser => {
        const token = authSerivce.generateToken(dbUser);
        return Promise.resolve(dbUser.setToken(token).toJson());
      });
  });
};

authSerivce.generateToken = (user) => {
  jwt.sign(user.toIdentityJson(), config.secretKey, {
    expiresIn: 86400 // expires in 24 hours
  });
};

export default authSerivce;