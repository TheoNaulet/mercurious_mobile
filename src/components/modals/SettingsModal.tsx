import { Modal, ScrollView, StyleSheet, TouchableOpacity, View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useContext, useState } from 'react';
import { Icon } from 'react-native-elements';
import { UserContext } from '../../../context/UserContext';

const SettingsModal = () => {
	const { signout } = useContext(UserContext);
	const [modalVisible, setModalVisible] = useState(false);

	const handleModalOpen = () => {
		setModalVisible(true);
	};

	const handleModalClose = () => {
		setModalVisible(false);
	};

	const handleSignOut = () => {
		signout();
		handleModalClose();
	}

	return (
		<View style={styles.modalContainer}>
			<TouchableOpacity onPress={handleModalOpen}>
				<Icon type='font-awesome' name='bars' size={30} />
			</TouchableOpacity>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={handleModalClose}
			>
				<TouchableWithoutFeedback onPress={handleModalClose}>
					<View style={styles.centeredView}>
						<TouchableWithoutFeedback onPress={() => null}>
							<View style={styles.modalView}>
								<View style={styles.title}>
									<TouchableOpacity onPress={handleModalClose}>
										<Icon type='font-awesome' name='arrow-left' size={20} />
									</TouchableOpacity>
									<Text style={styles.titleText}>Paramètres</Text>
								</View>

								<View style={styles.settings}>
									<TouchableOpacity style={styles.settingsOption} onPress={handleSignOut}>
										<Icon type='font-awesome' name='sign-out' size={30} />
										<Text style={styles.settingsOptionText}>Déconnecter</Text>
									</TouchableOpacity>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
};


const styles = StyleSheet.create({
	title: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
		paddingBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd', // change this to the color you want the separator to be
	},
	titleText: {
		marginLeft: 10,
		fontSize: 20,
		fontWeight: 'bold',
	},
	modalContainer:{
		paddingHorizontal:20,
		paddingVertical:10,
		alignItems:'flex-end',
	},
	centeredView: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	modalView: {
		height:'auto', 
		width:"100%",
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
		width: 0,
		height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	settings: {
		marginTop: 20,
	},
	settingsOption: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	settingsOptionText: {
		marginLeft: 10,
		fontSize: 16,
	  },
});

export default SettingsModal;
