import {
    GoogleAuthProvider,
    GithubAuthProvider,
    setPersistence,
    browserSessionPersistence,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { firebaseAuth } from './firebaseConfig';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Sign in with Google functionality
export const signInWithGoogle = async () => {
    try {
        return setPersistence(firebaseAuth, browserSessionPersistence).then(async () => {
            const result = await signInWithPopup(firebaseAuth, googleProvider);
            const user = result.user;
            const [firstName, lastName] = user.displayName ? user.displayName.split(" ") : ["", ""];
            const firebaseUserData = {
                name: user.displayName,
                firstName,
                lastName,
                email: user.email,
                image: user.photoURL || "",
            
            };
            return {
                success: true,
                user: firebaseUserData,
                error: null,
            };
        });
    } catch (error: any) {
        return {
            success: false,
            user: null,
            error: error.message,
        };
    }
};

// Sign in with GitHub functionality
export const signInWithGithub = async () => {
    try {
        return setPersistence(firebaseAuth, browserSessionPersistence).then(async () => {
            const result = await signInWithPopup(firebaseAuth, githubProvider);
            return {
                success: true,
                user: result.user,
                error: null,
            };
        });
    } catch (error: any) {
        return {
            success: false,
            user: null,
            error: error.message,
        };
    }
};



// Sign out functionality
export const firebaseSignOut = async () => {
    try {
        await signOut(firebaseAuth);
        return { success: true };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        };
    }
};

// Auth state observer
export const onAuthStateChanged = (callback: (user: any) => void) => {
    return firebaseAuth.onAuthStateChanged(callback);
};