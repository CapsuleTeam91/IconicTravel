import React, { useState } from 'react';
import { COLORS } from '../utils/styles';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Input from './Input';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PasswordInput = (props) => {
	const [passwordVisible, setPasswordVisible] = useState(true);

	return (
		<View style={styles.inputContainer}>
			<Input
				label={props.label}
				theme={props.theme}
				autoFocus={false}
				autoCapitalize="none"
				onChangeText={props.onchangetext}
				value={props.value}
				secureTextEntry={passwordVisible}
			/>
			<TouchableOpacity
				onPress={() => setPasswordVisible(!passwordVisible)}
				activeOpacity={0.8}
				style={styles.btnContainer}>
				<Ionicons
					name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
					size={28}
					color={passwordVisible ? COLORS.lightBlue : COLORS.pink}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		width: '100%',
		alignItems: 'center',
	},
	btnContainer: {
		...StyleSheet.absoluteFill,
		width: '30%',
		left: '70%',
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default PasswordInput;
