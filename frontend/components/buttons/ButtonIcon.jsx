import React from 'react';
import { COLORS } from '../../utils/styles';
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
				size={props.size || 22}
				style={styles[`${props.type}TextBtn`]}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		alignItems: 'center',
		justifyContent: 'center',
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
		width: 52,
		height: 52,
		marginVertical: 20,
		paddingVertical: 15,
		backgroundColor: COLORS.darkBlue,
	},
	secondaryBtn: {
		width: 52,
		height: 52,
		borderWidth: 1,
		marginVertical: 20,
		borderColor: COLORS.darkBlue,
		backgroundColor: COLORS.bg,
	},
	secondaryLightBtn: {
		width: 62,
		borderWidth: 2,
		paddingVertical: 8,
		borderColor: COLORS.lightBlue,
		backgroundColor: COLORS.bg,
	},
	tertiaryBtn: {
		width: 42,
		height: 52,
		margin: 5,
		marginVertical: 20,
		borderWidth: 2,
		borderColor: COLORS.lightBlue,
		backgroundColor: COLORS.bgModal,
	},
	countBtn: {
		width: 28,
		height: 28,
		borderWidth: 2,
		borderColor: COLORS.darkBlue,
	},
	transparentBtn: {
		width: 32,
		borderWidth: 0,
		padding: 5,
		borderColor: 'transparent',
	},
	primaryTextBtn: {
		color: COLORS.bg,
	},
	secondaryTextBtn: {
		color: COLORS.darkBlue,
	},
	secondaryLightTextBtn: {
		color: COLORS.lightBlue,
	},
	tertiaryTextBtn: {
		color: COLORS.lightBlue,
	},
	transparentTextBtn: {
		color: COLORS.darkBlue,
	},
});

export default ButtonIcon;
