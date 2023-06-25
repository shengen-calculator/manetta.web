import {types} from "./types";

export type AuthenticationAction = {
    type: types.AUTHENTICATION_REQUEST
    params: AuthenticationParams
}

export type RegistrationAction = {
    type: types.REGISTRATION_REQUEST
    params: RegistrationParams
}

export type LogoutAction = {
    type: types.LOG_OUT_REQUEST
}

export function authenticationRequest(params: AuthenticationParams) : AuthenticationAction {
    return { type: types.AUTHENTICATION_REQUEST,  params};
}

export function logoutRequest() : LogoutAction {
    return { type: types.LOG_OUT_REQUEST };
}

export function registrationRequest(params: RegistrationParams): RegistrationAction {
    return { type: types.REGISTRATION_REQUEST, params};
}
