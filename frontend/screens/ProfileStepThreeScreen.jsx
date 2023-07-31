import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';

import React, { useState } from 'react';
import { addData } from '../reducers/newUser';
import { useDispatch, useSelector } from 'react-redux';
import { ERRORS, URL_EXPO } from '../utils/constants';

const ProfileStepThreeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const newUser = useSelector((state) => state.newUser.value);
	const [hobbies, setHobbies] = useState(['voyage']);
	const [error, setError] = useState('');

	const handleRegister = () => {
		setError(''); // reset previous errors
		if (hobbies.length <= 0) {
			setError('Sélectionnez au moins une passion !');
			return;
		}
		dispatch(addData({ hobbies }));

		console.log(newUser);

		fetch(`${URL_EXPO}:3000/users/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(newUser),
		})
			.then((response) =>
				response.status > 400 ? response.status : response.json()
			)
			.then((data) => {
				if (typeof data === 'number') {
					setError(ERRORS[`err${data}`]);
					return;
				}
				if (data.result) {
					console.log('token: ', data.token);
					// dispatch(login({ token: data.token }));
					setHobbies([]);

					navigation.navigate('ProfileStepFour');
				} else {
					setError(ERRORS[`err${data.status}`]);
				}
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={[STYLES_GLOBAL.title, STYLES_GLOBAL.titleLight]}>
				Création de votre profil
			</Text>
			<Text style={[STYLES_GLOBAL.subTitle, STYLES_GLOBAL.subTitleLight]}>
				Etape 3/3
			</Text>

			<Text style={STYLES_GLOBAL.textLight}>
				Envie de partager vos passions ? Séléctionnez en au moins une et
				terminez la création de votre Iconic Profile !
			</Text>

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
});

export default ProfileStepThreeScreen;
