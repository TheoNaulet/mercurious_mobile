import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { searchCity } from '../api/city';
import { searchCountry } from '../api/country';
import { searchPlace } from '../api/places';
import { Icon } from 'react-native-elements';

const SearchScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [placeList, setPlaceList] = useState(); 
	const [cityList, setCityList] = useState(); 
	const [countryList, setCountryList] = useState(); 

  useEffect(() => {
    const timeoutId = setTimeout(handleSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = async () => {
		try {
			if(query.length < 3){
				return
			} else {

				await searchCity(query).then((response)=>{
					setCityList(response);
				})
				await searchCountry(query).then((response)=>{
					setCountryList(response);
				})
				await searchPlace(query).then((response)=>{
					setPlaceList(response);
				})
			}
				} catch (error) {
			console.log(error); 
		}
	}

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity style={styles.dismissButton} onPress={() => Keyboard.dismiss()}>
          <Icon name="arrow-left" color={'#000000'} type="font-awesome" />
        </TouchableOpacity>
        <TextInput
            style={styles.input}
            placeholder="Recherchez un lieu..."
            value={query}
            onChangeText={(text) => setQuery(text)}
          />
      </View>
      <ScrollView>
      {cityList && cityList.map((val, key) => (
        <TouchableOpacity
          key={key}
          style={styles.searchItem}
          onPress={() => {
            navigation.navigate('CityScreen', { city: val.Name });
          }}
        >
          <Image style={styles.itemImage} source={{ uri: val.Image }} />
          <Text style={styles.searchItemText}>{val.Name}, {val.Country}</Text>
        </TouchableOpacity>
      ))}

      {countryList && countryList.map((val, key) => (
        <TouchableOpacity
          key={key}
          style={styles.searchItem}
          onPress={() => {
            navigation.navigate('CountryScreen', { country: val.countryName });
          }}
        >
          <Image style={styles.itemImage} source={{ uri: val.image }} />
          <Text style={styles.searchItemText}>{val.countryName}</Text>
        </TouchableOpacity>
      ))}

      {placeList && placeList.map((val, key) => (
        <TouchableOpacity
          key={key}
          style={styles.searchItem}
          onPress={() => {
            navigation.navigate('PlaceScreen', { placeId: val._id });
          }}
        >
          <Image style={styles.itemImage} source={{ uri: val.Image }} />
          <Text style={styles.searchItemText}>{val.Name}, {val.City}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  searchBar: {
    marginTop: 10,
    padding: 10,
    flexDirection:"row",
  },
  input: {
    marginLeft:20,
    width:300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  dismissButton:{
    alignSelf:"center",
    margin:"auto",
  },
  itemText: {
    fontSize: 18,
    padding: 10,
  },
  searchItem:{
    flexDirection:"row",
    padding:10,
    alignContent:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchItemText:{
    fontSize:20,
    alignSelf:"center",
    marginLeft:10
  },
  itemImage:{
    height:100,
    width:100,
    borderRadius:100,
  }
});

export default SearchScreen;
