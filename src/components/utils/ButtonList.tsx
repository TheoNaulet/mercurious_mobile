import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ButtonList({ item, setItem, list }) {

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {list?.map((val, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            item === val ? styles.selectedButton : {},
          ]}
          onPress={() => setItem(val)}
        >
          <Text style={[styles.buttonText,item === val ? styles.buttonTextSelected : {}]}>
            {val}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height:110,
        padding: 10,
        marginBottom:20,
    },
    button: {
        height:40,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight:10,
        borderRadius: 25,
        shadowColor: 'rgba(99, 99, 99)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
    },
    buttonTextSelected: {
        color: 'white',
        fontWeight: 'bold',
    },
    selectedButton:{
        backgroundColor:'#BB2649',
    },
});
