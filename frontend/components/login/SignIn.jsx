import React, { useEffect, useRef, useState } from 'react';
import { Easing } from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { addData } from '../../reducers/user';
import { StyleSheet, Text, Animated, View } from 'react-native';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../../utils/styles';
import { EMAIL_REGEX, ERRORS, SIGN_VIEW } from '../../utils/constants';
import { URL_EXPO } from '../../environnement';
import Input from '../forms/Input';
import Button from '../Button';
import PasswordInput from '../forms/PasswordInput';

const SignIn = (props) => {
	const dispatch = useDispatch();
	const translateAnim = useRef(new Animated.Value(0)).current;
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [password, setPassword] = useState('');

	const handleConnection = () => {
		setError(''); // reset previous errors

		// check inputs fileds content
		if (!email || !password) {
			setError(ERRORS.err403);
			return;
		} else if (!EMAIL_REGEX.test(email)) {
			setError(ERRORS.invalidEmailFormat);
			return;
		}

		// send request for authentication
		fetch(`${URL_EXPO}:3000/users/signin`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((response) =>
				response.status > 400 ? response.status : response.json()
			)
			.then((userFound) => {
				if (typeof userFound === 'number') {
					setError(ERRORS[`err${userFound}`]);
					return;
				}

				if (userFound.result) {
					const {
						firstname,
						lastname,
						dateOfBirth,
						email,
						token,
						avatarUrl,
						description,
						city,
						spokenLanguages,
						hobbies,
						travels,
					} = userFound.data;
					dispatch(
						addData({
							firstname,
							lastname,
							dateOfBirth,
							email,
							token,
							avatarUrl,
							description,
							city,
							spokenLanguages,
							hobbies,
							travels,
						})
					);
					setEmail('');
					setPassword('');
					props.navigate();
				} else {
					setError(ERRORS[`err${userFound.status}`]);
				}
			});
	};

	useEffect(() => {
		Animated.timing(translateAnim, {
			toValue: props.signView === SIGN_VIEW.up ? -800 : 0,
			duration: 1000,
			easing: Easing.bounce,
			useNativeDriver: true, //makes animations run on the UI thread
		}).start();
	}, [translateAnim, props.signView]);

	return (
		<Animated.View
			style={[
				styles.container,

				{
					transform: [{ translateY: translateAnim }], // Bind translateY to animated value
				},
			]}>
			<View style={styles.firstTopLayer}>
				<View style={styles.secondTopLayer}></View>
			</View>
			<View style={styles.wrapper}>
				<Text style={[STYLES_GLOBAL.title, styles.titleDark]}>CONNECTION</Text>

				<View style={styles.inputContainer}>
					<Input
						label="Email"
						theme={COLORS_THEME.light}
						autoFocus={false}
						autoCapitalize="none"
						keyboardType="email-address"
						autoComplete="email"
						onChangeText={(value) => setEmail(value)}
						value={email}
					/>
					<PasswordInput
						label="Mot de passe"
						width="100%"
						theme={COLORS_THEME.light}
						onchangetext={(value) => setPassword(value)}
						value={password}
					/>
				</View>
				{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}
				<Button
					type="primary"
					size="big"
					label="Se connecter"
					onpress={handleConnection}
				/>
			</View>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		zIndex: 2,
		backgroundColor: COLORS.lightBlue,
		borderBottomLeftRadius: 80,
		borderBottomRightRadius: 80,
		width: '100%',
		height: '87.5%',
		overflow: 'hidden',
	},
	firstTopLayer: {
		width: '100%',
		height: 80,
		backgroundColor: COLORS.bg,
	},
	secondTopLayer: {
		width: '100%',
		height: 80,
		backgroundColor: COLORS.lightBlue,
		borderBottomRightRadius: 100,
	},
	wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.bg,
		borderTopLeftRadius: 100,
	},
	inputContainer: {
		width: '100%',
		marginVertical: 20,
		alignItems: 'center',
	},
	titleDark: {
		color: COLORS.darkBlue,
		marginVertical: 40,
	},
});

export default SignIn;
