import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../utils/styles';

const FooterUpdateProfile = () => {
	return (
		<View style={styles.firstTopLayer}>
			<View style={styles.secondTopLayer}></View>
		</View>
	);
};

const styles = StyleSheet.create({
	firstTopLayer: {
		width: '100%',
		height: 100,
		alignSelf: 'flex-end',
		backgroundColor: COLORS.bg,
	},
	secondTopLayer: {
		width: '100%',
		height: 100,
		borderTopLeftRadius: 100,
		backgroundColor: COLORS.darkBlue,
	},
});

export default FooterUpdateProfile;
