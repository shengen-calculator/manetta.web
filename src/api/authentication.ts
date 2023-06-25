import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from "firebase/auth";
import {auth} from './database';

class AuthenticationApi {
    static logIn(params: AuthenticationParams) {
        return signInWithEmailAndPassword(auth, params.email, params.password);
    }

    static getTokenResult() {
        if(!auth.currentUser) {
            throw new Error("Current user is not authorized");
        }
        return auth.currentUser.getIdTokenResult();
    }

    static register(params: RegistrationParams) {
        return createUserWithEmailAndPassword(auth, params.email, params.password);
    }

    static logOut() {
        return auth.signOut();
    }
}

export default AuthenticationApi;
