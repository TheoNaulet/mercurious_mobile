import React from 'react';
import { TouchableOpacity, Modal, View, Text, Image, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native';

const VisitorModal = ({modalVisible, closeModal, visitors, goToUserPage, type}) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
    >
        <TouchableOpacity style={styles.centeredView} activeOpacity={1}>
            <View style={styles.modalView}>
                <View style={styles.modalTitle}>
                    <TouchableOpacity onPress={closeModal} style={styles.iconContainer}>
                        <Icon type='font-awesome' name="arrow-left" />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Amis ayant visité {type === 'ville' ? 'cette' : 'ce'} {type}</Text>
                    </View>
                </View>
                <FlatList
                    style={styles.flatlist}
                    data={visitors}
                    keyExtractor={item => item.userId}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.userRow} onPress={() => goToUserPage(item.userId)}>
                            <Image style={styles.userImage} source={{ uri: item.Profile_picture }} />
                            <Text style={styles.userName}>{item.Username}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </TouchableOpacity>
    </Modal>
);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent:"space-between",
        alignItems: 'center',
        width:"100%", 
    },
    modalView: {
        height:'100%',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop:50,
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
    titleContainer:{
        width:'80%',
    },
    modalTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"space-evenly",
        padding: 10,
        width:"100%",
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,
    },
    flatlist:{
        width:"100%", 
    }, 
    iconContainer: {
        marginRight: 20,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userRow: {
        padding:20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#D3D3D3',
        borderBottomWidth: 1,

    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    userName: {
        fontSize: 16, 
    }
});


export default VisitorModal;
