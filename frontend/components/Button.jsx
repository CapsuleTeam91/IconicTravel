import React from 'react';
import { COLORS } from '../utils/styles';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ type, label, onpress, size = 'small' }) => {
	return (
		<TouchableOpacity
			onPress={onpress}
			style={[styles.btn, styles[`${type}Btn`], styles[`${size}Btn`]]}
			activeOpacity={0.8}>
			<Text style={[styles.textBtn, styles[`${type}TextBtn`]]}>{label}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		// width: '70%',
		// maxWidth: '70%',
		alignItems: 'center',
		borderRadius: 30,
		paddingVertical: 10,
		// paddingHorizontal: 25,
		marginVertical: 20,
	},
	smallBtn: {
		paddingHorizontal: 25,
	},
	bigBtn: {
		width: '70%',
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
		maxWidth: 110,
		justifyContent: 'center',
		padding: 5,
		borderWidth: 1,
		borderColor: COLORS.darkBlue,
		backgroundColor: COLORS.bg,
	},
	textBtn: {
		fontSize: 18,
		fontWeight: '700',
		letterSpacing: 1,
		// textTransform: 'capitalize',
	},
	primaryTextBtn: {
		color: COLORS.bg,
	},
	secondaryTextBtn: {
		color: COLORS.darkBlue,
	},
	tertiaryTextBtn: {
		textAlign: 'center',
		color: COLORS.darkBlue,
	},
});

export default Button;
