import { StyleSheet, View } from 'react-native';
import { COLORS_THEME } from '../../utils/styles';
import ButtonIcon from '../ButtonIcon';
import Textarea from '../forms/Textarea';

export const UpdateDescriptionChildren = ({
	user,
	description,
	setDescription,
	handleUpdate,
	setUpdateDescriptionVisible,
}) => {
	return (
		<View style={styles.inputContainer}>
			<Textarea
				label={description ? '' : 'Description'}
				theme={COLORS_THEME.light}
				autoFocus={false}
				onChangeText={(value) => setDescription(value)}
				value={description}
			/>

			<View style={styles.optionsContainer}>
				<ButtonIcon
					type="secondary"
					size={18}
					name="arrow-back-outline"
					onpress={() => {
						setUpdateDescriptionVisible(false);
						setDescription('');
					}}
				/>
				<ButtonIcon
					type="primary"
					size={18}
					name="checkmark-outline"
					onpress={() => {
						handleUpdate({
							description: description || user.description,
						});
						setDescription('');
						setUpdateDescriptionVisible(false);
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
