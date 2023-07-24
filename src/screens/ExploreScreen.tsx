import React, {useState, useEffect, useRef, useContext} from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { fetchCountriesWithVisitors, getCountries, getCountriesByContinent } from "../api/country";
import { getAllCities, getAllCitiesTest, getCitiesByCountry } from "../api/city";
import ExploreCard from '../components/cards/ExploreCard';
import ButtonList from '../components/utils/ButtonList';
import { UserContext } from '../../context/UserContext';

const ExploreScreen = () => {
  const scrollRef = useRef();
  const continents = ['Afrique', 'Amérique', 'Asie', 'Europe', 'Océanie'];

  const { followings } = useContext(UserContext); 
  
	const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
	const [countryList, setCountryList] = useState([]);
	const [cityList, setCityList] = useState([]);
  const [page, setPage] = useState(1);
  const [cityPage, setCityPage] = useState(1);


  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  
  const handleFetchMoreCountries = async () => {
    if (!continent) {
      const newPage = page + 1;
      setPage(newPage);
      const moreCountries = await fetchCountriesWithVisitors(followings, newPage);
      setCountryList(oldCountries => [...oldCountries, ...moreCountries]);
    }
  };
  
  const handleFetchMoreCities = async () => {
    if(!country){
      const newPage = cityPage + 1;
      setCityPage(newPage);
      const moreCities = await getAllCitiesTest(followings, newPage);
      setCityList(oldCities => [...oldCities, ...moreCities]);
    }
  };


	const handleFetchPlaces = async () => {
    const responseCountries = await fetchCountriesWithVisitors(followings, 1); 
    const responseCities = await getAllCitiesTest(followings, 1);

    setCityList(responseCities); 
		setCountryList(responseCountries);
	};

  const handleFetchCountriesByContinent = async () => {
		if (continent) {
			const response = await getCountriesByContinent(continent, followings);
			setCountryList(response);
		}
	};

  const handleFetchCitiesByCountry = async () => {
		if (country) {
			const response = await getCitiesByCountry(country, followings);
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
      <ScrollView 
        ref={scrollRef}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            handleFetchMoreCountries();
          }
        }}
        scrollEventThrottle={400}
        showsHorizontalScrollIndicator={false} alwaysBounceVertical={false} contentContainerStyle={styles.countriesContainer}>
        {countryList.map((val, index) => (
            <ExploreCard visitors={val?.visitorUserIds} Name={val.countryName} CardImage={val.image} key={index} type="country"/>
          ))}
      </ScrollView>
      <ButtonList item={country} setItem={setCountry} list={countryList.map(country => country.countryName)}/>
      <ScrollView 
        showsHorizontalScrollIndicator={false} 
        alwaysBounceVertical={false} 
        contentContainerStyle={styles.citiesContainer}
        onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
                handleFetchMoreCities();
            }
        }}
        scrollEventThrottle={400}>
        {cityList.map((val, index) => (
            <ExploreCard visitors={val?.visitorUserIds} Name={val?.Name} CardImage={val?.Image} key={index} type="city"/>
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
    height:'100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  countriesContainer:{
    height:200,
    flex:1,
    flexDirection:"row",
    alignItems: 'center',
    padding: 10,
  },
  citiesContainer:{
    height:200,
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
