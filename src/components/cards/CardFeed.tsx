import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import IsFriendVisit from '../utils/isFriendVisit';
import LikeButton from '../utils/LikeButton';
import VisitButton from '../utils/VisitButton';

interface CardFeedProps {
    id: string;
    city: string;
    country: string;
    name: string;
    visitors: number;
    note: number;
    picture: string;
    extraImage: string;
    navigation: any;
}

const CardFeed: React.FC<CardFeedProps> = ({ id, city, country, name, visitors, note, picture, extraImage, navigation }) => {
	const auth = FIREBASE_AUTH; 
	const uid = auth?.currentUser?.uid; 

	const place = {id:id, city:city, country:country, name:name, note:note, picture:picture, extraImage:extraImage}

	return (
		<View style={styles.card}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={{ uri: picture }} />
				<View style={styles.likeButtonContainer}>
					<LikeButton uid={uid} place={place} id={id}/>
				</View>
		
			</View>
			<View style={styles.cardInfos}>
				<View style={styles.nameContainer}>
					<Text style={styles.name}>{name}</Text>
					{note && (
						<View style={styles.noteContainer}>
							<Icon name="star" color="#FFD700" type="font-awesome" size={20} />
							<Text style={styles.noteText}>{note}</Text>
						</View>
					)}
				</View>
				<TouchableOpacity style={styles.cityCountry} onPress={() => navigation.navigate('CityScreen', {city: city})}>
					<Text style={styles.CityText}>{city}, {country}</Text>
				</TouchableOpacity>
				<View style={styles.bottomInfos}>
					<IsFriendVisit placeId={id}/>
					<VisitButton place={place} id={id} uid={uid} />
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