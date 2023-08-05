import React, { useState } from 'react';
import {
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { addData } from '../reducers/user';
import { ERRORS } from '../utils/constants';
import { URL_EXPO } from '../environnement';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderCreateProfile from '../components/boxes/HeaderCreateProfile';
import FooterCreateProfile from '../components/boxes/FooterCreateProfile';
import MultiSelectComponent from '../components/forms/HobbiesAutoComplete';
import HobbiesAutoCompleteHomeMade from '../components/forms/HobbiesAutoCompleteHomeMade';

const ProfileStepThreeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const [hobbies, setHobbies] = useState([]);
	const [isEditable, setIsEditable] = useState(false);
	const [error, setError] = useState('');

	const handleRegister = () => {
		setError(''); // reset previous errors

		if (hobbies.length === 0) {
			setError('Sélectionnez au moins une passion !');
			return;
		}

		fetch(`${URL_EXPO}:3000/users/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
		})
			.then((response) =>
				response.status > 400 ? response.status : response.json()
			)
			.then((userFound) => {
				if (typeof userFound === 'number') {
					setError(ERRORS[`err${userFound}`]);
					return;
				}
				if (userFound.result) {
					console.log('User created:', userFound.data);
					const {
						firstname,
						lastname,
						dateOfBirth,
						email,
						token,
						avatarUrl,
						description,
						city,
						spokenLanguages,
						travels,
					} = userFound.data;

					dispatch(
						addData({
							firstname,
							lastname,
							dateOfBirth,
							email,
							token,
							avatarUrl,
							description,
							city,
							spokenLanguages,
							hobbies,
							travels,
						})
					);

					navigation.navigate('ProfileStepFour');
				} else {
					setError(ERRORS[`err${userFound.status}`]);
				}
			});
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={'white'} />
			<KeyboardAwareScrollView
				extraScrollHeight={100} // (when scroll)to have extra height between keyboard and text input
				enableOnAndroid={true}
				extraHeight={100} // make some height so the keyboard wont cover other component
				contentContainerStyle={styles.container}>
				<View style={styles.hobbiesContainer}>
					<HeaderCreateProfile step={3} />

					<Text style={[STYLES_GLOBAL.textLight, { textAlign: 'center' }]}>
						Envie de partager vos passions ? Séléctionnez en au moins 1 et
						maximum 5 pour terminez la création de votre Iconic Profile !
					</Text>

					<MultiSelectComponent
						hobbies={hobbies}
						setHobbies={setHobbies}
						setError={setError}
					/>

					<TouchableOpacity
						onPress={() =>
							hobbies.length === 5
								? setError(
										'Vous avez déjà choisi 5 hobbies, supprimez en pour continuer.'
								  )
								: setIsEditable(!isEditable)
						}
						activeOpacity={0.8}>
						<View style={styles.linkContainer}>
							<Text style={styles.textLight}>
								Vous n'avez pas trouvé votre bonheur ?
							</Text>

							<Text style={[styles.textLight, styles.link]}>
								Ajoutez le à notre liste
							</Text>
						</View>
					</TouchableOpacity>

					{isEditable && (
						<HobbiesAutoCompleteHomeMade
							hobbies={hobbies}
							setHobbies={setHobbies}
							setError={setError}
						/>
					)}
				</View>

				{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}

				<FooterCreateProfile
					step={3}
					label="Enregistrer"
					onPressBack={() => navigation.navigate('ProfileStepTwo')}
					onPressNext={handleRegister}
				/>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.darkBlue,
	},
	hobbiesContainer: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
	},
	linkContainer: {
		width: '70%',
		height: 48,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textLight: {
		fontSize: 12,
		marginTop: 20,
		color: COLORS.bg,
	},
	link: {
		marginLeft: 5,
		textDecorationLine: 'underline',
		textDecorationColor: COLORS.bg,
	},
});

export default ProfileStepThreeScreen;
