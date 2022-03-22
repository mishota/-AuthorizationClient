import UserType from "../models/userType";
import { AuthAction, AuthActionType, AuthState } from "./types";


const initialUser: UserType = {
   name: "",
   email: "",
   password: "",
   text: "",
   img: "",
};
let initialState: AuthState = {
   user: initialUser,
   email: '',
   password: '',
   isAuth: false,
};

export const authReducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
   switch (action.type) {
      case AuthActionType.SET_USER_DATA:
         return {
            ...state,
            ...action.payload,
         }
      case AuthActionType.SET_IS_AUTH:
         return {
            ...state,
            ...action.payload,
         }
      default:
         return state;
   }
};



