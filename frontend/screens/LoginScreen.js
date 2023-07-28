import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StrokeAnimation from '../components/StrokeAnimation';
import Button from '../components/Button';

export default function LoginScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Iconic Travel</Text>
			<StrokeAnimation />
			<Button
				type="primary"
				label="Se connecter"
				onpress={() => navigation.navigate('Signin')}
			/>
			<Button
				type="secondary"
				label="Créer un compte"
				onpress={() => navigation.navigate('Signup')}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F8F9FA',
	},
	title: {
		color: '#073B4C',
		fontSize: 32,
		fontWeight: '700',
		textTransform: 'uppercase',
	},
	btn: {
		width: '70%',
		alignItems: 'center',
		borderRadius: 30,
		paddingVertical: 15,
		marginVertical: 20,
	},
	btnPrimary: {
		backgroundColor: '#073B4C',
	},
	btnSecondary: {
		borderWidth: 1,
		borderColor: '#073B4C',
		backgroundColor: '#F8F9FA',
	},
	textBtnPrimary: {
		color: '#FFFF',
		fontWeight: '700',
		fontSize: 18,
	},
	textBtnSecondary: {
		color: '#073B4C',
		fontWeight: '700',
		fontSize: 18,
	},
});
