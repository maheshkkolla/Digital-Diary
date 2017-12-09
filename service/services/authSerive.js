import jwt from "jsonwebtoken";
import config from "../config/index";
import usersRepository from "../repositories/usersRepository";

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
  return usersRepository.create(user).then((createdUser)=>{
    const token = jwt.sign(createdUser.toIdentityJson(), config.secretKey, {
      expiresIn: 86400 // expires in 24 hours
    });
    return Promise.resolve(createdUser.setToken(token).toJson());
  });

};

export default authSerivce;