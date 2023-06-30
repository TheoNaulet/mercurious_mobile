import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { getCountries, getCountriesByContinent } from "../api/country";
import { getAllCities, getCitiesByCountry } from "../api/city";
import ExploreCard from '../components/cards/ExploreCard';
import ButtonList from '../components/utils/ButtonList';

const ExploreScreen = () => {

  const continents = ['Afrique', 'Amérique', 'Asie', 'Europe', 'Océanie'];
  
	const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
	const [countryList, setCountryList] = useState([]);
	const [cityList, setCityList] = useState([]);


	const handleFetchPlaces = async () => {
    const responseCountries = await getCountries(); 
    const responseCities = await getAllCities();
    
    setCityList(responseCities); 
		setCountryList(responseCountries);
	};

  const handleFetchCountriesByContinent = async () => {
		if (continent) {
			const response = await getCountriesByContinent(continent);
			setCountryList(response);
		}
	};

  const handleFetchCitiesByCountry = async () => {
		if (country) {
			const response = await getCitiesByCountry(country);
			setCityList(response);
		}
	};

  useEffect(() => {
		handleFetchCountriesByContinent();
	}, [continent]);

  useEffect(() => {
		handleFetchCitiesByCountry();
	}, [country]);

	useEffect(() => {
		handleFetchPlaces();
	}, []);


  
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <ButtonList item={continent} setItem={setContinent} list={continents}/>
      <ScrollView showsHorizontalScrollIndicator={false} alwaysBounceVertical={false} contentContainerStyle={styles.countriesContainer}>
        {countryList.map((val, index) => (
            <ExploreCard Name={val.countryName} CardImage={val.image} key={index} type="country"/>
          ))}
      </ScrollView>
      <ButtonList item={country} setItem={setCountry} list={countryList.map(country => country.countryName)}/>
      <ScrollView showsHorizontalScrollIndicator={false} alwaysBounceVertical={false} contentContainerStyle={styles.citiesContainer}>
        {cityList.map((val, index) => (
            <ExploreCard Name={val?.Name} CardImage={val?.Image} key={index} type="city"/>
          ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor:"white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  countriesContainer:{
    height:250,
    flex:1,
    flexDirection:"row",
    alignItems: 'center',
    padding: 10,
  },
  citiesContainer:{
    height:250,
    flex:1,
    flexDirection:"row",
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default ExploreScreen;
