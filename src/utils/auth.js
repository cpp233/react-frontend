export const getUser = () => {
  const user = sessionStorage.getItem('user') || localStorage.getItem('user');
  return JSON.parse(user);
};

export const setUser = (userPar, remember = false) => {
  const user = JSON.stringify(userPar);
  if (remember) {
    localStorage.setItem('user', user);
  } else {
    sessionStorage.setItem('user', user);
  }
};

export const isLogin = () => {
  return sessionStorage.getItem('user') || localStorage.getItem('user');
};

export const clearUser = () => {
  sessionStorage.removeItem('user');
  localStorage.removeItem('user');
};
