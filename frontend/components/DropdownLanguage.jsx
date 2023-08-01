import React, { useCallback } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Keyboard,
	TouchableOpacity,
} from 'react-native';
import { COLORS } from '../utils/styles';
import { LANGUAGES_ISO } from '../utils/data';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

const DropdownLanguage = ({ spokenLanguages, setSpokenLanguages }) => {
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
			<AutocompleteDropdown
				clearOnFocus={true}
				readOnly={true}
				closeOnBlur={false}
				closeOnSubmit={false}
				onOpenSuggestionsList={useCallback((isOpened) => {
					Keyboard.dismiss();
				}, [])}
				direction={Platform.select({ ios: 'down' })}
				textInputProps={{
					color: COLORS.bg,
					placeholder: 'Langues parlées',
				}}
				onSelectItem={(item) => getSelectedLanguages(item)}
				dataSet={Object.keys(LANGUAGES_ISO)?.map((el, i) => ({
					id: i,
					title: el,
				}))}
				inputContainerStyle={{
					width: '70%',
					color: COLORS.bg,
					borderRadius: 8,
					backgroundColor: COLORS.bgDark,
				}}
				suggestionsListContainerStyle={{
					backgroundColor: COLORS.lightBlue,
				}}
				suggestionsListTextStyle={{
					color: COLORS.bgDark,
					fontWeight: '700',
					letterSpacing: 1,
				}}
			/>

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
});

export default DropdownLanguage;
