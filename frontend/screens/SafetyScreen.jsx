import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ButtonIcon from '../components/ButtonIcon';
import Button from '../components/Button';
import { STYLES_GLOBAL } from '../utils/styles';

const SafetyScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={[STYLES_GLOBAL.subTitle, styles.title]}>Connexion et Sécurité</Text>

			<View style={styles.mdpContainer}>
				<Text style={styles.mdp}>
					Mot de passe
				</Text>
				<Button
					type="primary"
					label="Changer le mot de passe"
					onpress={() => navigation.navigate('')}
				/>
			</View>

			<View style={styles.compteContainer}>
				<Text style={styles.compte}>
					Compte
				</Text>
				<View style={styles.connexion}>
					<Button
						type="primary"
						label="Désactiver le compte"
						onpress={() => navigation.navigate('')}
					/>
					<Button
						type="primary"
						label="Supprimer le compte"
						onpress={() => navigation.navigate('')}
					/>
				</View>
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
		justifyContent: 'space-between',
	},

	title: {
		marginTop: 70,
	},

	mdpContainer: {
		borderColor: 'red',
		borderWidth: 2,
		width: '100%',
		alignItems: 'center',
	},

	mdp: {
		textAlign: 'left',
		alignSelf: 'flex-start',
		marginLeft: 20,
		fontSize: '20'
	},

	compteContainer: {
		borderColor: 'red',
		borderWidth: 2,
		width: '100%',
		alignItems: 'center',
	},

	compte: {
		textAlign: 'left',
		alignSelf: 'flex-start',
		marginLeft: 20,
		fontSize: '20'
	}



});

export default SafetyScreen;
