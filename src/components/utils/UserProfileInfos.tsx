import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Icon } from 'react-native-elements';
import { handleImageSelection } from '../../utils/imagePickerHelper';
import { uploadImage } from '../../api/upload';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { UserContext } from '../../context/UserContext';

const EditProfileModal: React.FC<EditProfileModalProps> = ({ visible, onClose }) => {
    const auth = FIREBASE_AUTH; 
    const uid = auth?.currentUser?.uid; 

    const onImageSelected = async (uri) => {
        try {
            await uploadImage(uid, { uri: uri });
        } catch (error) {
            console.error("Failed to upload image", error);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.modalOption} onPress={() => handleImageSelection(onImageSelected)}>
                        <View style={styles.iconContainer}>
                            <Icon type='font-awesome' name="image" size={20} color="black" />
                        </View>
                        <Text style={styles.modalText}>Changer de photo de profil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOption} onPress={() => {}}>
                        <View style={styles.iconContainer}>
                            <Icon type='font-awesome' name="user" size={20} color="black" />
                        </View>
                        <Text style={styles.modalText}>Changer Username</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};


interface UserProfileInfoProps {
    username: string;
    picture?: string;
    numberCountries: number;
    followings: string[];
    followers: string[];
}

/**
 * UserProfileInfo component displays user's profile information including
 * profile picture, username, and number of countries visited with a circular progress bar.
 *
 * @param {UserProfileInfoProps} props The properties for the UserProfileInfo component.
 * @returns {JSX.Element} Returns a JSX element representing user's profile information.
 */
const UserProfileInfo= ({ username, picture, numberCountries, followings, followers }: UserProfileInfoProps): JSX.Element => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.profileInfos}>
            <View style={styles.topContainer}>
                <View style={styles.leftProfileInfo}>
                    <Image
                        style={styles.profilePicture}
                        source={picture && { uri: picture }}
                    />
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBlock}>
                        <Text style={styles.statsNumber}>{numberCountries}</Text>
                        <Text style={styles.statsLabel}>Pays</Text>
                    </View>
            
                    <View style={styles.statsBlock}>
                        <Text style={styles.statsNumber}>{followers?.length}</Text>
                        <Text style={styles.statsLabel}>Followers</Text>
                    </View>
            
                    <View style={styles.statsBlock}>
                        <Text style={styles.statsNumber}>{followings?.length}</Text>
                        <Text style={styles.statsLabel}>Suivi</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.accountName}>{username && `@${username}`}</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                    <Icon type='font-awesome' name="pencil" size={20} color="white" />
                    <Text style={styles.editButtonText}>Modifier le profil</Text>
                </TouchableOpacity>
                <EditProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profileInfos: {
        margin: 10,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftProfileInfo: {
        flex: 1,
        alignItems:'flex-start',
    },
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    statsContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statsBlock: {
        alignItems: 'center',
    },
    statsNumber: {
        fontSize: 16,
        fontWeight: '600',
    },
    statsLabel: {
        fontSize: 14,
        color: 'grey',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    editButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#BB2649',
    },
    editButtonText: {
        marginLeft: 5,
        fontSize: 14,
        color: 'white',
    },
    accountName: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    //modal styles

    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
    iconContainer: {
        backgroundColor: '#f2f2f2',
        borderRadius: 25, // pour un cercle parfait, il doit être la moitié de la largeur et de la hauteur
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    modalText: {
        fontSize: 16,
    },
});

export default UserProfileInfo;
