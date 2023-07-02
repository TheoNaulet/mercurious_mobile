import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { follow, getFollowers, unfollow } from '../../api/user';

interface FollowButtonProps {
    followerId: string;
    followedId: string;
}

/**
 * FollowButton component
 * Provides a button that allows a user to follow or unfollow another user
 * @param {FollowButtonProps} props - The props for the FollowButton component
 */
const FollowButton: React.FC<FollowButtonProps> = ({ followerId, followedId }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    const handleFetchFollowers = async () => {
        const response = await getFollowers(followedId);

        if (response && response[0] && response[0].Followers) {
            setIsFollowing(response[0].Followers.includes(followerId));
        } else {
            setIsFollowing(false);
        }
    };

    useEffect(()=>{
        if(!followerId || followedId) return;

        handleFetchFollowers(); 
    },[followerId, followedId])

    const handleFollow = async () => {
        await follow(followerId, followedId);
        setIsFollowing(true);
    };

    const handleUnfollow = async () => {
        await unfollow(followerId, followedId);
        setIsFollowing(false);
    };

    return (
        <View>
        {isFollowing ? (
                <TouchableOpacity style={[styles.button, isFollowing ? styles.following : styles.notFollowing]} onPress={handleUnfollow}>
                    <Text style={styles.buttonText}>Se désabonner</Text>
                </TouchableOpacity>
            ) : (
                    <TouchableOpacity style={[styles.button, isFollowing ? styles.following : styles.notFollowing]} onPress={handleFollow}>
                        <Text style={styles.buttonText}>S'abonner</Text>
                    </TouchableOpacity>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        margin: 10,
    },
    notFollowing: {
        backgroundColor: '#3498db',
    },
    following: {
        backgroundColor: '#2ecc71',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default FollowButton;
