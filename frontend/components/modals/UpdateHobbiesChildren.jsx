import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import ButtonIcon from '../buttons/ButtonIcon';
import HobbiesAutoCompleteHomeMade from '../forms/HobbiesAutoCompleteHomeMade';
import MultiSelectComponent from '../forms/HobbiesAutoComplete';
import { useState } from 'react';
import { COLORS } from '../../utils/styles';

export const UpdateHobbiesChildren = ({
	hobbies,
	setHobbies,
	handleUpdate,
	error,
	setError,
	setUpdateHobbiesVisible,
}) => {
	const [isEditable, setIsEditable] = useState(false);
	return (
		<View style={styles.inputContainer}>
			<MultiSelectComponent
				hobbies={hobbies}
				setHobbies={setHobbies}
				setError={setError}
			/>

			<TouchableOpacity
				onPress={() =>
					hobbies.length === 5
						? setError(
								'Vous avez déjà choisi 5 hobbies, supprimez en pour continuer.'
						  )
						: setIsEditable(!isEditable)
				}
				activeOpacity={0.8}>
				<View style={styles.linkContainer}>
					<Text style={styles.textLight}>
						Vous n'avez pas trouvé votre bonheur ?
					</Text>

					<Text style={[styles.textLight, styles.link]}>
						Ajoutez le à notre liste
					</Text>
				</View>
			</TouchableOpacity>

			{isEditable && (
				<HobbiesAutoCompleteHomeMade
					hobbies={hobbies}
					setHobbies={setHobbies}
					setError={setError}
				/>
			)}

			{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}
			<View style={styles.optionsContainer}>
				<ButtonIcon
					type="secondary"
					size={18}
					name="arrow-back-outline"
					onpress={() => {
						setUpdateHobbiesVisible(false);
					}}
				/>
				<ButtonIcon
					type="primary"
					size={18}
					name="checkmark-outline"
					onpress={() => {
						handleUpdate({
							hobbies,
						});
						setUpdateHobbiesVisible(false);
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
		borderColor: 'red',
		borderWidth: 1,
	},
	optionsContainer: {
		width: Platform.OS === 'ios' ? '70%' : '80%',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	linkContainer: {
		width: '70%',
		height: 48,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
	},
	link: {
		marginLeft: 5,
		textDecorationLine: 'underline',
		textDecorationColor: COLORS.bg,
	},
});
