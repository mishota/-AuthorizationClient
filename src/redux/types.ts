import UserType from "../models/userType";

export enum AuthActionType {
   SET_USER_DATA = "auth/SET_USER_DATA",
   SET_IS_AUTH = "auth/SET_IS_AUTH"
}

export interface AuthState {
   user: UserType;
   email: string;
   password: string;
   isAuth: boolean;
}

export type SetAuthUserDataActionPayloadType = {
   user: UserType;
}
export type SetIsAuthActionPayloadType = {
   isAuth: boolean
}
export type SetAuthUserDataActionType = {
   type: typeof AuthActionType.SET_USER_DATA
   payload: SetAuthUserDataActionPayloadType
};
export type SetIsAuthActionType = {
   type: typeof AuthActionType.SET_IS_AUTH
   payload: SetIsAuthActionPayloadType
};

export type AuthAction = SetAuthUserDataActionType | SetIsAuthActionType;

