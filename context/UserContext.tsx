import React, { createContext, useState, useEffect } from 'react';
import { User, getAuth, signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { getUserContext } from '../src/api/user';

interface UserContextType {
	user: string;
	followers: any[]; 
	followings: any[]; 
	usernameContext: string;
	profilePicture: string;
	setUpdate: React.Dispatch<React.SetStateAction<number>>;
	signout: () => Promise<void>;
}

interface UserProviderProps {
	children: React.ReactNode;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: UserProviderProps) => {
	const [user, setUser] = useState('')
	const [followings, setFollowings] = useState([]); 
	const [followers, setFollowers] = useState([]); 
	const [usernameContext, setUsernameContext] = useState('');
	const [profilePicture, setProfilePicture] = useState('');
	const [update, setUpdate] = useState(0); 

	const auth = FIREBASE_AUTH; 
	const uid = auth?.currentUser?.uid; 

	const signout = async () => {
		try {
			const auth = getAuth();
			await signOut(auth);
			console.log('User signed out!');
			setUser('');
			setFollowings([])
			setFollowers([])
			setUsernameContext('')
			setProfilePicture('')
		} catch (error) {
			console.log(error);
		}
	};

    useEffect(()=>{
        if (!uid)
            return

		getUserContext(uid).then((response)=>{
			setUser(uid);
			setUsernameContext(response.username); 
			setFollowings(response.followDetails.followings)
			setFollowers(response.followDetails.followers)
			setProfilePicture(response.profilePictureUrl)
		})

    },[uid, update])

	return (
	<UserContext.Provider value={{user, followers,  followings, usernameContext, profilePicture, setUpdate, signout }}> 
		{children}
	</UserContext.Provider>
	);
};
