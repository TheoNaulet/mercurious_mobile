import React from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList,TouchableOpacity } from 'react-native';

const FlagItem = ({ country, onSelect, isSelected }) => (
    <TouchableOpacity onPress={() => onSelect(country)}>
        <View style={[styles.flagItem, isSelected ? styles.selectedFlag : null]}>
            <ImageBackground
                source={{ uri: country.flag }}
                style={styles.flagBackground}
                imageStyle={{ borderRadius: 50 }}
            >
                <View style={styles.overlay}>
                    <Text style={styles.countryName}>{country.countryName}</Text>
                </View>
            </ImageBackground>
        </View>
    </TouchableOpacity>
);

const FlagList = ({ countryList, onSelectCountry, selectedCountry }) => (
    <FlatList
        data={countryList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
            <FlagItem country={item} onSelect={onSelectCountry} isSelected={selectedCountry?._id === item._id}/>
        )}
        horizontal={true}
        contentContainerStyle={styles.flagList}
        showsHorizontalScrollIndicator={false}
    />
);


const styles = StyleSheet.create({
    flagList: {
        paddingHorizontal: 20,
    },
    flagItem: {
        marginHorizontal: 10,
    },
    flagBackground: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: '100%',
        height: '100%',
    },
    countryName: {
        color: 'white',
        fontWeight: 'bold',
    },
    selectedFlag: {
        borderColor: '#BB2649',
        borderWidth: 3,
        borderRadius: 53,
    },
});

export default FlagList;
