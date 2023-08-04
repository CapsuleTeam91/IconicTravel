import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { URL_EXPO } from '../environnement';
import { COLORS, COLORS_THEME } from '../utils/styles';
import Input from './Input';
import ButtonIcon from './ButtonIcon';

const HobbiesAutoCompleteHomeMade = ({
	hobbies,
	setHobbies,
	error,
	setError,
	isEditable = true,
}) => {
	const [dataSet, setDataSet] = useState([]);
	const [newHobby, setNewHobby] = useState('');
	const [isActive, setIsActive] = useState(false);

	const removeHobby = (hobby) => {
		const hobbiesFiltered = hobbies.filter((el) => el !== hobby);
		setHobbies(hobbiesFiltered);
	};

	const addHobby = (hobby) => {
		if (hobbies.length === 5) {
			setError('Maximum 5 hobbies baby');
			return;
		}
		!hobbies.includes(hobby) && setHobbies([...hobbies, hobby]);
		setIsActive(false);
	};

	const handleNewHobby = () => {
		let hobby = newHobby.toLowerCase().trimEnd().replace(' ', '_');

		fetch(`${URL_EXPO}:3000/hobbies/new`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ hobby }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					const newHobbies = data.hobbiesList?.map((el) =>
						el.replace('_', ' ')
					);
					setDataSet(newHobbies);
					setHobbies([...hobbies, newHobby]);
					setNewHobby('');
				} else {
					setError('Problème');
				}
			});
	};

	// TODO : need to be improved
	const getSuggestions = (h) => {
		setNewHobby(h);
		//filtrer le dataSet
		const suggestions = dataSet.filter((hobby) => hobby[0] === h.toLowerCase());

		if (suggestions.length > 0) {
			setDataSet(suggestions.sort());
		}
	};

	useEffect(() => {
		(async () => {
			const URL = `${URL_EXPO}:3000/hobbies`;

			const response = await fetch(URL);
			const data = await response.json();

			if (!data.result) return;

			const hobbiesList = data.hobbiesList?.map((el) => el.replace('_', ' '));

			setDataSet(hobbiesList.sort());
		})();
	}, [hobbies]);

	return (
		<>
			<View style={styles.container}>
				<Input
					label="Mes hobbies"
					theme={COLORS_THEME.dark}
					autoFocus={false}
					autoCapitalize="none"
					keyboardType="default"
					onChangeText={(value) => {
						getSuggestions(value);
					}}
					value={newHobby}
					handleFocus={() => setIsActive(!isActive)}
					// handleBlur={() => setIsActive(false)}
				/>
				<ButtonIcon
					type="secondary"
					size={18}
					name="add-outline"
					onpress={() => {
						handleNewHobby();
						setIsActive(false);
					}}
				/>
			</View>
			<View style={styles.listContainer}>
				{isActive && (
					<FlatList
						data={dataSet}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									addHobby(item);
									setIsActive(!isActive);
									// setNewHobby('');
								}}
								style={styles.btn}
								activeOpacity={0.8}>
								<Text style={{ fontSize: 16, color: COLORS.bg }}>{item}</Text>
							</TouchableOpacity>
						)}
						contentContainerStyle={styles.containerStyle}
					/>
				)}
			</View>

			{hobbies.length > 0 && (
				<View style={styles.hobbiesContainer}>
					{hobbies.map((el, i) => (
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
		width: '100%',
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
