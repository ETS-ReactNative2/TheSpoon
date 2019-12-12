//This file consist of the urls to the API which do not require a variable

//Login
export const STUB_LOGIN = `http://192.168.1.110:8080/api/user/login/`;
export const SERVER_LOGIN = `https://thespoon.herokuapp.com/api/user/login`;

//Search
export const STUB_SEARCH =
  "http://192.168.1.110:8080/api/user/customer/menu/searchByMenuItem?menuItemName={searchString}";
export const SERVER_SEARCH =
  "https://thespoon.herokuapp.com/api/user/customer/menu/searchByMenuItem?menuItemName={searchString}";

//MenuPage
export const STUB_GET_MENUITEM = menuId => {
  return `http://192.168.1.110:8080/api/user/customer/menu/${menuId}`;
};
export const SERVER_GET_MENUITEM = menuId => {
  return `https://thespoon.herokuapp.com/api/user/customer/menu/${menuId}`;
};

//Profile
export const STUB_PROFILE_USERINFO = `http://192.168.1.110:8080/api/user/customer/`;
export const SERVER_PROFILE_USERINFO = `https://thespoon.herokuapp.com/api/user/customer/`;
export const STUB_PROFILE_USERREVIEWS = `http://192.168.1.110:8080/api/user/customer/review`;
export const SERVER_PROFILE_USERREVIEWS = `https://thespoon.herokuapp.com/api/user/customer/review`;
export const STUB_DELETE_REVIEW = reviewID => {
  return `http://192.168.1.110:8080/api/user/customer/review/${reviewID}`;
};
export const SERVER_DELETE_REVIEW = reviewID => {
  return `https://thespoon.herokuapp.com/api/user/customer/review/${reviewID}`;
};
//ReviewAddImage
export const STUB_POST_IMAGE = `http://192.168.1.110:8080/api/image/`;
export const SERVER_POST_IMAGE = `https://thespoon.herokuapp.com/api/image/`;

//ReviewAddRestaurant
export const STUB_GET_RESTAURANTS = `http://192.168.1.110:8080/api/user/customer/review/restaurant`;
export const SERVER_GET_RESTAURANTS = `https://thespoon.herokuapp.com/api/user/customer/review/restaurant`;

//ReviewAddMenu
export const STUB_GET_MENUS = restaurantID => {
  return `http://192.168.1.110:8080/api/user/customer/review/restaurant/${restaurantID}/menu`;
};
export const SERVER_GET_MENUS = restaurantID => {
  return `https://thespoon.herokuapp.com/api/user/customer/review/restaurant/${restaurantID}/menu`;
};

//ReviewAddItems
export const STUB_GET_MENUITEMS = menuID => {
  return `http://192.168.1.110:8080/api/user/customer/review/restaurant/menu/${menuID}/menuItem`;
};
export const SERVER_GET_MENUITEMS = menuID => {
  return `https://thespoon.herokuapp.com/api/user/customer/review/restaurant/menu/${menuID}/menuItem`;
};

//ReviewOverall
export const STUB_POST_REVIEW = menuID => {
  return `http://192.168.1.110:8080/api/user/customer/review/restaurant/menu/${menuID}`;
};
export const SERVER_POST_REVIEW = menuID => {
  return `https://thespoon.herokuapp.com/api/user/customer/review/restaurant/menu/${menuID}`;
};
