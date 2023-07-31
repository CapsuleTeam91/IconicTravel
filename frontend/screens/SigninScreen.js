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
import { COLORS_THEME, COLORS, STYLES_GLOBAL } from '../utils/styles';
import { EMAIL_REGEX, ERRORS, SIGN_VIEW, URL_EXPO } from '../utils/constants';
import DatePicker from '../components/DatePicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import PasswordInput from '../components/PasswordInput';
import { useDispatch } from 'react-redux';
import { addData } from '../reducers/user';

const SigninScreen = ({ navigation, view = SIGN_VIEW.in }) => {
	const dispatch = useDispatch();
	const translateAnim = useRef(new Animated.Value(0)).current;
	const [signView, setSignView] = useState(view);
	const [emailIn, setEmailIn] = useState('');
	const [passwordIn, setPasswordIn] = useState('');
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [errorIn, setErrorIn] = useState('');

	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [emailUp, setEmailUp] = useState('');
	const [passwordUp, setPasswordUp] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [errorUp, setErrorUp] = useState('');

	const checkDOB = (dob) => {
		var ageDifMs = Date.now() - dob;
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970) <= 18;
	};

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

	const handleRegister = () => {
		setErrorUp(''); // reset previous errors

		// check inputs fields content
		if (
			!firstname ||
			!lastname ||
			!dateOfBirth ||
			!emailUp ||
			!passwordUp ||
			!confirmedPassword
		) {
			setErrorUp(ERRORS.err403);
			return;
		} else if (checkDOB(dateOfBirth)) {
			setErrorUp('18 ans chaton');
			return;
		} else if (!EMAIL_REGEX.test(emailUp)) {
			setErrorUp(ERRORS.invalidEmailFormat);
			return;
		} else if (passwordUp !== confirmedPassword) {
			setErrorUp(ERRORS.difPassword);
			return;
		}

		// save datas in store
		dispatch(
			addData({
				firstname,
				lastname,
				dateOfBirth,
				email: emailUp,
				password: passwordUp,
			})
		);

		// reset inputs fields
		setFirstname('');
		setLastname('');
		setDateOfBirth(new Date());
		setEmailUp('');
		setPasswordUp('');
		setConfirmedPassword('');

		// go to next step
		navigation.navigate('ProfileStepOne');
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
							date={dateOfBirth}
							label={
								dateOfBirth.toLocaleDateString() !==
									new Date().toLocaleDateString()
									? dateOfBirth.toLocaleDateString()
									: 'Date de naissance'
							}
							onconfirm={(date) => setDateOfBirth(date)}
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
						{/* <Input
							label="Mot de passe"
							theme={COLORS_THEME.dark}
							autoFocus={false}
							autoCapitalize="none"
							secureTextEntry={true}
							onChangeText={(value) => setPasswordUp(value)}
							value={passwordUp}
						/> */}
						<PasswordInput
							label="Mot de passe"
							theme={COLORS_THEME.dark}
							onchangetext={(value) => setPasswordUp(value)}
							value={passwordUp}
						/>
						<PasswordInput
							label="Confirmer le mot de passe"
							theme={COLORS_THEME.dark}
							onchangetext={(value) => setConfirmedPassword(value)}
							value={confirmedPassword}
						/>
						{/* <Input
							label="Confirmer le mot de passe"
							theme={COLORS_THEME.dark}
							autoFocus={false}
							autoCapitalize="none"
							secureTextEntry={true}
							onChangeText={(value) => setConfirmedPasswordUp(value)}
							value={confirmedPasswordUp}
						/> */}
					</View>
					{errorUp && <Text style={STYLES_GLOBAL.error}>{errorUp}</Text>}

					<Button
						type="secondary"
						label="Créer un compte"
						onpress={handleRegister}
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
