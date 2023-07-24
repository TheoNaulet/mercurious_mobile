import React, { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { follow, getFollowDetails, unfollow } from '../../api/user';
import { UserContext } from '../../../context/UserContext';

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
    const followings = useContext(UserContext); 

    useEffect(() => {
        if(!followerId || !followedId) return;

        if (followings && followings?.followings?.includes(followedId)) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    }, [followerId, followedId, followings])

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
