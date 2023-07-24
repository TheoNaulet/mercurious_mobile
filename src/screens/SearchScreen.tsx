import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';
import { searchAll } from '../api/user';

const SearchScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [placeList, setPlaceList] = useState(); 
	const [cityList, setCityList] = useState([]); 
	const [countryList, setCountryList] = useState(); 
  const [userList, setUserList] = useState(); 

  useEffect(() => {
    const timeoutId = setTimeout(handleSearch, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = async () => {
		try {
			if(query.length < 3){
				return;
			} else {
        await searchAll(query).then((response)=>{
          setUserList(response.users);
          setPlaceList(response.places);
          setCountryList(response.countries);
          setCityList(response.cities);
        });
			}
				} catch (error) {
			console.log(error); 
		}
	}

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
            style={styles.input}
            placeholder="Recherchez un lieu..."
            value={query}
            onChangeText={(text) => setQuery(text)}
          />
          {query.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={() => setQuery('')}>
            <Icon type='font-awesome' name="times" size={20} color="#444" />
        </TouchableOpacity>
      )}
      </View>
      <ScrollView scrollEventThrottle={16} onScroll={Keyboard.dismiss}>
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

      {countryList && countryList?.map((val, key) => (
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

      {userList && userList.map((val, key) => (
        <TouchableOpacity
          key={key}
          style={styles.searchItem}
          onPress={() => {
            navigation.navigate('FriendScreen', { User: val.userId });
          }}
        >
          <Image style={styles.itemImage} source={{ uri: val.Profile_picture }} />
          <Text style={styles.searchItemText}>{val.Username}</Text>
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
    fontSize:15,
    alignSelf:"center",
    marginLeft:10
  },
  itemImage:{
    height:50,
    width:50,
    borderRadius:100,
  }, 
  clearButton:{
    alignItems:'center',
    justifyContent:'center',
    margin:10,
  }
});

export default SearchScreen;
