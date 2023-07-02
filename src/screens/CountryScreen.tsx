import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import SelectCard from '../components/cards/SelectCard';
import { getCitiesByCountry } from '../api/city';
import { getPlacesByCity } from '../api/places';
import CardFeed from '../components/cards/CardFeed';

const CountryScreen = ({ route, navigation }) => {
	const { country } = route.params;
	const [cities, setCities] = useState([]);
	const [citySelected, setCitySelected] = useState('');
	const [places, setPlaces] = useState(); 

	useEffect(() => {
		const fetchCities = async () => {
			try {
				const citiesData = await getCitiesByCountry(country);
				setCities(citiesData);
			} catch (error) {
				console.error('Failed to fetch cities:', error);
			}
		};

		fetchCities();
	}, [country]);

	const fetchPlacesByCity = async () => {
		const response = await getPlacesByCity(citySelected); 
		setPlaces(response); 
	}

	useEffect(()=>{
		if (!citySelected)
			return;
		
		fetchPlacesByCity();
	}, [citySelected])

	return (
		<ScrollView>
			<Text style={styles.title}>{country}</Text>
			<ScrollView contentContainerStyle={styles.contentContainer} horizontal>
				{cities.map((city, index) => (
					<SelectCard key={index} Name={city.Name} CardImage={city.Image} onSelectCity={setCitySelected}/>
				))}
			</ScrollView>
			<Text style={styles.subtitle}>{citySelected}</Text>
			<View style={styles.placesContainer}>
				{places && places.map((val: { _id: string; Name: string; Image: string; City: string; Country: string; Rate: number; ExtraImage: string; }, key: React.Key | null | undefined) => (
					<CardFeed navigation={navigation} key={key} id={val._id} name={val.Name} picture={val.Image} city={val.City} country={val.Country} note={val.Rate} extraImage={val.ExtraImage} visitors={undefined}/>
				))}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	contentContainer: {
		backgroundColor:"white",
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection:'row',
	},
	title:{
		margin:20,
		fontSize:30,
		textAlign:'center',
	},
	subtitle:{
		marginTop:20,
		fontSize:30,
		textAlign:'center',
	},
	placesContainer: {
		marginTop: 20,
		padding:8,
	},
});

export default CountryScreen;
