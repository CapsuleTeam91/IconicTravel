import React from 'react';
import { COLORS } from '../../utils/styles';
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
		borderRadius: 30,
		marginVertical: 20,
		paddingVertical: 10,
		alignItems: 'center',
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
	lightBtn: {
		backgroundColor: COLORS.lightBlue,
	},
	textBtn: {
		fontSize: 18,
		fontWeight: '700',
		letterSpacing: 1,
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
	lightTextBtn: {
		color: COLORS.bg,
	},
});

export default Button;
