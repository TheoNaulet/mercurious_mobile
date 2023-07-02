import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPlaceById } from '../api/places';
import CardFeed from '../components/cards/CardFeed';

const PlaceScreen = ({route, navigation}) => {
    const { placeId } = route.params;
    const [place, setPlace] = useState();  

    const fetchPlace = async () => {
        const response = await getPlaceById(placeId); 
        setPlace(...response);
    } 

    useEffect(()=>{
        if(!placeId) return;

        fetchPlace();
    }, [placeId])

    return (
        <View style={styles.container}>
            <CardFeed id={placeId} city={place?.City} country={place?.Country} name={place?.Name} visitors={place?.visitors} note={place?.Rate} picture={place?.Image} extraImage={place?.ExtraImage} navigation={navigation}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingTop:20,
        alignSelf:'center',
        width:"98%",
    }
})

export default PlaceScreen