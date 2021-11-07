import { combineReducers } from "redux";
import user from '_reducers/user_reducer';

const reducers = combineReducers({
  user,
});

export default reducers;