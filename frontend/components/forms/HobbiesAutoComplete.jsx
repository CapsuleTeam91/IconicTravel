import { COLORS } from '../../utils/styles';
import { URL_EXPO } from '../../utils/constants';
import React, { useState, useEffect } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MultiSelectComponent = ({ hobbies, setHobbies, setError }) => {
	const [selected, setSelected] = useState([]);
	const [dataSet, setDataSet] = useState([]);

	useEffect(() => {
		(async () => {
			const URL = `${URL_EXPO}/hobbies`;

			const response = await fetch(URL);
			const data = await response.json();

			if (!data.result) return;

			const hobbiesList = data.hobbiesList?.map((el, i) => ({
				label: el.replace('_', ' '),
				value: el.replace('_', ' '),
			}));

			setDataSet(hobbiesList);
		})();
	}, [hobbies]);

	return (
		<View style={styles.container}>
			<MultiSelect
				maxHeight={210}
				style={styles.dropdown}
				containerStyle={styles.containerStyle}
				placeholderStyle={styles.placeholderStyle}
				selectedTextStyle={styles.selectedTextStyle}
				inputSearchStyle={styles.inputSearchStyle}
				data={dataSet}
				labelField="label"
				valueField="value"
				placeholder="Selectionnez vos hobbies"
				value={selected}
				search
				searchPlaceholder="Chercher..."
				onChange={(item) => {
					if (item.length <= 5) {
						setSelected(item);
						setHobbies([...item]);
					} else {
						setError('Maximum 5 hobbies baby');
					}
				}}
				renderLeftIcon={() => (
					<Ionicons
						style={styles.icon}
						color={COLORS.bg}
						name="heart-outline"
						size={20}
					/>
				)}
				renderItem={(item) => (
					<View style={styles.item}>
						<Text style={styles.selectedTextStyle}>{item.label}</Text>
					</View>
				)}
				renderSelectedItem={(item, unSelect) => (
					<TouchableOpacity onPress={() => unSelect && unSelect(item)}>
						<View style={styles.selectedStyle}>
							<Text style={styles.textSelectedStyle}>{item.label}</Text>
							<Ionicons
								color={COLORS.darkBlue}
								name="close-outline"
								size={20}
							/>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
	container: {
		width: '80%',
	},
	dropdown: {
		height: 48,
		width: '100%',
		padding: 12,
		borderRadius: 8,
		backgroundColor: COLORS.bgDark,
	},
	containerStyle: {
		borderRadius: 8,
		backgroundColor: COLORS.bgDark,
	},
	placeholderStyle: {
		fontSize: 16,
		color: COLORS.bg,
	},
	selectedTextStyle: {
		fontSize: 14,
		color: COLORS.lightBlue,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
		borderRadius: 8,
		color: COLORS.bg,
	},
	icon: {
		marginRight: 10,
	},
	item: {
		padding: 17,
		borderColor: COLORS.lightBlue,
		borderWidth: 0,
		borderBottomWidth: 1,
	},
	selectedStyle: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 8,
		marginRight: 12,
		borderRadius: 25,
		paddingVertical: 8,
		paddingHorizontal: 12,
		backgroundColor: COLORS.bg,
	},
	textSelectedStyle: {
		fontSize: 16,
		marginRight: 5,
		color: COLORS.darkBlue,
	},
});
