import usersRepository from "../repositories/usersRepository";
let usersService = {};

usersService.create = (user) => {
  return usersRepository.create(user)
    .then(createdUserId => usersRepository.findById(createdUserId));
};

export default usersService;