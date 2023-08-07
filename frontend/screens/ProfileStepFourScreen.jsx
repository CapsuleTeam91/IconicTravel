import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import Button from '../components/buttons/Button';
import ButtonIcon from '../components/buttons/ButtonIcon';

const ProfileStepFourScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.firstTopLayer}>
				<View style={styles.secondTopLayer}></View>
			</View>

			<View style={styles.middleLayer}>
				<Text style={[STYLES_GLOBAL.title, styles.title]}>Bienvenue</Text>
				<View styles={styles.textContainer}>
					<Text style={[STYLES_GLOBAL.subTitle, styles.subTitle]}>
						Vous avez achevé la création de votre profil d'Iconic Traveler !
					</Text>
					<Text style={styles.text}>
						Bienvenue dans notre Iconic Community. C'est un endroit qui permet
						de rencontrer des nouvelles personnes et de créer des liens. Nous
						vous demandons d'être respectueux et de respecter les règles de la
						communauté. Au plaisir !
					</Text>
				</View>

				<Button
					type="primary"
					label="Be Iconic Now !"
					onpress={() =>
						navigation.navigate('TabNavigator', { screen: 'Search' })
					}
				/>
			</View>
			<View style={styles.bottomLayer}>
				<ButtonIcon
					type="secondary"
					name="information-circle-outline"
					onpress={() => {
						navigation.navigate('About');
					}}
				/>
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.lightBlue,
	},
	textContainer: {
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
	},
	subTitle: {
		padding: 20,
		paddingBottom: 0,
		textAlign: 'center',
		color: COLORS.lightBlue,
	},
	text: {
		lineHeight: 22,
		textAlign: 'justify',
		padding: 40,
		fontSize: 16,
	},
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
		height: '20%',
		backgroundColor: COLORS.bg,
	},
	secondTopLayer: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.lightBlue,
		borderBottomLeftRadius: 100,
	},
	middleLayer: {
		flexGrow: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.bg,
		borderTopRightRadius: 100,
		borderBottomRightRadius: 80,
		borderBottomLeftRadius: 80,
	},
	bottomLayer: {
		width: '100%',
		height: '15%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.lightBlue,
	},
});

export default ProfileStepFourScreen;
