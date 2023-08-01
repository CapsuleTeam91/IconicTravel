import React from 'react';
import { COLORS } from '../utils/styles';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
	return (
		<TouchableOpacity
			onPress={props.onpress}
			style={[styles.btn, styles[`${props.type}Btn`]]}
			activeOpacity={0.8}>
			<Text style={[styles.textBtn, styles[`${props.type}TextBtn`]]}>
				{props.label}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		width: '70%',
		alignItems: 'center',
		borderRadius: 30,
		paddingVertical: 15,
		marginVertical: 20,
	},
	primaryBtn: {
		backgroundColor: COLORS.darkBlue,
	},
	secondaryBtn: {
		borderWidth: 1,
		borderColor: COLORS.darkBlue,
		backgroundColor: COLORS.bg,
	},
	tertiaryBtn: {
		width: 100,
		borderWidth: 1,
		borderColor: COLORS.darkBlue,
		backgroundColor: COLORS.bg,
	},
	textBtn: {
		fontSize: 18,
		fontWeight: '700',
		textTransform: 'capitalize',
	},
	primaryTextBtn: {
		color: COLORS.bg,
	},
	secondaryTextBtn: {
		color: COLORS.darkBlue,
	},
	tertiaryTextBtn: {
		color: COLORS.darkBlue,
	},
});

export default Button;
