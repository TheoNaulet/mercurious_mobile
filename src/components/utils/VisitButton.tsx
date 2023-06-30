import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { isVisited, unvisitPlace, visitPlace } from '../../api/places';
import { getCountryByName, visitCountry } from '../../api/country';
import { getCityByName, visitCity } from '../../api/city';
import { StyleSheet } from 'react-native';

const VisitButton = ({ uid, place, id }) => {
    const [visited, setVisited] = useState(false);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        if (!uid || !place || !id ) return;

        setCountry(place.country);
        setCity(place.city);

        fetchData();
    }, [uid, id]);

    const onVisit = async () => {
        if (visited) {
            unvisitPlace(uid, place);
        } else {
            try {
                visitPlace(uid, place);
                const countryVisit = await getCountryByName(country);
                visitCountry(uid, countryVisit[0]);
                const cityVisit = await getCityByName(city);
                visitCity(uid, cityVisit[0]);
            } catch (error) {
                console.log('error:', error);
            }
        }
        setVisited(!visited);
    };

    const fetchData = async () => {
        await isVisited(id, uid).then((response) => {
            setVisited(response);
        });
    };

    return (
        <TouchableOpacity onPress={onVisit} style={styles.visitedButton}>
            <Text style={styles.buttonText}>{visited ? 'Visité ✅' : 'Déjà visité ?'}</Text>
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
