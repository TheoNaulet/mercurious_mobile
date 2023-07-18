import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import React, { useEffect, useState } from 'react';
import { getLikedCitiesByCountry } from '../api/city';
import CitySelectionCard from '../components/cards/SelectCard';
import { getLikedPlacesByCity } from '../api/places';
import CardFeed from '../components/cards/CardFeed';

const LikedCityScreen = () => {
    const [cityList, setCityList] = useState();
    const [city, setCity] = useState('');
    const [placeList, setPlaceList] = useState(); 

    const auth = FIREBASE_AUTH; 
    const uid = auth?.currentUser?.uid; 
    const navigation = useNavigation();
    const route = useRoute();
    const countryName = route.params?.countryName;

    const fetchLikedCities = async () => {
        const response = await getLikedCitiesByCountry(uid, countryName);
        const result = response[0].Liked_cities;
        setCityList(result);
    }

    const fetchLikedPlaces = async () => {
        const response = await getLikedPlacesByCity(uid, city); 
        setPlaceList(response[0].Liked_monuments);
    }

    useEffect(()=>{
        if(!uid || !countryName)
            return;

        fetchLikedCities();
    },[uid, countryName]);

    useEffect(()=>{
        if(!city)
            return;

        fetchLikedPlaces();
    },[city]);

    

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" type="font-awesome" size={25} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.titleText}>{countryName}</Text>
            <ScrollView horizontal contentContainerStyle={styles.buttonContainer} showsHorizontalScrollIndicator={false}>
                {cityList?.map((val, index) => (
                    <CitySelectionCard key={index} Name={val.Name} CardImage={val.Image} onSelectCity={() => setCity(val.Name)} />
                ))}
            </ScrollView>
            <Text style={styles.cityText}>{city}</Text>
            <View style={styles.placesContainer}>
                {placeList?.map((val, key) => (
                    <View key={key} style={styles.cardContainer}>
                        <CardFeed navigation={navigation} id={val.id}/>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};
    
    const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
    },
    buttonContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    placesContainer: {
        flexDirection: 'column',
        paddingHorizontal: 8,
    },
    cardContainer: {
        marginBottom: 10,
    },
    cityText:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:20
    }
});

export default LikedCityScreen;