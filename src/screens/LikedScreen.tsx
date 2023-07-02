import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { getLikedCountries } from '../api/country';


const LikedScreen = ({navigation}) => {
  const auth = FIREBASE_AUTH; 
  const uid = auth?.currentUser?.uid; 
  const isFocused = useIsFocused();

  const [countryList, setCountryList] = useState();
	
	const handleFetchPlaces = async () => {
    try {
      const response = await getLikedCountries(uid);
      const result = response?.[0]?.Liked_countries || [];
      setCountryList(result);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (isFocused && uid) {
      handleFetchPlaces();
    }
  }, [isFocused, uid]);

  
  const handleButtonPress = (countryName: any) => {
    navigation.navigate('LikedCity', { countryName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pays que vous avez aimés</Text>
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        {countryList?.map((val: { countryName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; image: any; }, index: React.Key | null | undefined) => (
          <TouchableOpacity onPress={() => handleButtonPress(val.countryName)} key={index} style={styles.button}>
            <Image source={{ uri: val.image }} style={styles.buttonBackground} />
            <Text style={styles.buttonText}>{val.countryName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight:"bold",
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  button: {
    width: '48%',
    aspectRatio: 1, 
    borderRadius: 10,
    overflow: 'hidden',
    margin:3,
  },
  buttonBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LikedScreen;