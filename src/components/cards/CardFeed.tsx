import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import LikeButton from '../utils/LikeButton';
import VisitButton from '../utils/VisitButton';
import { getPlaceByIdAndUserInteractions } from '../../api/places';
import FriendVisit from '../utils/isFriendVisit';

interface CardFeedProps {
    id: string;
    navigation: any;
}

const CardFeed: React.FC<CardFeedProps> = ({ id, navigation }) => {
	const [visited, setVisited] = useState(false);
	const [liked, setLiked] = useState(false);
	const [place, setPlace] = useState({});
	const [visitorsFollow, setVisitorsFollow] = useState();

	const auth = FIREBASE_AUTH; 
	const uid = auth?.currentUser?.uid; 

	useEffect(()=>{
		if(!id || !uid ) return;
		getPlaceByIdAndUserInteractions(id, uid).then((data) => {
			setVisitorsFollow(data.visitedByFollowing)
			setVisited(data.isVisited);
			setLiked(data.isLiked);
			setPlace(data.place)
		});
	},[id, uid])


	return (
		<View style={styles.card}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={{ uri: place.Image }} />
				<View style={styles.likeButtonContainer}>
					<LikeButton isLiked={liked} onclick={setLiked} uid={uid} id={id} city={place.City} country={place.Country}/>
				</View>
			</View>
			<View style={styles.cardInfos}>
				<View style={styles.nameContainer}>
					<Text style={styles.name}>{place.Name}</Text>
					{place.Rate && (
						<View style={styles.noteContainer}>
							<Icon name="star" color="#FFD700" type="font-awesome" size={20} />
							<Text style={styles.noteText}>{place.Rate}</Text>
						</View>
					)}
				</View>
				<TouchableOpacity style={styles.cityCountry} onPress={() => navigation.navigate('CityScreen', {city: place.City})}>
					<Text style={styles.CityText}>{place.City}, {place.Country}</Text>
				</TouchableOpacity>
				<View style={styles.bottomInfos}>
					<FriendVisit navigation={navigation} visitorsId={visitorsFollow}/>
					<VisitButton isVisited={visited} onclick={setVisited} id={place._id} uid={uid} city={place.City} country={place.Country}/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '100%',
		backgroundColor: 'white',
		marginBottom: 20,
		borderRadius: 20,
		height: 'auto',
		shadowColor: 'rgba(99, 99, 99)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 8,
		elevation: 3,
	},
	imageContainer: {
		position: 'relative',
	},
	image: {
		flexShrink: 0,
		width: '100%',
		height: 375,
		borderRadius: 20,
	},
	likeButtonContainer: {
		position: 'absolute',
		top: 10,
		right: 10,
	},
	likeButtonText: {
		fontSize: 20,
	},
	cardInfos: {
		width: '100%',
		padding: 10,
	},
	name: {
		alignSelf: 'flex-start',
		fontSize:20,
		fontWeight:"bold",
		flexShrink: 1, 
	},
	nameContainer:{
		justifyContent:'space-between',
		flexDirection:'row',
		width:'100%',
	},
	noteContainer:{
		flexDirection:'row',
		alignItems:"center",
		marginLeft: 8,
	},
	noteText:{
		fontSize:20,
		marginLeft:4,
		fontWeight:'bold',
	},
	cityCountry: {
		borderRadius: 20,
		backgroundColor: '#BB2649',
		shadowColor: 'rgba(99, 99, 99, 0.8)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		paddingVertical: 4,
		paddingHorizontal: 20,
		color: 'white',
		alignSelf: 'flex-start',
		marginVertical: 10,
	},
	CityText: {
		color: 'white',
	},
	bottomInfos: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

export default CardFeed;