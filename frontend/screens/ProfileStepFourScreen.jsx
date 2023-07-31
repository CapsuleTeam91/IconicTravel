import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';

const ProfileStepFourScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={STYLES_GLOBAL.title}>Félicitations et bienvenue</Text>
			<Text style={[STYLES_GLOBAL.subTitle]}>
				Vous avez achevé la création de votre profil d'Iconic Traveler !
			</Text>

			<Text>
				Vous faîtes désormais partie de notre Iconic community, merci de
				respecter les genres, religions ...
			</Text>
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
					console.log('Ici un lien vers un à propos');
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
});

export default ProfileStepFourScreen;
