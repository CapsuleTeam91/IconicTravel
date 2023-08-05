import { StyleSheet, Text, View } from 'react-native';
import { COLORS, STYLES_GLOBAL } from '../../utils/styles';

const HeaderCreateProfile = ({ step }) => {
	return (
		<>
			<View style={styles.firstTopLayer}>
				<View
					style={[
						styles.secondTopLayer,
						{
							borderBottomLeftRadius: step === 1 ? 100 : 0,
							borderBottomRightRadius: step === 3 ? 100 : 0,
						},
					]}>
					<Text style={STYLES_GLOBAL.subTitleLight}>Etape {step}/3</Text>
					<View style={[styles.layer, styles.firstLayer]}>
						<View
							style={[
								styles.layer,
								styles.secondLayer,
								{ width: step === 1 ? '33%' : step === 2 ? '67%' : '100%' },
							]}></View>
					</View>
				</View>
			</View>
			<Text style={[STYLES_GLOBAL.title, STYLES_GLOBAL.titleLight]}>
				Création de votre profil
			</Text>
		</>
	);
};

const styles = StyleSheet.create({
	layer: {
		height: 7,
		borderRadius: 25,
	},
	firstLayer: {
		width: '70%',
		marginTop: 5,
		backgroundColor: COLORS.bg,
	},
	secondLayer: {
		backgroundColor: COLORS.bgDark,
	},
	firstTopLayer: {
		width: '100%',
		height: 80,
		backgroundColor: COLORS.darkBlue,
	},
	secondTopLayer: {
		width: '100%',
		height: 80,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.lightBlue,
	},
});

export default HeaderCreateProfile;
