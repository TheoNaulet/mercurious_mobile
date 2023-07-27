import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SelectCard from '../components/cards/SelectCard';
import { getCitiesByCountry } from '../api/city';
import { getAllPlaceByIdAndUserInteractions, getPlacesByCity } from '../api/places';
import {FIREBASE_AUTH} from '../../FirebaseConfig'
import { UserContext } from '../../context/UserContext';
import NewCardFeed from '../components/cards/NewCardFeed';
import { getCountryByName, getFriendsWhoVisited } from '../api/country';
import Visitors from '../components/utils/Visitors';

const CountryScreen = ({ route, navigation }) => {
	const {followings} = useContext(UserContext);
	const auth = FIREBASE_AUTH; 
	const uid = auth?.currentUser?.uid; 
	const { country, id } = route.params;
	const [cities, setCities] = useState([]);
	const [citySelected, setCitySelected] = useState('');
	const [places, setPlaces] = useState([]); 
	const [countryInfos, setCountryInfos] = useState(); 
	const [visitors, setVisitors] = useState([]); 
	const [pagePlace, setPagePlace] = useState(1);
	const [pageCity, setPageCity] = useState(1);

	const fetchVisitors = async () => {
		const visitorsData =  await getFriendsWhoVisited(followings, id);
		setVisitors(visitorsData);
	}

	const fetchPlacesByCity = async (page) => {
		const data = await getPlacesByCity(citySelected, page); 
		getAllPlaceByIdAndUserInteractions(data, uid, followings ).then((response)=>{
			if (response) {
				setPlaces(places => [...places, ...response]);
			} else {
				console.error('Failed to fetch more places: Response is', response);
			}
		})
		setPagePlace(page + 1);
	}
	

	const fetchCountry = async () => {
		try {
			const data = await getCountryByName(country);
			setCountryInfos(data);
		} catch (error) {
			console.error('Failed to fetch cities:', error);
		}
	}

	const fetchCities = async () => {
		try {
			const citiesData = await getCitiesByCountry(country, followings, pageCity);
			if(citiesData.length) {
				setCities(prevCities => [...prevCities, ...citiesData]);
				setPageCity(pageCity + 1);
			}
		} catch (error) {
			console.error('Failed to fetch cities:', error);
		}
	};

	function isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
		const paddingToBottom = 1000;
		return layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingToBottom;
	}
	
	function isCloseToRight({layoutMeasurement, contentOffset, contentSize}){
		const paddingToRight = 200;
		return layoutMeasurement.width + contentOffset.x >=
			contentSize.width - paddingToRight;
	}
	

	useEffect(() => {
		if(!country) return; 

		fetchCountry();
		fetchCities();
	}, [country]);

	useEffect(()=>{
		if(!followings || !country) return;

		fetchVisitors(); 
	}, [followings, country])

	useEffect(()=>{
		if (!citySelected)
			return;

		setPlaces([]);
		const newPage = 1;
		setPagePlace(newPage); 
		fetchPlacesByCity(newPage);
	}, [citySelected])
	
	return (
		<ScrollView
			onScroll={({nativeEvent}) => {
				if (isCloseToBottom(nativeEvent)) {
					fetchPlacesByCity(pagePlace);
				}
			}}
			scrollEventThrottle={400}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.detailsCity}>
				<View style={styles.country}>
					{countryInfos && <Image source={{uri: countryInfos[0]?.flag}} style={{ width: 30, height: 30, borderRadius:60 }} />}
					<Text style={styles.title}>{country}</Text>
				</View>
				<Visitors type='pays' navigation={navigation} visitors={visitors}/>
			</View>
			<View style={styles.contentContainer} > 
				<ScrollView 
					contentContainerStyle={styles.contentContainer} 
					horizontal 
					showsHorizontalScrollIndicator={false}
					onScroll={({nativeEvent}) => {
						if (isCloseToRight(nativeEvent)) {
						fetchCities();
						}
					}}
					scrollEventThrottle={400}
					>
					{cities.map((city, index) => (
						<SelectCard key={index} Name={city.Name} CardImage={city.Image} onSelectCity={setCitySelected}/>
					))}
				</ScrollView>
			</View>
			<Text style={styles.subtitle}>{citySelected}</Text>
			<View style={styles.placesContainer}>
			{places?.map((val, key) => {
				return(
					<NewCardFeed key={key} navigation={navigation} place={val}/>
				)
            })}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	detailsCity:{
		flexDirection:"row",
		marginVertical:20,
		width:"95%",
		height:50,
		backgroundColor:"white", 
		borderRadius:20,
		alignSelf:'center',
		alignItems:"center",
		justifyContent:'space-between',
		paddingHorizontal:20,
	},
	friendsInfos:{
		alignContent:'flex-end',
		alignItems:'flex-end',
		flexDirection:'row',
	},
	contentContainer: {
		backgroundColor:"white",
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection:'row',
	},
	imagesContainer: {
        flexDirection: 'row',
        marginLeft:10
    },
    imageTouch: {
        marginLeft: -10,
    },
    image: {
            width: 30,
            height: 30,
            borderRadius: 15,
    },
    moreVisitorsView: {
        backgroundColor: 'gray',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -10
    },
	moreVisitorsText: {
        color: 'white'
    },
	country:{
		flexDirection:"row", 
		alignItems:"center",
	}, 
	
	title:{
		fontSize:30,
		textAlign:'center',
		marginLeft:20
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
