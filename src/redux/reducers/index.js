import { combineReducers } from "redux";
import product from "./product";
import category from "./category";
import checkout from "./checkout";
import user from "./user";
import auth from "./auth";
import slide from "./slide";
import ongkir from "./ongkir";
import filter from "./filter";
import payment from "./payment";
export default combineReducers({
  product,
  category,
  checkout,
  user,
  auth,
  slide,
  ongkir,
  filter,
  payment,
});
