import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { UserContext } from '../../../context/UserContext';
import { useContext } from 'react';
import { isVisited } from '../../api/places';

/**
 * Component to check if friends have visited a specific place.
 *
 * @param {{placeId: string}} props - The properties passed to this component.
 * @returns {JSX.Element} - A JSX element that displays the number of friends who have visited a place.
 */
const IsFriendVisit = ({ placeId }: { placeId: string; }): JSX.Element => {
    const { followings } = useContext(UserContext);
    const [visitedUsers, setVisitedUsers] = useState([]);

    /**
     * Check if friends have visited a specific place and updates the state.
     */
    const checkVisited = async () => {
        const newVisitedUsers:any = [];
        for (let following of followings) {
            const visited = await isVisited(placeId, following);
            if (visited) {
                newVisitedUsers.push(following);
            }
        }
        setVisitedUsers(newVisitedUsers);
;    };

    useEffect(() => {
        if (!placeId || !followings) return;

        checkVisited();
    }, [followings, placeId]);

    return (
        <View>
            <Text>
            {visitedUsers.length === 0
                ? "Aucun ami a visité ce lieu"
                : visitedUsers.length === 1
                ? "1 ami a visité ce lieu"
                : `${visitedUsers.length} amis ont visité ce lieu`}
            </Text>
        </View>
    );
};

export default IsFriendVisit;

