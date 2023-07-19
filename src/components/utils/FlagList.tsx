import React from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList,TouchableOpacity } from 'react-native';

interface Country {
    flag: string;
    countryName: string;
    _id: string;
}

interface FlagItemProps {
    country: Country;
    onSelect: (country: Country) => void;
    isSelected: boolean;
}

interface FlagListProps {
    countryList: Country[];
    onSelectCountry: (country: Country) => void;
    selectedCountry: Country | null;
}

/**
 * FlagItem component that renders a single flag item.
 *
 * @param {FlagItemProps} props - The properties for FlagItem component.
 * @returns {JSX.Element} Returns the FlagItem component.
 */
const FlagItem: React.FC<FlagItemProps> = ({ country, onSelect, isSelected }: FlagItemProps): JSX.Element => {
    return (
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
)};

/**
 * FlagList component that renders a horizontal list of FlagItems.
 *
 * @param {FlagListProps} props - The properties for FlagList component.
 * @returns {JSX.Element} Returns the FlagList component.
 */
const FlagList: React.FC<FlagListProps> = ({ countryList, onSelectCountry, selectedCountry }: FlagListProps): JSX.Element => {
    return(
        <FlatList
            data={countryList}
            renderItem={({ item }) => (
                <FlagItem key={item.id} country={item} onSelect={onSelectCountry} isSelected={selectedCountry?.id === item.id}/>
                
            )}
            horizontal={true}
            contentContainerStyle={styles.flagList}
            showsHorizontalScrollIndicator={false}
    />)
};


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
