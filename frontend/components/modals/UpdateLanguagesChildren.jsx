import { StyleSheet, View } from 'react-native';
import ButtonIcon from '../buttons/ButtonIcon';
import DropdownLanguage from '../forms/DropdownLanguage';

export const UpdateLanguagesChildren = ({
	spokenLanguages,
	setSpokenLanguages,
	handleUpdate,
	setUpdateLanguagesVisible,
}) => {
	return (
		<View style={styles.inputContainer}>
			<DropdownLanguage
				spokenLanguages={spokenLanguages}
				setSpokenLanguages={setSpokenLanguages}
			/>

			<View style={styles.optionsContainer}>
				<ButtonIcon
					type="secondary"
					size={18}
					name="arrow-back-outline"
					onpress={() => {
						setUpdateLanguagesVisible(false);
					}}
				/>
				<ButtonIcon
					type="primary"
					size={18}
					name="checkmark-outline"
					onpress={() => {
						handleUpdate({ spokenLanguages });
						setUpdateLanguagesVisible(false);
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	optionsContainer: {
		width: Platform.OS === 'ios' ? '70%' : '80%',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});
