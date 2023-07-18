import React from 'react';
import { View, Text } from 'react-native';

/**
 * Component to check if friends have visited a specific place.
 *
 * @param {{visitorsId: Array<string>}} props - The properties passed to this component.
 * @returns {JSX.Element} - A JSX element that displays the number of friends who have visited a place.
 */
const FriendVisit = ({ visitorsId }: { visitorsId: Array<string>; }): JSX.Element => {
    return (
        <View>
            <Text>
            {visitorsId?.length === 0
                ? "Aucun ami a visité ce lieu"
                : visitorsId?.length === 1
                ? "1 ami a visité ce lieu"
                : `${visitorsId?.length} amis ont visité ce lieu`}
            </Text>
        </View>
    );
};

export default FriendVisit;
