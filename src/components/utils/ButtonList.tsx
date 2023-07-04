import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from 'react-native';

interface ButtonListProps {
  item: any;
  setItem: (item: any) => void;
  list: any[];
}

/**
 * ButtonList component that renders a horizontal scrollable list of buttons.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {any} props.item - The currently selected item.
 * @param {(item: any) => void} props.setItem - Function to set the selected item.
 * @param {Array<string | number | boolean | React.ReactElement | React.ReactFragment | React.ReactPortal | null>} props.list - The list of items to be rendered as buttons.
 * @returns {JSX.Element} Returns the ButtonList component.
 */
const ButtonList: React.FC<ButtonListProps> = ({ item, setItem, list }: { item: any; setItem: (item: any) => void; list: Array<string | number | boolean | React.ReactElement | React.ReactFragment | React.ReactPortal | null>; }): JSX.Element => {

  return (
    <View style={styles.buttonListContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {list?.map((val, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              item === val ? styles.selectedButton : {},
            ]}
            onPress={() => setItem(val)}
          >
            <Text
              style={[
                styles.buttonText,
                item === val ? styles.buttonTextSelected : {},
              ]}
            >
              {val}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 110,
      padding: 10,
    },
    buttonListContainer: {
      height:110,
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

export default ButtonList;