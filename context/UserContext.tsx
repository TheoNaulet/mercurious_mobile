import React, { createContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { getFollowDetails, getUsername } from '../src/api/user';

export const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState('')
	const [followings, setFollowings] = useState([]); 
	const [followers, setFollowers] = useState([]); 
	const [usernameContext, setUsernameContext] = useState('');

	const auth = FIREBASE_AUTH; 
	const uid = auth?.currentUser?.uid; 

    useEffect(()=>{
        if (!uid)
            return

		setUser(uid);
		getUsername(uid).then((response)=>{
			setUsernameContext(response); 
		});

		getFollowDetails(uid).then((response)=>{
			const responseFollowers = JSON.parse(JSON.stringify(response.Followers));
			const responseFollowings = JSON.parse(JSON.stringify(response.Followings));

			setFollowers(responseFollowers);
			setFollowings(responseFollowings); 
		});
    },[uid])

	return (
	<UserContext.Provider value={{user, followers,  followings, usernameContext }}> 
		{children}
	</UserContext.Provider>
	);
};
