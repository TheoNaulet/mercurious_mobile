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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Recherchez un pays..."
            value={query}
            onChangeText={(text) => setQuery(text)}
          />
          {query.length > 0 && (
            <TouchableOpacity style={styles.clearButton} onPress={() => {
              setQuery(''),
              setPlaceList([]),
              setCityList([]),
              setCountryList([]),
              setUserList([])
            }}>
              <Icon type='font-awesome' name="times" size={20} color="#444" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView scrollEventThrottle={16} onScroll={Keyboard.dismiss}>
      {cityList && cityList.map((val, key) => (
        <TouchableOpacity
          key={key}
          style={styles.searchItem}
          onPress={() => {
            navigation.navigate('CityScreen', { city: val?.Name, id: val?._id });
          }}
        >
          <Image style={styles.itemImage} source={{ uri: val.Image }} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.searchItemText}>{val.Name}</Text>
            <Text style={styles.secondaryItemText}>{val.Country}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {countryList && countryList?.map((val, key) => (
        <TouchableOpacity
          key={key}
          style={styles.searchItem}
          onPress={() => {
            navigation.navigate('CountryScreen', { country: val.countryName, id: val._id });
          }}
        >
          <Image style={styles.itemImage} source={{ uri: val.image }} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.searchItemText}>{val.countryName}</Text>
            <Text style={styles.secondaryItemText}>{val?.continent}</Text>
          </View>
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
          <View style={styles.itemTextContainer}>
            <Text style={styles.searchItemText}>{val.Name}</Text>
            <Text style={styles.secondaryItemText}>{val.City}, {val?.Country}</Text>
          </View>
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
          <View style={styles.itemTextContainer}>
            <Text style={styles.searchItemText}>{val.Username}</Text>
            <Text style={styles.secondaryItemText}></Text>
          </View>
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
    padding: 10,
    flexDirection:"row",
    justifyContent: "center",
    borderBottomColor:'#D3D3D3', 
    borderBottomWidth:0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 25,
    width: "95%",
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#E3E3E3',
  },
  input: {
    flex: 1,
    paddingLeft:10
  },
  clearButton: {
    padding: 5,
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
  itemTextContainer:{
    paddingLeft:10,
    justifyContent:'center',
    marginRight:10,
    flex:1,
  },
  searchItemText:{
    fontSize:17,
    fontWeight:'bold',
  },
  secondaryItemText:{
    color:'#A7A7A7'
  },
  itemImage:{
    height:50,
    width:50,
    borderRadius:100,
  }, 

});

export default SearchScreen;
