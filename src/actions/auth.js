import { firebase, googleAuthProvider } from '../firebase/firebase';

//* create the authProvider, and pass it into a function. this starts the login process
export const startLogin = () => {
    // return a function from a function because of redux thunk specs
    return () => {
        // call a firebase method
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const startLogout = () => {
    return () => {
        // call a firebase method, using 'return' to continue the promise chain
        return firebase.auth().signOut();
    };
};

export const login = uid => ({
    type: 'LOGIN',
    uid,
});

export const logout = () => ({
    type: 'LOGOUT',
});
