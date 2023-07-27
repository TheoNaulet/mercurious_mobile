import React, { useState } from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import VisitorModal from '../modals/VisitorsModal';

const Visitors = ({ visitors, navigation, type }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const goToUserPage = (userId) => {
        closeModal();
        navigation.navigate('FriendScreen', { User: userId });
    }

    return (
        <View>
            <TouchableOpacity style={styles.imagesContainer} onPress={handleOpenModal}>
                {visitors.slice(0, 3).map((visitor, index) => (
                <View 
                    key={index} 
                    style={styles.imageTouch} 
                >
                    <Image 
                    style={styles.image}
                    source={{ uri: visitor.Profile_picture}} 
                    />
                </View>
                ))}
                {visitors.length > 3 && (
                    <View style={styles.moreVisitorsView}>
                        <Text style={styles.moreVisitorsText}>+{visitors.length - 3}</Text>
                    </View>
                )}
            </TouchableOpacity>
            <VisitorModal
                modalVisible={modalVisible}
                closeModal={closeModal}
                visitors={visitors}
                goToUserPage={goToUserPage}
                type={type}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    imagesContainer: {
        flexDirection: 'row',
        marginLeft: 10,
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
});

export default Visitors;
