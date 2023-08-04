import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ButtonIcon from '../components/ButtonIcon';
import { STYLES_GLOBAL } from '../utils/styles';

const LegalScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={[STYLES_GLOBAL.subTitle, styles.title]}>Juridique</Text>
			<View style={styles.juridique}>
				<Text style={styles.text1}>
					Quel fruit porte une robe noire ?
				</Text>
				<Text style={styles.reponse}>
					Un avocat
				</Text>
				<Text style={styles.text2}>
					N'hésitez pas à nous envoyer un message en cas de problème. 
				</Text>
			</View>

			<ButtonIcon
				type="secondary"
				name="arrow-undo-outline"
				onpress={() => {
					navigation.navigate('TabNavigator', { screen: 'Settings' });
				}}
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

	juridique: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'justify',
    },
	
	text1: {
		marginBottom: 30,
	},

	reponse: {
		marginBottom: 30,
	},

});

export default LegalScreen;
