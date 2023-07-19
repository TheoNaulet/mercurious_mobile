import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { getAllPlacesByIdAndUserInteractions, getNewPlacesFeed, getPlacesFeed } from '../api/places';
import CardFeed from '../components/cards/CardFeed';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const HomeScreen = ({navigation}) => {

  const auth = FIREBASE_AUTH; 
  const uid = auth?.currentUser?.uid; 

  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPlaces = async (nextPage) => {
    try {
      const data = await getPlacesFeed(nextPage);
      // let test = await getNewPlacesFeed();
      // test = JSON.parse(JSON.stringify(test));

      // console.log('TEST 1 '   test); 
      // const test2 = await getAllPlacesByIdAndUserInteractions(test, uid);
      
      // console.log('test 2 = ' + test2); 
      // console.log('test ===========' + test);
      // const test = await getAllPlacesByIdAndUserInteractions(data, uid); 
      // console.log(test);
      setPlaces(prevPlaces => [...prevPlaces, ...data]);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPlaces(page);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    fetchPlaces(1).then(() => setRefreshing(false));
  }, []);

  const handleScroll = ({nativeEvent}) => {
    if (nativeEvent.contentOffset.y + nativeEvent.layoutMeasurement.height >= nativeEvent.contentSize.height) {
      setPage(prevPage => prevPage + 1);
      fetchPlaces(page);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={handleScroll}
      scrollEventThrottle={400}
    >
        {error && <Text style={styles.errorText}>Erreur: {error}</Text>}
        {places && (
          <View style={styles.placesContainer}>
            {places.map((val, key) => (
              <CardFeed navigation={navigation} key={key} id={val._id}/>
            ))}
          </View>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor:"white",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  errorText: {
    color: 'white',
  },
  placesContainer: {
    marginTop: 20,
    width:"96%",
  },
  placeName: {
    fontSize: 16,
  },
});

export default HomeScreen;
