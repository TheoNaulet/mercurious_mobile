import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { getCountryByName, likeCountry } from '../../api/country';
import { getCityByName, likeCity } from '../../api/city';
import { likePlace, unlikePlace } from '../../api/places';

interface LikeButtonProps {
    uid: string;
    id: string;
    city:string;
    country:string;
    onclick: (value:boolean) => void; 
    isLiked: boolean;
}

/**
 * LikeButton component for liking or unliking a place.
 * 
 * @param {LikeButtonProps} props - Props passed down to the LikeButton component.
 */
const LikeButton: React.FC<LikeButtonProps> = ({ uid, city, country, isLiked, onclick, id }: LikeButtonProps) => {
    const [cityId, setCityId] = useState('');
    const [countryId, setCountryId] = useState('');

    const onLike = async () => {
        await fetchDatas(); 

        if (isLiked) {
            unlikePlace(uid, id);
        } else {
            likePlace(uid, id, city); 
            likeCity(uid, cityId);
            likeCountry(uid, countryId);
        }
        onclick(!isLiked);
    };

    const fetchDatas = async () => {

        await getCityByName(city).then((response)=>{
            if (response && response.length > 0) {
                const cityId = response[0]._id;
                setCityId(cityId);
            } else {
                console.error('No city found for given name:', city);
            }
        }).catch((error) => {
            console.error('An error occurred while getting city by name:', error);
        });

        await getCountryByName(country).then((response)=>{
            if (response && response.length > 0) {
                const data = response[0]._id;
                setCountryId(data);
            } else {
                console.error('No country found for given name:', country);
            }
        }).catch((error) => {
            console.error('An error occurred while getting city by name:', error);
        });
    }

    return (
        <TouchableOpacity style={styles.likeButton} onPress={onLike}>
            <Icon name={isLiked ? 'heart' : 'heart-o'} color={isLiked ? '#ff0000' : '#000000'} type="font-awesome"/>
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
