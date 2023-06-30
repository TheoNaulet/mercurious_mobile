import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { getCountryByName, likeCountry } from '../../api/country';
import { getCityByName, likeCity } from '../../api/city';
import { isLiked, likePlace, unlikePlace } from '../../api/places';

const LikeButton = ({uid, place, id }) => {
    const [liked, setLiked] = useState(false);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    const onLike = async () => {
        if (liked) {
            unlikePlace(uid, place);
        } else {
            likePlace(uid, place); 
            const countryLike = await getCountryByName(country);
            const cityLike = await getCityByName(city);
            likeCity(uid, cityLike[0]);
            likeCountry(uid, countryLike[0]);
        }
    
        setLiked(!liked);
    };

    const fetchData = async () => {
        await isLiked(id, uid).then((response) => {
            setLiked(response);
        });
    };

    useEffect(()=>{
        if(!uid || !place) return; 

        setCountry(place.country);
        setCity(place.city);

        fetchData()
    }, [uid, place])

    return (
        <TouchableOpacity style={styles.likeButton} onPress={onLike}>
            <Icon name={liked ? 'heart' : 'heart-o'} color={liked ? '#ff0000' : '#000000'} type="font-awesome"/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    likeButton:{
        borderColor:"white",
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		alignItems: 'center',
		justifyContent: 'center',
		width: 40,
		height: 40,
		borderRadius: 20,
		elevation: 5,
    }
})

export default LikeButton;
