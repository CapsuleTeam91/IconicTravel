import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../utils/styles';
import ButtonIcon from '../buttons/ButtonIcon';
import Button from '../buttons/Button';

const FooterCreateProfile = ({
	step,
	onPressBack,
	onPressNext,
	label = 'Suivant',
}) => {
	return (
		<View style={styles.firstTopLayer}>
			<View
				style={[
					styles.secondTopLayer,
					{
						borderTopLeftRadius: step === 1 ? 100 : 0,
						borderTopRightRadius: step === 3 ? 100 : 0,
					},
				]}>
				<ButtonIcon
					type="secondary"
					name="arrow-back-outline"
					onpress={onPressBack}
				/>
				<Button type="primary" label={label} onpress={onPressNext} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	firstTopLayer: {
		width: '100%',
		height: 100,
		backgroundColor: COLORS.darkBlue,
	},
	secondTopLayer: {
		width: '100%',
		height: 100,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: COLORS.lightBlue,
	},
});

export default FooterCreateProfile;
