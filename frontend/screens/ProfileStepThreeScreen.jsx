import React, { useState } from 'react';
import { addData } from '../reducers/user';
import { ERRORS } from '../utils/constants';
import { URL_EXPO } from '../environnement';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';
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
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={'white'} />
			<View style={{ alignItems: 'center' }}>
				<Text style={[STYLES_GLOBAL.title, STYLES_GLOBAL.titleLight]}>
					Création de votre profil
				</Text>
				<Text style={[STYLES_GLOBAL.subTitle, STYLES_GLOBAL.subTitleLight]}>
					Etape 3/3
				</Text>

				<Text style={STYLES_GLOBAL.textLight}>
					Envie de partager vos passions ? Séléctionnez en au moins 1 et maximum
					5 pour terminez la création de votre Iconic Profile !
				</Text>

				<HobbiesAutoCompleteHomeMade
					hobbies={hobbies}
					setHobbies={setHobbies}
					error={error}
					setError={setError}
				/>
			</View>

			{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}

			<View style={STYLES_GLOBAL.btnBottomContainer}>
				<ButtonIcon
					type="secondary"
					name="arrow-undo-outline"
					onpress={() => navigation.navigate('ProfileStepTwo')}
				/>
				<Button type="secondary" label="Enregistrer" onpress={handleRegister} />
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.darkBlue,
	},
	hobbiesBtn: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-around',
		rowGap: -20,
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	test: {
		borderColor: 'red',
		borderWidth: 2,
	},
});

export default ProfileStepThreeScreen;
