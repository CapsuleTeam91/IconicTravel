import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ERRORS, URL_EXPO } from '../utils/constants';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';

const HistoryScreen = ({ navigation }) => {
	// Fausse donnée pour tester la fonctionnalité du code
	const fakeData = [
		{
			destination: 'Paris',
			date: '2023-07-15',
			avatar: '../assets/avatar.png',
		},
		{
			destination: 'New York',
			date: '2023-08-05',
			avatar: '../assets/avatar.png',
		},
		{
			destination: 'Tokyo',
			date: '2024-02-20',
			avatar: '../assets/avatar.png',
		},
		{
			destination: 'Barcelone',
			date: '2024-05-10',
			avatar: '../assets/avatar.png',
		},
	];

	// Affichage de l'historique avec fakeData
	const renderItem = ({ item }) => (
		<View style={styles.voyage}>
			<Image source={{ uri: item.avatar }} style={styles.avatar} />
			<View style={styles.voyageInfo}>
				<Text style={styles.destination}>
					{' '}
					✈️ Destination : {item.destination}
				</Text>
				<Text style={styles.date}>Date : {item.date}</Text>
			</View>
		</View>
	);

	// Variable d'états
	const [voyages, setVoyages] = useState(fakeData);

	// Message d'erreur / conditions
	const afficherHistorique = () => {
		if (voyages.length === 0) {
			return (
				<Text style={styles.message}>
					Oh non mon pauvre chaton 🥹 ! Tu n’es pas encore un Iconic Traveler ...
				</Text>
			);
		} else {
			return (
				// FlatList qui affiche une liste des voyages effectués
				<FlatList
					data={voyages}
					// keyExtractor  utilisée pour attribuer une clé unique pour chaque élément de la liste.
					keyExtractor={(item, index) => index.toString()}
					// renderItem définit la maniere dont chaque élément de la liste sera rendu à l'écran
					renderItem={({ item }) => (
						<View style={styles.voyage}>
							<View style={styles.voyageInfo}>
								<Text style={styles.destination}>
									Destination : {item.destination}
								</Text>
								<Text style={styles.date}>Date : {item.date}</Text>
							</View>
						</View>
					)}
				/>
			);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Mes Précédents Voyages</Text>
			{/* {afficherHistorique()} */}
			<FlatList
				data={voyages}
				keyExtractor={(item, index) => index.toString()}
				renderItem={renderItem}
				contentContainerStyle={styles.listContainer}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f0f0f0',
	},
	title: {
		color: COLORS.darkBlue,
		fontSize: 20,
		letterSpacing: 1.2,
		fontWeight: '700',
		textAlign: 'center',
		textTransform: 'uppercase',
	},
	message: {
		textAlign: 'center',
		fontSize: 16,
		fontStyle: 'italic',
		marginTop: '80%',
	},
	voyage: {
		borderBottomWidth: 1, //Bordure grisé
		borderBottomColor: '#ccc',
		paddingVertical: 10,
	},
	destination: {
		fontSize: 18,
		fontWeight: 'bold',
		color: COLORS.darkBlue,
	},
	date: {
		fontSize: 16,
	},
	listContainer: {
		marginTop: '50%',
	},
});

export default HistoryScreen;
