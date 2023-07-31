import React from 'react';
import { COLORS } from '../utils/styles';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
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
		width: 72,
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
	primaryTextBtn: {
		color: COLORS.bg,
	},
	secondaryTextBtn: {
		color: COLORS.lightBlue,
	},
});

export default ButtonIcon;
