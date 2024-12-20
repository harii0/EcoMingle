class TokenService {
  getUser = (user) => {
    return JSON.parse(localStorage.getItem(user));
  };
  setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  setVendor = (vendor) => {
    localStorage.setItem('vendor', JSON.stringify(vendor));
  };
  removeUser = (user) => {
    localStorage.removeItem(user);
  };
}

export default new TokenService();
