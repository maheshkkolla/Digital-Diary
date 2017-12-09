import usersRepository from "../repositories/usersRepository";
let usersService = {};

usersService.create = (user) => {
  // TODO: Have a check for unique user (unique email)
  return usersRepository.create(user)
    .then(createdUserId => usersRepository.findById(createdUserId));
};

export default usersService;