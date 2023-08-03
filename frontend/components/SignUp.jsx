import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from '../reducers/user';
import { StyleSheet, Text, View } from 'react-native';
import { EMAIL_REGEX, ERRORS } from '../utils/constants';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
import Input from './Input';
import Button from './Button';
import PasswordInput from './PasswordInput';
import DatePicker from '../components/DatePicker';

const SignUp = (props) => {
	const dispatch = useDispatch();
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [error, setError] = useState('');

	const checkDOB = (dob) => {
		var ageDifMs = Date.now() - dob;
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970) <= 18;
	};

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
						dateOfBirth.toLocaleDateString() !== new Date().toLocaleDateString()
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
	);
};

const styles = StyleSheet.create({
	signContainer: {
		width: '100%',
		height: 700,
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputContainer: {
		width: '100%',
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default SignUp;
