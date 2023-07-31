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
import { COLORS_THEME, COLORS } from '../utils/styles';
import { ERRORS, SIGN_VIEW } from '../utils/constants';
import DatePicker from '../components/DatePicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordInput from '../components/PasswordInput';

const SigninScreen = ({ navigation, view = SIGN_VIEW.in }) => {
	const translateAnim = useRef(new Animated.Value(0)).current;
	const [signView, setSignView] = useState(view);
	const [emailIn, setEmailIn] = useState('');
	const [passwordIn, setPasswordIn] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [errorIn, setErrorIn] = useState('');

	const [dateOB, setDateOB] = useState(new Date());
	const [emailUp, setEmailUp] = useState('');
	const [passwordUp, setPasswordUp] = useState('');
	const [confirmedPasswordUp, setConfirmedPasswordUp] = useState('');

	const handleConnection = () => {
		setErrorIn(''); // reset previous errors

		// check inputs fileds content
		if (!emailIn || !passwordIn) {
			setErrorIn(ERRORS.err403);
			return;
		} else if (!EMAIL_REGEX.test(emailIn)) {
			setErrorIn(ERRORS.invalidEmailFormat);
			return;
		}

		// send request for authentication
		fetch(`${URL_EXPO}:3000/users/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: emailIn,
				password: passwordIn,
			}),
		})
			.then((response) =>
				response.status > 400 ? response.status : response.json()
			)
			.then((data) => {
				if (typeof data === 'number') {
					setErrorIn(ERRORS[`err${data}`]);
					return;
				}

				if (data.result) {
					console.log('token: ', data.token);
					// dispatch(login({ token: data.token }));
					setEmailIn('');
					setPasswordIn('');
					navigation.navigate('TabNavigator', { screen: 'Search' });
				} else {
					setErrorIn(ERRORS[`err${data.status}`]);
				}
			});
	};

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
				{/* <SafeAreaView> */}
				<Animated.View
					style={[
						styles.signContainer,
						styles.signinContainer,
						{
							transform: [{ translateY: translateAnim }], // Bind translateY to animated value
						},
					]}>
					<Text style={[STYLES_GLOBAL.title, styles.titleDark]}>
						CONNECTION
					</Text>

					<View style={styles.inputContainer}>
						<Input
							label="Email"
							theme={COLORS_THEME.light}
							autoFocus={false}
							autoCapitalize="none"
							keyboardType="email-address"
							autoComplete="email"
							onChangeText={(value) => setEmailIn(value)}
							value={emailIn}
						/>
						{/* <Input
							label="Mot de passe"
							theme={COLORS_THEME.light}
							autoFocus={false}
							autoCapitalize="none"
							secureTextEntry={true}
							onChangeText={(value) => setPasswordIn(value)}
							value={passwordIn}
						/> */}
						<PasswordInput
							label="Mot de passe"
							theme={COLORS_THEME.light}
							onchangetext={(value) => setPasswordIn(value)}
							value={passwordIn}
						/>
					</View>
					{errorIn && <Text style={STYLES_GLOBAL.error}>{errorIn}</Text>}

					<Button
						type="primary"
						label="Se connecter"
						onpress={handleConnection}
					/>
				</Animated.View>

				<View style={styles.signContainer}>
					<Text style={[styles.title, styles.titleLight]}>INSCRIPTION</Text>

					<View style={styles.inputContainer}>
						<Input
							label="Prénom"
							theme={COLORS_THEME.dark}
							autoFocus={false}
							autoCapitalize="none"
							keyboardType="default"
							onChangeText={(value) => setFirstname(value)}
							value={firstname}
						/>
						<Input
							label="Nom"
							theme={COLORS_THEME.dark}
							autoFocus={false}
							autoCapitalize="none"
							keyboardType="default"
							onChangeText={(value) => setLastname(value)}
							value={lastname}
						/>

						<DatePicker
							date={dateOB}
							label={
								dateOB.toLocaleDateString() !== new Date().toLocaleDateString()
									? dateOB.toLocaleDateString()
									: 'Date de naissance'
							}
							onconfirm={(date) => setDateOB(date)}
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
				{/* </SafeAreaView> */}
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
