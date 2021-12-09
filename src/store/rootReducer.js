import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import vet from "./vet/reducer";
import pet from "./pet/reducer";
import procedureType from "./procedureType/reducer";

export default combineReducers({
  appState,
  user,
  vet,
  pet,
  procedureType,
});
