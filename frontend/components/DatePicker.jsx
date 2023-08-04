import React, { useState } from 'react';
import { COLORS } from '../utils/styles';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DatePicker = (props) => {
	const [datePickerVisible, setDatePickerVisible] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisible(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisible(false);
	};

	const styles = StyleSheet.create({
		container: {
			width: props.width ? props.width : '70%',
			height: 50,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			borderRadius: 8,
			paddingVertical: 10,
			paddingHorizontal: 20,
			marginVertical: 10,
		},
		btnContainer: {
			...StyleSheet.absoluteFillObject,
			right: 20,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-end',
		},
		light: {
			container: {
				borderWidth: 1,
				borderColor: COLORS.darkBlue,
				backgroundColor: COLORS.bg,
			},
			label: {
				color: COLORS.darkBlue,
			},
		},
		dark: {
			container: {
				backgroundColor: COLORS.bgDark,
			},
			label: {
				color: COLORS.bg,
			},
		},
	});

	return (
		<View style={[styles.container, styles[props.theme].container]}>
			<Text style={styles[props.theme].label}>{props.label}</Text>
			<TouchableOpacity
				onPress={showDatePicker}
				activeOpacity={0.8}
				style={styles.btnContainer}>
				<Ionicons
					name="calendar-outline"
					size={28}
					color={props.theme === 'dark' ? COLORS.bg : COLORS.darkBlue}
				/>
			</TouchableOpacity>
			<DateTimePickerModal
				date={props.date}
				display="spinner"
				isVisible={datePickerVisible}
				mode="date"
				onConfirm={(date) => {
					props.onconfirm(date);
					hideDatePicker();
				}}
				onCancel={hideDatePicker}
				minimumDate={props.minimumDate}
			/>
		</View>
	);
};



export default DatePicker;
