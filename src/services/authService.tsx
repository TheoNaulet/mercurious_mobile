import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, getAuth, signOut } from 'firebase/auth';
import { createNewUser } from '../api/user';

/**
 * Sign in user using email and password through Firebase authentication.
 * 
 * @async
 * @param {string} email - The email address.
 * @param {string} password - The password.
 * @throws Will throw an error if login fails.
 */
export const signInUser = async (email: string, password: string): Promise<void> => {
    const auth = FIREBASE_AUTH;
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw error;
    }
};

/**
 * Sign up user using email and password through Firebase authentication.
 * 
 * @async
 * @param {string} email - The email address.
 * @param {string} password - The password.
 * @throws Will throw an error if registration fails.
 */
export const signUpUser = async (email: string, password: string): Promise<void> => {
    const auth = FIREBASE_AUTH;
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const result = JSON.parse(JSON.stringify(response));
        const uid = result.user.uid;
        const userEmail = result.user.email;
        const username = result.user.displayName;
        const picture = "folderName/e7a685bd6e032e057226bf0e0d2a30e4"

        const creation = await createNewUser(uid, userEmail, username, picture);

        if (creation) {
            const user = auth.currentUser;
            if (user) {
                await updateProfile(user, {
                    displayName: creation.Username,
                });
            }
        }
    } catch (error) {
        throw error;
    }
};

export const signOutUser = async () => {
    const auth = getAuth();
    try {
        await signOut(auth);
        console.log('User signed out!');
    } catch (error) {
        console.log(error);
    }
};
