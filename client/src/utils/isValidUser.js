export const isValidUser = (user) => {
  return user instanceof Object && Object.keys(user).length;
};
