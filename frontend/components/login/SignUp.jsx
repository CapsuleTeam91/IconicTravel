import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from '../../reducers/user';
import { checkDOB } from '../../utils/helper';
import { StyleSheet, Text, View } from 'react-native';
import { EMAIL_REGEX, ERRORS } from '../../utils/constants';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../../utils/styles';
import Input from '../forms/Input';
import Button from '../buttons/Button';
import PasswordInput from '../forms/PasswordInput';
import DatePicker from '../forms/DatePicker';

const SignUp = (props) => {
	const dispatch = useDispatch();
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [error, setError] = useState('');

	const handleRegister = () => {
		setError(''); // reset previous errors

		// check inputs fields content
		if (
			!firstname ||
			!lastname ||
			!dateOfBirth ||
			!email ||
			!password ||
			!confirmedPassword
		) {
			setError(ERRORS.err403);
			return;
		} else if (checkDOB(dateOfBirth)) {
			setError('18 ans ou plus');
			return;
		} else if (!EMAIL_REGEX.test(email)) {
			setError(ERRORS.invalidEmailFormat);
			return;
		} else if (password !== confirmedPassword) {
			setError(ERRORS.difPassword);
			return;
		}

		// save datas in store
		dispatch(
			addData({
				firstname,
				lastname,
				dateOfBirth,
				email,
				password,
			})
		);

		// reset inputs fields
		setFirstname('');
		setLastname('');
		setDateOfBirth(new Date());
		setEmail('');
		setPassword('');
		setConfirmedPassword('');

		// go to next step
		props.navigate();
	};

	return (
		<View style={styles.container}>
			<View style={styles.firstTopLayer}>
				<View style={styles.secondTopLayer}></View>
			</View>
			<View style={styles.signContainer}>
				<Text style={[STYLES_GLOBAL.title, STYLES_GLOBAL.titleLight]}>
					INSCRIPTION
				</Text>
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
						theme={COLORS_THEME.dark}
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
						onChangeText={(value) => setEmail(value)}
						value={email}
					/>
					<PasswordInput
						label="Mot de passe"
						width="100%"
						theme={COLORS_THEME.dark}
						onchangetext={(value) => setPassword(value)}
						value={password}
					/>
					<PasswordInput
						label="Confirmer le mot de passe"
						width="100%"
						theme={COLORS_THEME.dark}
						onchangetext={(value) => setConfirmedPassword(value)}
						value={confirmedPassword}
					/>
				</View>
				{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}

				<Button
					type="secondary"
					size="big"
					label="Créer un compte"
					onpress={handleRegister}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '86%',
		alignItems: 'center',
		backgroundColor: COLORS.lightBlue,
	},
	signContainer: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
		backgroundColor: COLORS.darkBlue,
		borderTopLeftRadius: 100,
		borderBottomLeftRadius: 80,
		borderBottomRightRadius: 80,
	},
	inputContainer: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	firstTopLayer: {
		width: '100%',
		height: 80,
		backgroundColor: COLORS.darkBlue,
	},
	secondTopLayer: {
		width: '100%',
		height: 80,
		backgroundColor: COLORS.lightBlue,
		borderBottomRightRadius: 100,
	},
});

export default SignUp;
