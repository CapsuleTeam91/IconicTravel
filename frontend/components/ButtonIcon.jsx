import React from 'react';
import { COLORS } from '../utils/styles';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ButtonIcon = (props) => {
	return (
		<TouchableOpacity
			onPress={props.onpress}
			style={[styles.btn, styles[`${props.type}Btn`]]}
			activeOpacity={0.8}>
			<Ionicons
				name={props.name}
				size={props.size || 28}
				style={styles[`${props.type}TextBtn`]}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		alignItems: 'center',
		borderRadius: 30,
		shadowColor: COLORS.bg,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},
	primaryBtn: {
		width: 62,
		marginVertical: 20,
		paddingVertical: 15,
		backgroundColor: COLORS.darkBlue,
	},
	secondaryBtn: {
		width: 62,
		borderWidth: 1,
		marginVertical: 20,
		paddingVertical: 15,
		borderColor: COLORS.darkBlue,
		backgroundColor: COLORS.bg,
	},
	tertiaryBtn: {
		width: 62,
		margin: 5,
		marginVertical: 20,
		paddingVertical: 15,
		backgroundColor: COLORS.bgDark,
	},
	transparentBtn: {
		width: 32,
		borderWidth: 0,
		padding: 5,
		borderColor: 'transparent',
		backgroundColor: COLORS.bg,
	},
	primaryTextBtn: {
		color: COLORS.bg,
	},
	secondaryTextBtn: {
		color: COLORS.lightBlue,
	},
	tertiaryTextBtn: {
		color: COLORS.bg,
	},
	transparentTextBtn: {
		color: COLORS.darkBlue,
	},
});

export default ButtonIcon;
