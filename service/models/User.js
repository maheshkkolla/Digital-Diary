export default class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.token = user.token;
  }

  setToken(token) {
    return new User(Object.assign({}, this, {token: token}));
  }

  setPassword(password) {
    return new User(Object.assign({}, this, {password: password}));
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      token: this.token
    }
  }

  toIdentityJson() {
    return {
      id: this.id,
      email: this.email
    };
  }

  toDBJson() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      password: this.password
    };
  }
}