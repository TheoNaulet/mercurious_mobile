import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { isVisited, unvisitPlace, visitPlace } from '../../api/places';
import { getCountryByName, visitCountry } from '../../api/country';
import { getCityByName, visitCity } from '../../api/city';
import { StyleSheet } from 'react-native';

interface VisitButtonProps {
    uid: string;
    id: string;
    isVisited:boolean;
    onclick:(value:boolean)=> void;
    city:string;
    country:string;
}

/**
 * VisitButton component for marking a place as visited.
 * 
 * @param {Object} props - Props passed down to the VisitButton component.
 * @param {string} props.uid - The user ID.
 * @param {Object} props.place - Object containing information about the place.
 * @param {string} props.id - ID of the place.
 * 
 */
const VisitButton: React.FC<VisitButtonProps> = ({ isVisited, onclick, uid, city, country, id }) => {
    const [countryId, setCountryId] = useState('');
    const [cityId, setCityId] = useState('');

    const onVisit = async () => {
        await fetchData(); 
        
        if (isVisited) {
            unvisitPlace(uid, id);
        } else {
            try {
                visitPlace(uid, id);
                visitCountry(uid, countryId);
                visitCity(uid, cityId);
            } catch (error) {
                console.log('error:', error);
            }
        }
        onclick(!isVisited);
    };

    const fetchData = async () => {
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
    };

    return (
        <TouchableOpacity onPress={onVisit} style={styles.visitedButton}>
            <Text>{isVisited ? 'Visité ✅' : 'Déjà visité ?'}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    visitedButton:{
		height:30,
		width:100,
		alignItems:'center',
		borderRadius:20,
		backgroundColor:"white",
		shadowColor: 'rgba(99, 99, 99, 0.6)',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		justifyContent:"center",
	},
})
export default VisitButton;
