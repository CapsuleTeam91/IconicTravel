import {
	Image,
	SafeAreaView,
	StyleSheet,
	Switch,
	Text,
	View,
} from 'react-native';
import { useState } from 'react';
import { getAge } from '../utils/helper';
import { addData } from '../reducers/user';
import { ERRORS } from '../utils/constants';
import { URL_EXPO } from '../environnement';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import ButtonIcon from '../components/buttons/ButtonIcon';

const UserProfileScreen = ({ navigation }) => {
	// Utilisation des hooks useDispatch et useSelector pour accéder au state de Redux
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);

	// Variable État  local pour gérer l'état du Switch "Iconic Host"
	const [isEnabled, setIsEnabled] = useState(user.canHost);

	// Fonction pour gérer le changement d'état du Switch "Iconic Host"
	const toggleSwitch = () => {
		fetch(`${URL_EXPO}:3000/users/hosting/${user.token}`, { method: 'PUT' })
			.then((response) => response.json())
			.then((data) => {
				// Vérifie si la propriété "result" dans la réponse est vraie
				if (data.result) {
					// Met à jour l'état local "isEnabled" avec la valeur de "canHost" dans la réponse
					setIsEnabled(data.canHost);
					// Dispatch de l'action addData pour mettre à jour le state Redux avec la nouvelle valeur de canHost
					dispatch(addData({ canHost: data.canHost }));
				} else {
					setError(ERRORS[`err${data.status}`]);
				}
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.optionsContainer}>
				<Text style={STYLES_GLOBAL.subTitle}>MON PROFIL</Text>
				<View style={styles.optionsBtnContainer}>
					{/* Bouton pour naviguer vers l'écran de mise à jour du profil */}
					<ButtonIcon
						type="transparent"
						size={18}
						name="pencil-outline"
						onpress={() => {
							navigation.navigate('UpdateUserProfile');
						}}
					/>

					{/* Bouton pour naviguer vers l'écran des paramètres */}
					<ButtonIcon
						type="secondary"
						name="arrow-undo-outline"
						onpress={() => {
							navigation.navigate('TabNavigator', { screen: 'Settings' });
						}}
					/>
				</View>
			</View>

			{/* Section de l'image de profil et du Switch "Iconic Host" */}
			<View style={[styles.optionsContainer, styles.imageContainer]}>
				{/* Affichage de l'image de profil */}
				<Image
					source={{
						uri: user.avatarUrl,
					}}
					style={styles.image}
				/>
				{/* Affichage du Switch "Iconic Host" */}
				<View style={styles.switchContainer}>
					<Text style={STYLES_GLOBAL.subTitle}>Iconic Host</Text>
					<Switch
						trackColor={{ false: COLORS.darkBlue, true: COLORS.pink }}
						thumbColor={isEnabled ? COLORS.bg : COLORS.lightBlue}
						style={{
							marginTop: 10,
							transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
						}}
						ios_backgroundColor={COLORS.lightBlue}
						onValueChange={toggleSwitch} // Appelle la fonction toggleSwitch lors du changement d'état du Switch
						value={isEnabled} // Valeur du Switch basée sur l'état local isEnabled
					/>
				</View>
			</View>

			{/* Section des détails du profil */}
			<View style={styles.detailsContainer}>
				{/* Affichage du nom et de l'âge */}
				<View style={styles.optionsContainer}>
					<Text style={styles.name}>
						{user.firstname} {user.lastname}
					</Text>
					<Text style={styles.age}>{getAge(user.dateOfBirth)} ans</Text>
				</View>
				{/* Affichage de la description */}
				<View style={styles.optionsContainer}>
					<Text style={STYLES_GLOBAL.textDark}>{user.description}</Text>
				</View>
			</View>

			{/* Section des informations */}
			<View style={styles.detailsContainer}>
				<Text style={styles.subTitle}>Informations</Text>
				{/* Affichage du lieu de résidence */}
				<View style={styles.optionsContainer}>
					<Text style={[STYLES_GLOBAL.textDark, styles.details]}>
						Lieu de résidence
					</Text>
					<Text style={[STYLES_GLOBAL.textDark, styles.details]}>
						{user.city.name}
					</Text>
				</View>
				{/* Affichage des langues parlées */}
				<View style={styles.optionsContainer}>
					<Text style={[STYLES_GLOBAL.textDark, styles.details]}>
						Langues parlées
					</Text>
					<View style={styles.languagesContainer}>
						{user.spokenLanguages.map((language, i) => (
							<Text key={i} style={[STYLES_GLOBAL.textDark, styles.details]}>
								{language}
							</Text>
						))}
					</View>
				</View>
			</View>

			{/* Section des passions */}
			<View style={styles.detailsContainer}>
				<Text style={styles.subTitle}>Passions</Text>
				{/* Affichage des hobbies */}
				<View style={styles.optionsContainer}>
					{user.hobbies.map((h, i) => (
						<View key={i} style={styles.hobbyContainer}>
							<Text style={styles.hobby}>{h}</Text>
						</View>
					))}
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 40,
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	optionsContainer: {
		width: Platform.OS === 'ios' ? '90%' : '100%',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	optionsBtnContainer: {
		width: '40%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	switchContainer: {
		alignItems: 'center',
	},
	detailsContainer: {
		width: Platform.OS === 'ios' ? '90%' : '100%',
	},
	languagesContainer: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	imageContainer: {
		padding: 20,
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 250,
	},
	age: {
		marginRight: 20,
	},
	name: {
		fontSize: 24,
		letterSpacing: 1,
		color: COLORS.darkBlue,
		textTransform: 'capitalize',
	},
	subTitle: {
		fontSize: 24,
		color: COLORS.darkBlue,
		textTransform: 'uppercase',
	},
	hobbyContainer: {
		margin: 5,
		borderRadius: 25,
		overflow: 'hidden',
	},
	hobby: {
		color: COLORS.bg,
		paddingVertical: 5,
		paddingHorizontal: 7,
		backgroundColor: COLORS.lightBlue,
	},
	details: {
		paddingVertical: 2,
	},
});

export default UserProfileScreen;
