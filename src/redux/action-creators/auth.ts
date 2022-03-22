import { Dispatch } from "redux"
import { MainFetchApi, url } from "../../api/Api"
import UserType from "../../models/userType"
import { AuthAction, AuthActionType, SetAuthUserDataActionPayloadType } from "../types"

export const fetchUser = (email: string, password: string) => {
   return async (dispatch: Dispatch<AuthAction>) => {
      const foundUser: UserType = await MainFetchApi.getUser(email, password);
      console.log("foundUser:", foundUser);
      if (foundUser) {
         const parts = foundUser.img.split("\\");
         const img = `${url}/users/user/image/${parts[parts.length - 1]}`;
         foundUser.img = img;
         const payLoad: SetAuthUserDataActionPayloadType = { user: foundUser };
         dispatch({ type: AuthActionType.SET_USER_DATA, payload: payLoad });
         dispatch({ type: AuthActionType.SET_IS_AUTH, payload: { isAuth: true } });

      }
   }
}

export const fetchCreateUser = (userDto: UserType) => {
   return async (dispatch: Dispatch<AuthAction>) => {
      console.warn("fetchCreateUser - userDto:", userDto);
      const createdUser: UserType = await MainFetchApi.createUser(userDto);
      console.log("answer for createUser:", createdUser);
      if (createdUser) {
         dispatch({ type: AuthActionType.SET_USER_DATA, payload: { user: createdUser } });
         dispatch({ type: AuthActionType.SET_IS_AUTH, payload: { isAuth: true } });
      }
   }
}
