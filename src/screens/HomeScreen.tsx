import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, } from 'react-native';
import { getAllPlaceByIdAndUserInteractions, getPlacesFeed } from '../api/places';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { UserContext } from '../../context/UserContext';
import NewCardFeed from '../components/cards/NewCardFeed';

const HomeScreen = ({navigation}) => {
  const { followings } = useContext(UserContext)
  const auth = FIREBASE_AUTH; 
  const uid = auth?.currentUser?.uid; 

  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); 

  const fetchPlaces = useCallback(async (nextPage) => {
    setIsLoading(true);
    try {
      const data = await getPlacesFeed(nextPage);
      const response = await getAllPlaceByIdAndUserInteractions(data, uid, followings);
      if (!response) return;
      setPlaces(prevPlaces => nextPage === 1 ? response : [...prevPlaces, ...response]); 
      setError(null);
    } catch (error) {
      setError(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, [uid, followings]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPlaces([]); 
    fetchPlaces(1).then(() => {
      setPage(1);
      setRefreshing(false);
    });
  }, [fetchPlaces]);

  const handleScroll = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent) && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPlaces(nextPage);
    }
  };

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 2000;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  useEffect(() => {
    if (!uid || !followings || isLoading || places.length > 0) return;
    fetchPlaces(page);
  }, [uid, followings, fetchPlaces, isLoading, places]);

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
            {places.map((val, key) => {
              return(
                  <NewCardFeed key={key} navigation={navigation} place={val}/>
              )
            })}
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
