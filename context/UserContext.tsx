import React, { createContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { getFollowers, getFollowings } from '../src/api/user';

export const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState('')
	const [followings, setFollowings] = useState(); 
	const [followers, setFollowers] = useState(); 

	const auth = FIREBASE_AUTH; 
	const uid = auth?.currentUser?.uid; 

    useEffect(()=>{
        if (!uid)
            return

		setUser(uid);

        getFollowings(uid).then((response) => {
            setFollowings(response[0].Followings);
        });


        getFollowers(uid).then((response) => {
            setFollowers(response[0].Followers);
        }) 
    },[uid])

	return (
	<UserContext.Provider value={{user, followers, followings}}>
		{children}
	</UserContext.Provider>
	);
};
