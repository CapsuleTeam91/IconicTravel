import React, { useState } from 'react';
import { addData } from '../reducers/user';
import { ERRORS } from '../utils/constants';
import { URL_EXPO } from '../environnement';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderCreateProfile from '../components/HeaderCreateProfile';
import FooterCreateProfile from '../components/FooterCreateProfile';
import HobbiesAutoCompleteHomeMade from '../components/HobbiesAutoCompleteHomeMade';

const ProfileStepThreeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const [hobbies, setHobbies] = useState([]);
	const [error, setError] = useState('');

	const handleRegister = () => {
		setError(''); // reset previous errors

		if (hobbies.length === 0) {
			setError('Sélectionnez au moins une passion !');
			return;
		}

		console.log(hobbies);
		dispatch(addData({ hobbies }));

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
						hobbies,
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
					setHobbies([]);

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

					<HobbiesAutoCompleteHomeMade
						hobbies={hobbies}
						setHobbies={setHobbies}
						error={error}
						setError={setError}
					/>
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
});

export default ProfileStepThreeScreen;
