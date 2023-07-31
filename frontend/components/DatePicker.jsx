import React, { useRef, useState } from 'react';
import { COLORS } from '../utils/styles';
import { Easing } from 'react-native-reanimated';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Animated,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DatePicker = (props) => {
	const transY = useRef(new Animated.Value(0)).current;
	const [datePickerVisible, setDatePickerVisible] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisible(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisible(false);
	};

	return (
		<View style={styles.container}>
			<Text
				style={[
					styles.label,
					props.label === 'Date de naissance' && styles.italic,
				]}>
				{props.label}
			</Text>
			<TouchableOpacity onPress={showDatePicker} activeOpacity={0.8}>
				<Ionicons name="calendar-outline" size={28} color={COLORS.bg} />
			</TouchableOpacity>
			<DateTimePickerModal
				date={props.date}
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.bgDark,
		borderRadius: 8,
		paddingVertical: 10,
		paddingHorizontal: 20,
		marginVertical: 20,
	},
	label: {
		color: COLORS.bg,
	},
	italic: {
		fontStyle: 'italic',
	},
});

export default DatePicker;
