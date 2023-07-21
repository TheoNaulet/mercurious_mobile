import React, { createContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { getFollowDetails, getProfilePicture, getUsername } from '../src/api/user';

export const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState('')
	const [followings, setFollowings] = useState([]); 
	const [followers, setFollowers] = useState([]); 
	const [usernameContext, setUsernameContext] = useState('');
	const [profilePicture, setProfilePicture] = useState(); 

	const auth = FIREBASE_AUTH; 
	const uid = auth?.currentUser?.uid; 

    useEffect(()=>{
        if (!uid)
            return

		getProfilePicture(uid).then((response) =>{
			if(!response){
				setProfilePicture("https://cdn-icons-png.flaticon.com/512/847/847969.png");
			} else {
				setProfilePicture(response?.url);
			}
		})

		setUser(uid);
		getUsername(uid).then((response)=>{
			const data = JSON.parse(JSON.stringify(response)); 
			setUsernameContext(data); 
		});

		getFollowDetails(uid).then((response)=>{
			if(response) {
				const responseFollowers = JSON.parse(JSON.stringify(response.Followers));
				const responseFollowings = JSON.parse(JSON.stringify(response.Followings));
		
				setFollowers(responseFollowers);
				setFollowings(responseFollowings); 
			} else {
				setFollowers([]);
				setFollowings([]); 
			}
		});
    },[uid])

	return (
	<UserContext.Provider value={{user, followers,  followings, usernameContext, profilePicture }}> 
		{children}
	</UserContext.Provider>
	);
};
