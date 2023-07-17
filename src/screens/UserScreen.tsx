import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { getVisitedCountries } from '../api/country';
import { getVisitedPlaces } from '../api/places';
import { getUsername } from '../api/user';
import { getVisitedCitiesByCountry } from '../api/city';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import FlagList from '../components/utils/FlagList';
import CitySelectionCard from '../components/cards/SelectCard';
import CardFeed from '../components/cards/CardFeed';
import UserProfileInfo from '../components/utils/UserProfileInfos';
import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const UserScreen = ({navigation}) => {
  const auth = FIREBASE_AUTH; 
  const uid = auth?.currentUser?.uid; 
  const isFocused = useIsFocused();

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
        <TouchableOpacity
          style={{ marginRight: 10 }}
          title="Logout"
          onPress={() => {
            auth.signOut().then(() => {
              navigation.replace('Login');
            });
          }}
        >
          <Icon name="logout" size={24} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

	const handleFetchCountries = () => {
		getVisitedCountries(uid).then((response) => {
			if(response[0]?.Visited_countries.length === 0){
				setCountryList(undefined);
			} else {
				setCountryList(response[0].Visited_countries);
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
		getUsername(uid).then((response)=>{
			setUsername(response?.Username)
		})
	}, [uid]);
  
  useEffect(()=>{
    if(!countryList) return;

    setNumberCountries(countryList?.length)
  },[countryList])

	useEffect(() => {
		if(!currentCountry)
			return; 

		getVisitedCitiesByCountry(uid, currentCountry.countryName).then((response) =>{
			setCityList(response[0].Visited_cities); 
		})
	}, [currentCountry]);


	useEffect(() => {
		if(!currentCity)
		return; 

		getVisitedPlaces(uid, currentCity).then((response)=>{
			setPlaceList(response[0].Visited_monuments);
		})
	}, [currentCity]);

  return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Mon profil</Text>
      <UserProfileInfo username={username} picture={picture} numberCountries={numberCountries}/>  
      <FlagList countryList={countryList} onSelectCountry={handleSelectCountry} selectedCountry={currentCountry} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.visitedCities}>
        {cityList?.map((city: { _id: React.Key | null | undefined; Name: any; Image: any; }) => (
          <CitySelectionCard key={city._id} Name={city.Name} CardImage={city.Image} onSelectCity={() => handleSelectCity(city.Name)}/>
        ))}
      </ScrollView>
      {
        currentCity && <Text style={styles.visitedCitiesTitle}>Lieux visités à {currentCity}</Text>
      }  
      <View style={styles.visitedPlaces}>
        {placeList?.map((place: { id: string; name: string; picture: string; city: string; country: string; note: number; extraImage: string; }, index: React.Key | null | undefined) => (
          <CardFeed key={index} id={place.id} name={place.name} picture={place.picture} city={place.city} country={place.country} note={place.note} extraImage={place.extraImage} visitors={undefined} navigation={navigation}/>
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
    width:'96%',
  },
});

export default UserScreen;
