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
				size={28}
				style={styles[`${props.type}TextBtn`]}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		width: 62,
		alignItems: 'center',
		borderRadius: 30,
		paddingVertical: 15,
		marginVertical: 20,
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
		backgroundColor: COLORS.darkBlue,
	},
	secondaryBtn: {
		borderWidth: 1,
		borderColor: COLORS.darkBlue,
		backgroundColor: COLORS.bg,
	},
	tertiaryBtn: {
		margin: 5,
		backgroundColor: COLORS.bgDark,
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
});

export default ButtonIcon;
