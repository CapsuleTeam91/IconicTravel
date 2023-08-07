import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { URL_EXPO } from '../../environnement';
import { COLORS, COLORS_THEME } from '../../utils/styles';
import Input from './Input';
import ButtonIcon from '../buttons/ButtonIcon';

const HobbiesAutoCompleteHomeMade = ({
	hobbies,
	setHobbies,
	setError,
	isEditable = true,
}) => {
	const [newHobbies, setNewHobbies] = useState('');
	const [newHobby, setNewHobby] = useState('');

	const removeHobby = (hobby) => {
		setHobbies(hobbies.filter((el) => el !== hobby));
		setNewHobbies(newHobbies.filter((el) => el !== hobby));
	};

	const handleNewHobby = () => {
		if (hobbies.length === 5) {
			setError('Maximum 5 hobbies baby');
			return;
		}

		let hobby = newHobby.toLowerCase().replace(' ', '_');

		fetch(`${URL_EXPO}:3000/hobbies/new`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ hobby }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					setHobbies([...hobbies, newHobby]);
					setNewHobbies([...newHobbies, newHobby]);
					setNewHobby('');
				} else {
					setError(`Oh ooh ton hobby n'est pas valide, vérifie la liste !`);
				}
			});
	};

	return (
		<>
			<View style={styles.container}>
				<Input
					label="Créez un hobby"
					theme={COLORS_THEME.dark}
					autoFocus={false}
					autoCapitalize="none"
					keyboardType="default"
					onChangeText={(value) => {
						setNewHobby(value);
					}}
					value={newHobby}
					// handleFocus={() => setIsActive(!isActive)}
					// // handleBlur={() => setIsActive(false)}
				/>
				<ButtonIcon
					type="secondary"
					size={18}
					name="add-outline"
					onpress={() => {
						handleNewHobby();
						// setIsActive(false);
					}}
				/>
			</View>

			{newHobbies.length > 0 && (
				<View style={styles.hobbiesContainer}>
					{newHobbies.map((el, i) => (
						<TouchableOpacity key={i} onPress={() => removeHobby(el)}>
							<Text style={styles.hobby}>{el}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '70%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	listContainer: {
		maxHeight: 178,
	},
	hobbiesContainer: {
		width: 300,
		marginVertical: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	hobby: {
		fontWeight: '700',
		color: COLORS.darkBlue,
		backgroundColor: COLORS.bg,
		paddingHorizontal: 10,
		margin: 5,
		borderRadius: 25,
	},
	containerStyle: {
		minWidth: '70%',
	},
	btn: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		margin: 2,
		borderRadius: 8,
		backgroundColor: COLORS.pink,
	},
});

export default HobbiesAutoCompleteHomeMade;
