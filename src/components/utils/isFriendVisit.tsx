import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button, FlatList } from 'react-native';
import { getUsersById } from '../../api/user';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Visitors from './Visitors';

/**
 * Component to check if friends have visited a specific place.
 *
 * @param {{visitorsId: Array<string>, navigation: Object}} props - The properties passed to this component.
 * @returns {JSX.Element} - A JSX element that displays the number of friends who have visited a place.
 */
const FriendVisit = ({ visitorsId, navigation }: { visitorsId: Array<string>, navigation: Object }): JSX.Element => {
    const [visitors, setVisitors] = useState([]); 

    const fetchVisitors = async () => {
        if(visitorsId?.length > 0) {
            const userInfos = await getUsersById(visitorsId);
            setVisitors(userInfos); 
            return;
        }
        return; 
    }

    useEffect(()=>{
        if(!visitorsId) return; 

        fetchVisitors();
    },[visitorsId])
    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {visitorsId?.length === 0
                ? "Aucun ami a visité ce lieu"
                : visitorsId?.length === 1
                ? "1 ami a visité ce lieu"
                : `${visitorsId?.length} amis ont visité ce lieu`}
            </Text>
            {
                visitorsId?.length > 0 ? <Visitors visitors={visitors} navigation={navigation} type='lieu' /> : <></>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginRight: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    iconContainer: {
        marginRight: 10,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalView: {
        height:'100%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 50,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    userRow: {
        paddingTop:20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    userName: {
        fontSize: 16
    }
});

export default FriendVisit;
