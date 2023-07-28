import { useEffect, useRef, useState } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Animated,
	Easing,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { COLORS } from '../utils/styles';
import { COLORS_THEME, SIGN_VIEW } from '../utils/constants';

const SigninScreen = ({ view = SIGN_VIEW.in }) => {
	const translateAnim = useRef(new Animated.Value(0)).current;
	const [signView, setSignView] = useState(view);
	const [emailIn, setEmailIn] = useState('');
	const [passwordIn, setPasswordIn] = useState('');
	const [username, setUsername] = useState('');
	const [familyName, setFamilyName] = useState('');
	const [emailUp, setEmailUp] = useState('');
	const [passwordUp, setPasswordUp] = useState('');
	const [confirmedPasswordUp, setConfirmedPasswordUp] = useState('');

	useEffect(() => {
		Animated.timing(translateAnim, {
			toValue: signView === SIGN_VIEW.up ? -700 : -10,
			duration: 1000,
			easing: Easing.bounce,
			useNativeDriver: true, //makes animations run on the UI thread
		}).start();
	}, [translateAnim, signView]);

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<Animated.View
					style={[
						styles.signContainer,
						styles.signinContainer,
						{
							transform: [{ translateY: translateAnim }], // Bind translateY to animated value
						},
					]}>
					<Text style={[styles.title, styles.titleDark]}>CONNECTION</Text>

					<View style={styles.inputContainer}>
						<Input
							label="Email"
							theme={COLORS_THEME.light}
							autoFocus={true}
							autoCapitalize="none"
							keyboardType="email-address"
							autoComplete="email"
							onChangeText={(value) => setEmailIn(value)}
							value={emailIn}
						/>
						<Input
							label="Mot de passe"
							theme={COLORS_THEME.light}
							autoFocus={false}
							autoCapitalize="none"
							secureTextEntry={true}
							onChangeText={(value) => setPasswordIn(value)}
							value={passwordIn}
						/>
					</View>
					<Button
						onpress={() => {
							console.log('Se connecter');
						}}
						label="Se connecter"
						type="primary"
					/>
				</Animated.View>

				<View style={styles.signContainer}>
					<Text style={[styles.title, styles.titleLight]}>INSCRIPTION</Text>

					<View style={styles.inputContainer}>
						<Input
							label="Prénom"
							theme={COLORS_THEME.dark}
							autoFocus={true}
							autoCapitalize="none"
							keyboardType="default"
							onChangeText={(value) => setUsername(value)}
							value={username}
						/>
						<Input
							label="Nom"
							theme={COLORS_THEME.dark}
							autoFocus={false}
							autoCapitalize="none"
							keyboardType="default"
							onChangeText={(value) => setFamilyName(value)}
							value={familyName}
						/>
						<Input
							label="Email"
							theme={COLORS_THEME.dark}
							autoFocus={false}
							autoCapitalize="none"
							keyboardType="email-address"
							autoComplete="email"
							onChangeText={(value) => setEmailUp(value)}
							value={emailUp}
						/>
						<Input
							label="Mot de passe"
							theme={COLORS_THEME.dark}
							autoFocus={false}
							autoCapitalize="none"
							secureTextEntry={true}
							onChangeText={(value) => setPasswordUp(value)}
							value={passwordUp}
						/>
						<Input
							label="Confirmer le mot de passe"
							theme={COLORS_THEME.dark}
							autoFocus={false}
							autoCapitalize="none"
							secureTextEntry={true}
							onChangeText={(value) => setConfirmedPasswordUp(value)}
							value={confirmedPasswordUp}
						/>
					</View>
					<Button
						type="secondary"
						label="Créer un compte"
						onpress={() => {
							console.log('Créer un compte');
						}}
					/>
				</View>

				<View>
					<Text style={styles.textLight}>
						{signView === SIGN_VIEW.in
							? 'Pas encore de compte ?'
							: 'Vous avez déjà un compte ?'}
					</Text>
					<TouchableOpacity
						onPress={() =>
							setSignView(
								signView === SIGN_VIEW.in ? SIGN_VIEW.up : SIGN_VIEW.in
							)
						}
						activeOpacity={0.8}>
						<Text style={styles.link}>
							{signView === SIGN_VIEW.in ? 'Créer compte' : 'Se connecter'}
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: COLORS.darkBlue,
	},
	signinContainer: {
		...StyleSheet.absoluteFillObject,
		zIndex: 2,
		backgroundColor: COLORS.bg,
		borderBottomLeftRadius: 80,
		borderBottomRightRadius: 80,
	},
	signContainer: {
		width: '100%',
		height: 700,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputContainer: {
		width: '100%',
		borderRadius: 1,
		marginVertical: 20,
		alignItems: 'center',
	},
	title: {
		fontSize: 32,
		fontWeight: '700',

		color: COLORS.darkBlue,
		textTransform: 'uppercase',
	},
	titleDark: {
		color: COLORS.darkBlue,
		marginVertical: 40,
	},
	titleLight: {
		color: COLORS.bg,
		marginTop: 80,
		marginBottom: 20,
	},
	textLight: {
		padding: 15,
		fontSize: 18,
		color: COLORS.bg,
	},
	link: {
		fontSize: 20,
		fontWeight: '700',
		color: COLORS.pink,
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
});

export default SigninScreen;
