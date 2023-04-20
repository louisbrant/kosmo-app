import { combineReducers } from "redux";
import auth from "./auth";
import provider from "./provider";

const rootReducer = combineReducers({
    auth,
    provider
});
export default rootReducer;
