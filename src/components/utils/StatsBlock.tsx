import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { fetchUserProfiles } from '../../api/user';

interface StatsBlockProps {
    followers: Array<any>;
    followings: Array<any>;
}

const StatsBlock: React.FC<StatsBlockProps> = ({ followers, followings, navigation, countries}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState({ title: '', data: [] });
    const [activeTab, setActiveTab] = useState('');

    const [followersInfos, setFollowersInfos] = useState([]);
    const [followingsInfos, setFollowingsInfos] = useState([]);

    useEffect(() => {
        fetchUserProfiles(followers, followings)
            .then(data => {
                setFollowersInfos(data?.followerProfiles);
                setFollowingsInfos(data?.followingProfiles);
            })
            .catch(error => console.error(error));
    }, [followers, followings]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const handleOpenModal = (title: string, data: Array<any>) => {
        setModalData({ title, data });
        setActiveTab(title);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.statsContainer}>
            <View style={styles.statsBlock}>
                <Text style={styles.statsNumber}>{countries}</Text>
                <Text style={styles.statsLabel}>Pays</Text>
            </View>
            <TouchableOpacity style={styles.statsBlock} onPress={() => handleOpenModal('Followers', followers)}>
                <Text style={styles.statsNumber}>{followers?.length}</Text>
                <Text style={styles.statsLabel}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statsBlock} onPress={() => handleOpenModal('Following', followings)}>
                <Text style={styles.statsNumber}>{followings?.length}</Text>
                <Text style={styles.statsLabel}>Suivi(e)s</Text>
            </TouchableOpacity>
            {
                modalVisible && (
                <Modal animationType="slide" transparent={true} visible={modalData.data.length > 0} onRequestClose={handleCloseModal}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalHeader}>
                                <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                                    <Icon type='font-awesome'  name='arrow-left' />
                                </TouchableOpacity>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={[styles.buttonSelect, activeTab === 'Followers' && styles.activeTabIndicator]} onPress={() => handleTabChange('Followers')}>
                                        <Text>{'Followers'}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={[styles.buttonSelect, activeTab === 'Following' && styles.activeTabIndicator]} onPress={() => handleTabChange('Following')}>
                                        <Text>{'Following'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {activeTab === 'Followers' && (
                                followersInfos.length === 0 ? 
                                <Text style={styles.message}>Aucun followers</Text> :
                                followersInfos.map((user, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.searchItem}
                                            onPress={() => {
                                                navigation.navigate('FriendScreen', { User: user.userId })
                                                handleCloseModal();
                                            }}
                                        >
                                            <Image style={styles.itemImage} source={{ uri: user.profilePictureUrl }} />
                                            <Text style={styles.searchItemText}>{user.Username}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            )}
                            {activeTab === 'Following' && (
                                followingsInfos.length === 0 ?
                                <Text style={styles.message}>Aucun followings</Text> :
                                followingsInfos.map((user, index) => {
                                    return (
                                        <TouchableOpacity
                                        key={index}
                                        style={styles.searchItem}
                                        onPress={() => {
                                            navigation.navigate('FriendScreen', { User: user.userId });
                                            handleCloseModal();
                                        }}
                                    >
                                        <Image style={styles.itemImage} source={{ uri: user.profilePictureUrl }} />
                                        <Text style={styles.searchItemText}>{user.Username}</Text>
                                    </TouchableOpacity>
                                    )
                                })
                            )}

                        </View>
                    </View>
                </Modal>
                )
            }
        </View>
    );
}


const styles = StyleSheet.create({
    statsContainer:{
        flexDirection:"row",
    },
    statsBlock: {
        alignItems: 'center',
        margin:10,

    },
    statsNumber: {
        fontSize: 16,
        fontWeight: '600',
    },
    statsLabel: {
        fontSize: 14,
        color: 'grey',
    },

    //modal 
    modalHeader:{
        flexDirection:'row',
        width:"100%",
        borderBottomWidth: 1,
        borderBottomColor:"#D3D3D3"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        height:'100%',
        width:'100%',
        paddingTop:50,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    closeButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    message:{
        marginTop:20,
        fontSize:20,
    },
    buttonSelect:{
        flex: 1, 
        height: '100%', 
        justifyContent: 'center',
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 20,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        alignContent:'flex-end',
        alignSelf:"center",
        height:20,
    },
    activeTabIndicator: {
        borderBottomWidth: 1,
        borderBottomColor: "#D3D3D3",
    },
    searchItem:{
        flexDirection:"row",
        padding:10,
        paddingHorizontal:20,
        alignContent:'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        width: '100%',
    },
    searchItemText:{
        fontSize:18,
        fontWeight:'bold',
        alignSelf:"center",
        marginLeft:10
    },
    itemImage:{
        height:50,
        width:50,
        borderRadius:100,
    }
});

export default StatsBlock;
