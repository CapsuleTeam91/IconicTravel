import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { STYLES_GLOBAL } from '../utils/styles';
import ButtonIcon from '../components/buttons/ButtonIcon';

const LegalScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={[STYLES_GLOBAL.subTitle, styles.title]}>Juridique</Text>

			<View style={styles.legalContainer}>
				<Text style={styles.text}>Quel fruit porte une robe noire ?</Text>
				<Text style={styles.text}>Un avocat</Text>
				<Text>N'hésitez pas à nous envoyer un message en cas de problème.</Text>
			</View>

			<ButtonIcon
				type="secondary"
				name="arrow-undo-outline"
				onpress={() =>
					navigation.navigate('TabNavigator', { screen: 'Settings' })
				}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: 20,
		justifyContent: 'space-between',
	},
	title: {
		marginTop: 70,
	},
	legalContainer: {
		flex: 1,
		textAlign: 'justify',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		marginBottom: 30,
	},
});

export default LegalScreen;
