import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native-elements';
import { getAllPlaceByIdAndUserInteractions, getPlacesByCity } from '../api/places';
import { UserContext } from '../../context/UserContext';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import NewCardFeed from '../components/cards/NewCardFeed';
import { getFriendsWhoVisitedCity } from '../api/country';
import Visitors from '../components/utils/Visitors';

const CityScreen = ({ route, navigation }) => {
  
	const auth = FIREBASE_AUTH; 
	const uid = auth?.currentUser?.uid; 
  const { followings } = useContext(UserContext)
  const { city, id } = route.params;
  const [placeList, setPlaceList] = useState([]); 
  const [error, setError] = useState(); 
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visitors, setVisitors] = useState([])
  const nav = useNavigation();

  const fetchVisitors = async () => {
		const visitorsData =  await getFriendsWhoVisitedCity(followings, id);
		setVisitors(visitorsData)
	}

  const fetchPlaces = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPlacesByCity(city, page);
      getAllPlaceByIdAndUserInteractions(data, uid, followings).then((response)=>{
        setPlaceList(prevPlaces => [...prevPlaces, ...response]);
        setPage(prevPage => prevPage + 1);
      })
      
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [city, page]);

  useEffect(()=>{
    if (!city)
      return; 

    fetchPlaces(); 
  }, [city])

  useEffect(()=>{
    if(!followings || !id) return; 

    fetchVisitors(); 
  },[])

  const handleScroll = ({nativeEvent}) => {
    if (loading) return;
    if (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height) {
      fetchPlaces();
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.contentContainer}
      onScroll={handleScroll}
      scrollEventThrottle={400}
    >
      <View style={styles.detailsCity}>
				<View style={styles.country}>
					<Text style={styles.title}>{city}</Text>
				</View>
				<Visitors visitors={visitors} type='ville' navigation={navigation}/>
			</View>
        {error && <Text style={styles.errorText}>Erreur: {error}</Text>}
        {placeList && (
          <View style={styles.placesContainer}>
            {placeList.map((val, key) => (
              <NewCardFeed key={key} navigation={navigation} place={val}/>
            ))}
          </View>
        )}
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
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
    fontWeight:'bold',
    fontSize:15
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
  },
  cityName: {
    alignSelf:"center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  placesContainer: {
    marginTop: 20,
    width:"96%",
  },
});



export default CityScreen;
