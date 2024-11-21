const preferenceKeys = {
  userProfile: `userProfile`,
  authToken: `authToken`,
};

export const setProfile = (userDetails) => {
  localStorage.setItem(preferenceKeys.userProfile, JSON.stringify(userDetails));
};

export const setToken = (authToken) => {
  localStorage.setItem(preferenceKeys.authToken, authToken);
};
export const setAddItemToCart = (data) => {
  localStorage.setItem("cartlist", JSON.stringify(data));
};
export const getCartItems = () => {
  return JSON.parse(localStorage.getItem("cartlist"));
};

export const getToken = () => {
  return localStorage.getItem(preferenceKeys.authToken) || "";
};

export const getProfile = () => {
  return JSON.parse(localStorage.getItem(preferenceKeys.userProfile) || {});
};

export const clearStorage = () => {
  localStorage.clear();
};
