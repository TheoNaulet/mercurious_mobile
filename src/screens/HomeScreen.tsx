import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { getPlacesFeed } from '../api/places';
import CardFeed from '../components/cards/CardFeed';

const HomeScreen = ({navigation}) => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPlaces = async (nextPage) => {
    try {
      const data = await getPlacesFeed(nextPage);
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
              <CardFeed navigation={navigation} key={key} id={val._id} name={val.Name} picture={val.Image} city={val.City} country={val.Country} note={val.Rate} extraImage={val.ExtraImage} visitors={undefined}/>
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
