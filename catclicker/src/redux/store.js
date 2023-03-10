import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import catsReducer from "./reducers"
const rootReducer = combineReducers({
    catsReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));