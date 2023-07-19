import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Button, FlatList } from 'react-native';
import { getUsersById } from '../../api/user';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';

/**
 * Component to check if friends have visited a specific place.
 *
 * @param {{visitorsId: Array<string>, navigation: Object}} props - The properties passed to this component.
 * @returns {JSX.Element} - A JSX element that displays the number of friends who have visited a place.
 */
const FriendVisit = ({ visitorsId, navigation }: { visitorsId: array, navigation: Object }): JSX.Element => {
    const [visitors, setVisitors] = useState([]); 
    const [modalVisible, setModalVisible] = useState(false);
    const defaultPicture = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

    const fetchVisitors = async () => {
        if(visitorsId?.length > 0) {
            const userInfos = await getUsersById(visitorsId);
            setVisitors(userInfos); 
            return;
        }
        return; 
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const goToUserPage = (userId) => {
        closeModal();
        navigation.navigate('FriendScreen', { User: userId });
    }


    const handleOpenModal = () => {
        setModalVisible(true);
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
            <View style={styles.imagesContainer}>
                {visitors.slice(0, 3).map((visitor, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.imageTouch} 
                        onPress={handleOpenModal}
                    >
                        <Image 
                        style={styles.image}
                            source={{ uri: visitor.Profile_picture ? visitor.Profile_picture : defaultPicture }} 
                        />
                    </TouchableOpacity>
                ))}
                {visitors.length > 3 && (
                    <View style={styles.moreVisitorsView}>
                        <Text style={styles.moreVisitorsText}>+{visitors.length - 3}</Text>
                    </View>
                )}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableOpacity style={styles.centeredView} activeOpacity={1} onPress={closeModal}>
                    <View style={styles.modalView}>
                        <FlatList
                            data={visitors}
                            keyExtractor={item => item.userId}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => goToUserPage(item.userId)}>
                                    <View style={styles.userRow}>
                                        <Image style={styles.userImage} source={{ uri: item.Profile_picture ? item.Profile_picture : defaultPicture }} />
                                        <Text style={styles.userName}>{item.Username}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
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
    imagesContainer: {
        flexDirection: 'row',
        marginLeft:10
    },
    imageTouch: {
        marginLeft: -10,
    },
    image: {
            width: 30,
            height: 30,
            borderRadius: 15,
    },
    moreVisitorsView: {
        backgroundColor: 'gray',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -10
    },
    moreVisitorsText: {
        color: 'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
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
