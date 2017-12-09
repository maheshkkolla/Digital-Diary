export default {
  login(user) {
    localStorage.setItem('user', user);
  },

  logout() {
    localStorage.setItem('user', undefined);
  },

  getUserDetails() {
    return localStorage.getItem('user');
  },

  isAuthorised() {
    const userDetails = localStorage.getItem('user');
    return (userDetails !== undefined && userDetails !== null);
  }
};