import React, { useEffect, useState, useRef, useContext, useLayoutEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { getVisitedCountries } from '../api/country';
import { getVisitedPlaces } from '../api/places';
import { getVisitedCitiesByCountry } from '../api/city';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import FlagList from '../components/utils/FlagList';
import CitySelectionCard from '../components/cards/SelectCard';
import CardFeed from '../components/cards/CardFeed';
import UserProfileInfo from '../components/utils/UserProfileInfos';
import { useIsFocused } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
// ProfileSection.js
import { signOutUser } from '../services/authService';
import { Ionicons } from '@expo/vector-icons';


const ProfileSection = ({navigation}) => {
  const auth = FIREBASE_AUTH; 
  const uid = auth?.currentUser?.uid; 
  const isFocused = useIsFocused();
  const { usernameContext } = useContext(UserContext);

  const picture = undefined;

  const scrollViewRef = useRef(); 
	const [username, setUsername] = useState();
	const [countryList, setCountryList] = useState();
	const [cityList, setCityList] = useState(); 
	const [placeList, setPlaceList] = useState(); 
	const [numberCountries, setNumberCountries] = useState(Number);
	const [currentCountry, setCurrentCountry] = useState(""); 
	const [currentCity, setCurrentCity] = useState();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={signOutUser} style={{marginRight: 15}}>
          <Ionicons name="log-out-outline" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

	const handleFetchCountries = () => {
		getVisitedCountries(uid).then((response) => {
			if(response[0]?.length === 0){
				setCountryList(undefined);
			} else {
				setCountryList(response);
			}
		});
	};

  const handleSelectCountry = (country: React.SetStateAction<string>) => {
    setCurrentCountry(country);
  };

	const handleSelectCity = (value: React.SetStateAction<undefined>) =>{
		setCurrentCity(value); 
	}

  useEffect(() => {
    if (isFocused) {
      handleFetchCountries();
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [isFocused]); 

	useEffect(() => {
		setUsername(usernameContext);
	}, [uid]);
  
  useEffect(()=>{
    if(!countryList) return;

    setNumberCountries(countryList?.length)
  },[countryList])

	useEffect(() => {
		if(!currentCountry)
			return; 

		getVisitedCitiesByCountry(uid, currentCountry.countryName).then((response) =>{
			setCityList(response); 
		})
	}, [currentCountry]);


	useEffect(() => {
		if(!currentCity)
		return; 

		getVisitedPlaces(uid, currentCity).then((response)=>{
			setPlaceList(response);
		})
	}, [currentCity]);

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Mon profil</Text>
      <UserProfileInfo username={username} picture={picture} numberCountries={numberCountries}/>  
      <FlagList countryList={countryList} onSelectCountry={handleSelectCountry} selectedCountry={currentCountry} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.visitedCities}>
        {cityList?.map((city: { id: string; Name: any; Image: any; }) => (
          <CitySelectionCard key={city.id} Name={city.Name} CardImage={city.Image} onSelectCity={() => handleSelectCity(city.Name)}/>
          ))}
      </ScrollView>
      {
        currentCity && <Text style={styles.visitedCitiesTitle}>Lieux visités à {currentCity}</Text>
      }  
      <View style={styles.visitedPlaces}>
        {placeList?.map((place: { id: string; }) => (

          <CardFeed key={place} id={place} navigation={navigation}/>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F3F6',
  },
  header: {
    paddingVertical:10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
  },
  profileInfos: {
    margin:10,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
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
  visitedCitiesTitle:{
    marginVertical:20,
    fontSize:20,
    fontWeight:"bold",
    textAlign:"center"
  },
  visitedCities: {
    flexDirection: "row",
    height: 250,
  },
  flagList: {
    height: 60,
  },
  visitedPlaces: {
    alignSelf:'center',
    paddingBottom: 20,
    paddingHorizontal:8, 
    width:'100%',
  },
});

export default ProfileSection;
