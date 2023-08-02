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

	return (
		<View style={styles.container}>
			<Text style={styles.label}>{props.label}</Text>
			<TouchableOpacity
				onPress={showDatePicker}
				activeOpacity={0.8}
				style={styles.btnContainer}>
				<Ionicons name="calendar-outline" size={28} color={COLORS.bg} />
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
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '70%',
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.bgDark,
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
	label: {
		color: COLORS.bg,
	},
});

export default DatePicker;
