import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alerts";
import users from "./users";
import crm from "./crm"

export default combineReducers({
  auth,
  alerts,
  users,
  crm
});
