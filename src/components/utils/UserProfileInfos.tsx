import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const UserProfileInfo = ({ username, picture, numberCountries }) => {
    const defaultPicture = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
    const percentage = Math.ceil((numberCountries * 100) / 73);

    return (
        <View style={styles.profileInfos}>
            <View style={styles.leftProfileInfo}>
                <Image
                    style={styles.profilePicture}
                    source={picture ? { uri: picture } : { uri: defaultPicture }}
                />
                <Text style={styles.accountName}>{username && `@${username}`}</Text>
            </View>
            <View style={styles.rightProfileInfo}>
                <AnimatedCircularProgress
                    size={100}
                    width={10}
                    fill={percentage}
                    tintColor="#BB2649"
                    backgroundColor="#D3D3D3"
                >
                    {(fill) => <Text>{fill}%</Text>}
                </AnimatedCircularProgress>
                <Text>{numberCountries} pays visités</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profileInfos: {
        margin: 10,
        flexDirection: 'row',
        padding: 20,
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
    leftProfileInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightProfileInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    accountName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UserProfileInfo;
