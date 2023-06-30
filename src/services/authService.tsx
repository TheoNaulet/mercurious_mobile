import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { createNewUser } from '../api/user';

export const signInUser = async (email: string, password: string) => {
    const auth = FIREBASE_AUTH;
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw error;
    }
};

export const signUpUser = async (email: string, password: string) => {
    const auth = FIREBASE_AUTH;
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const result = JSON.parse(JSON.stringify(response));
        const uid = result.user.uid;
        const userEmail = result.user.email;
        const username = result.user.displayName;

        const creation = await createNewUser(uid, userEmail, username, null);

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
