import knex from "knex";
import config from "../config/index";
import User from "../models/User";
const db = knex(config.db);

let usersRepository = {};

usersRepository.create = (user) => {
  return db('users').returning('id')
    .insert(user.toDBJson())
    .then(createdIds => Promise.resolve(createdIds[0]));
};

usersRepository.findById = (userId) => {
  return db('users')
    .where('id', userId)
    .then(users => Promise.resolve(new User(users[0])));
};

usersRepository.findByEmail = (email) => {
  return db('users')
    .where('email', email)
    .then(users => Promise.resolve(new User(users[0])));
};

export default usersRepository;