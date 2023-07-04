import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { getPlacesByCity } from '../api/places';
import CardFeed from '../components/cards/CardFeed';

const CityScreen = ({ route, navigation }) => {
  const { city } = route.params;
  const [placeList, setPlaceList] = useState([]); 
  const [error, setError] = useState(); 
  const nav = useNavigation();

  const fetchPlaces = async () => {
    try {
      const data = await getPlacesByCity(city);
      setPlaceList(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(()=>{
    if (!city)
      return; 

    fetchPlaces(); 
  }, [city])

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => nav.goBack()}>
          <Icon name="arrow-left" type="font-awesome" size={25} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, nav]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
        {error && <Text style={styles.errorText}>Erreur: {error}</Text>}
        {placeList && (
          <View style={styles.placesContainer}>
            {placeList.map((place, index) => (
              <CardFeed navigation={navigation} key={index} id={place._id} name={place.Name} picture={place.Image} city={place.City} country={place.Country} note={place.Rate} extraImage={place.ExtraImage} visitors={0}/>
              ))}
          </View>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
  },
  cityName: {
    alignSelf:"center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  placesContainer: {
    marginTop: 20,
    width:"96%",
  },
});



export default CityScreen;
