import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';

import React, { useEffect, useState } from 'react';
import { addData } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { ERRORS, URL_EXPO } from '../utils/constants';
import Input from '../components/Input';

const ProfileStepThreeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const [hobbies, setHobbies] = useState([]);
	const [newHobby, setNewHobby] = useState('');
	const [error, setError] = useState('');

	const handleNewHobby = () => {
		console.log('newHobby', newHobby);

		if (!newHobby) {
			setError('Entrez un nouvel hobby');
			return;
		}
		let hobby = newHobby.toLowerCase().replace(' ', '_');
		console.log(hobby);

		fetch(`${URL_EXPO}:3000/hobbies/new`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ hobby }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					console.log('new hobby added');
					const newHobbies = data.hobbiesList?.map((el) =>
						el.replace('_', ' ')
					);
					setHobbies(newHobbies);
					setNewHobby('');
				} else {
					setError('Problème');
				}
			});
	};

	const handleRegister = () => {
		setError(''); // reset previous errors
		if (hobbies.length <= 0) {
			setError('Sélectionnez au moins une passion !');
			return;
		}
		dispatch(addData({ hobbies }));

		console.log(user);

		fetch(`${URL_EXPO}:3000/users/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user),
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

	useEffect(() => {
		fetch(`${URL_EXPO}:3000/hobbies`)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					const newHobbies = data.hobbiesList?.map((el) =>
						el.replace('_', ' ')
					);
					setHobbies(newHobbies);
					console.log('UseEffect', hobbies);
				}
			});

		return () => {};
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar backgroundColor={'white'} />
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

			<View style={styles.hobbiesBtn}>
				{hobbies.length > 0 &&
					hobbies.map((hobby, i) => (
						<Button key={i} label={hobby} type="tertiary" onpress={() => { }} />
					))}
			</View>

			<View style={styles.inputContainer}>
				<Input
					label="Hobby"
					theme={COLORS_THEME.dark}
					autoFocus={false}
					autoCapitalize="none"
					keyboardType="default"
					onChangeText={(value) => setNewHobby(value)}
					value={newHobby}
				/>
				<ButtonIcon
					type="tertiary"
					name="add-outline"
					onpress={handleNewHobby}
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
	},
	inputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: 'space-between',
	},
});

export default ProfileStepThreeScreen;
