import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';

const ProfileStepFourScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={[STYLES_GLOBAL.title, styles.title]}>Bienvenue</Text>

			<View styles={styles.text2}>
			<Text style={[STYLES_GLOBAL.subTitle, styles.text3]}>
				Vous avez achevé la création de votre profil d'Iconic Traveler !
			</Text>
			<Text style={styles.welcome}>
				Bienvenue dans notre Iconic Community. 
				C'est un endroit qui permet de rencontrer des nouvelles personnes et de créer des liens.
				Nous vous demandons d'être respectueux et de respecter les règles de la communauté. 
				Au plaisir !
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
					navigation.navigate('About')
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

	title: {
		marginTop: 70,
	},

	text2: {
		alignItems: 'center',
		textAlign: 'justify',
		marginTop: 70,
	},

	text3:  {
		alignItems: 'center',
		padding: 10,
		textAlign: 'center',
	},

	welcome:{
		alignItems: 'center',
		textAlign: 'justify',
		padding: 20,
		paddingTop: 50,
		fontSize: 17,
	},
});

export default ProfileStepFourScreen;
