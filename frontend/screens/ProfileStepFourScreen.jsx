import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';

const ProfileStepFourScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={[STYLES_GLOBAL.title, styles.title]}>Bienvenue</Text>

			<View styles={styles.textContainer}>
				<Text style={[STYLES_GLOBAL.subTitle, styles.subTitle]}>
					Iconic Traveler !
				</Text>
				<Text style={styles.text}>
					Tu fais désormais parti de notre notre Iconic Community. Cette application permet de
					rencontrer de nouvelles personnes et de créer des liens. Nous vous
					demandons juste de respecter les règles de
					bienséance. Au plaisir !
				</Text>
			</View>

			<Button
				type="primary"
				label="Be Iconic Now !"
				onpress={() =>
					navigation.navigate('TabNavigator', { screen: 'Search' })
				}
			/>

			<ButtonIcon
				type="secondary"
				name="information-circle-outline"
				onpress={() => {
					navigation.navigate('About');
				}}
			/>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.bg,
	},
	textContainer: {
		marginTop: 70,
		alignItems: 'center',
	},
	title: {
		marginTop: 70,
	},
	subTitle: {
		padding: 10,
		textAlign: 'center',
	},
	text: {
		alignItems: 'center',
		textAlign: 'justify',
		padding: 20,
		paddingTop: 50,
		fontSize: 17,
	},
});

export default ProfileStepFourScreen;
