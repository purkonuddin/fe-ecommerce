import { combineReducers } from "redux";
import product from "./product";
import category from "./category";
// import user from "./user";
// import histories from "./history";
import auth from "./auth";
import slide from "./slide";
// import merchant from "./merchant";
import filter from "./filter";
export default combineReducers({
  product,
  category,
//   histories,
//   user,
  auth,
  slide,
//   merchant,
  filter,
});
