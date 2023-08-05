import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../utils/styles';
import { LANGUAGES_ISO } from '../../utils/data';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownLanguage = ({
	spokenLanguages,
	setSpokenLanguages,
	isEditable = true,
}) => {
	const getSelectedLanguages = (language) => {
		if (!language?.title) return;
		// add language only if not already in the list
		const ISO = LANGUAGES_ISO[language.title];
		const languages = spokenLanguages.includes(ISO)
			? spokenLanguages
			: [...spokenLanguages, ISO];
		setSpokenLanguages(languages);
	};

	const RemoveLanguage = (el) => {
		const languages = spokenLanguages.filter((language) => language !== el);
		setSpokenLanguages(languages);
	};

	return (
		<>
			{isEditable && (
				<Dropdown
					style={styles.dropdown}
					placeholderStyle={styles.placeholderStyle}
					selectedTextStyle={styles.selectedTextStyle}
					containerStyle={styles.containerStyle}
					itemTextStyle={styles.itemTextStyle}
					data={Object.keys(LANGUAGES_ISO)?.map((el, i) => ({
						id: i,
						title: el,
					}))}
					maxHeight={100}
					labelField="title"
					valueField="id"
					placeholder="Langues parlées"
					value={'Langues parlées'}
					onChange={(item) => getSelectedLanguages(item)}
					mode="modal"
				/>
			)}

			{spokenLanguages.length > 0 && (
				<View style={styles.languagesContainer}>
					{spokenLanguages.map((el, i) => (
						<TouchableOpacity key={i} onPress={() => RemoveLanguage(el)}>
							<Text style={styles.language}>{el}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	languagesContainer: {
		width: '70%',
		marginVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	language: {
		fontWeight: '700',
		color: COLORS.darkBlue,
		backgroundColor: COLORS.bg,
		paddingHorizontal: 10,
		margin: 5,
		borderRadius: 25,
	},
	dropdown: {
		// height: 50,
		width: '70%',
		borderRadius: 8,
		color: COLORS.bg,
		paddingVertical: 3,
		paddingHorizontal: 10,
		backgroundColor: COLORS.bgDark,
	},
	placeholderStyle: {
		color: COLORS.bg,
		paddingHorizontal: 5,
	},
	selectedTextStyle: {
		fontSize: 16,
		color: COLORS.bg,
	},
	containerStyle: {
		maxHeight: 300,
		paddingTop: 15,
		borderRadius: 8,
		backgroundColor: COLORS.lightBlue,
	},
	itemTextStyle: {
		marginTop: -15,
		paddingBottom: 15,
		letterSpacing: 1,
		fontWeight: '700',
		textAlign: 'center',
		color: COLORS.bgDark,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.bg,
	},
});

export default DropdownLanguage;
