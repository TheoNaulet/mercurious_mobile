import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

const CitySelectionCard = ({ Name, CardImage, onSelectCity }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handlePress = () => {
        onSelectCity(Name);
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            {imageLoaded ? null : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#BB2649" />
                </View>
            )}
            <Image style={styles.cardImage} source={{ uri: CardImage }} onLoadStart={() => setImageLoaded(false)} onLoadEnd={() => setImageLoaded(true)}/>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{Name}</Text>
            </View>
        </TouchableOpacity>
    );
    };

    const styles = StyleSheet.create({
    container: {
        margin: 10,
        width: 200,
        height: 200,
        position: 'relative',
    },
    cardImage: {
        width: 200,
        height: 200,
        borderRadius: 20,
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 10,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
});

export default CitySelectionCard;
