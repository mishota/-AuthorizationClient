import { applyMiddleware, combineReducers, createStore } from "redux"
import { authReducer } from "./authReducer";
import thunk from 'redux-thunk';

export const rootReducer = combineReducers({
   auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));


