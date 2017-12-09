import express from "express";
import User from "../models/User";
import authService from "../services/authService";

let router = express.Router();

/* GET users listing. */
router.post('/register', (req, res, next) => {
  let user = new User(req.body);

  authService.register(user)
    .then(createdUser => res.json(createdUser))
    .catch(err => res.status(500).json(err));
});

export default router;
