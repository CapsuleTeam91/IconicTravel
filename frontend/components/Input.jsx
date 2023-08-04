import React, { useRef, useState } from 'react';
import { COLORS } from '../utils/styles';
import { Easing } from 'react-native-reanimated';
import { StyleSheet, TextInput, View, Text, Animated } from 'react-native';

const Input = (props) => {
	const transY = useRef(new Animated.Value(0)).current;
	const [isHighlighted, setIsHighlighted] = useState(props.autoFocus);

	const handleFocus = () => {
		setIsHighlighted(true);
		if (props.handleFocus) props.handleFocus();
		Animated.timing(transY, {
			toValue: -32,
			duration: 200,
			easing: Easing.ease,
			useNativeDriver: true, //makes animations run on the UI thread
		}).start();
	};

	const handleBlur = () => {
		setIsHighlighted(false);
		if (props.handleBlur) props.handleBlur();
		if (!props.value) {
			Animated.timing(transY, {
				toValue: 0,
				duration: 200,
				easing: Easing.ease,
				useNativeDriver: true,
			}).start();
		}
	};

	return (
		<View
			style={[
				styles[props.theme].container,
				styles.container,
				isHighlighted && [
					styles[props.theme].isHighlighted,
					styles.isHighlighted,
				],
			]}>
			<Animated.View
				style={[
					isHighlighted && styles[props.theme].isHighlightedLabelContainer,
					styles[props.theme].labelContainer,
					styles.labelContainer,
					{ transform: [{ translateY: transY }] },
				]}>
				<Text
					style={
						isHighlighted
							? styles.isHighlightedLabel
							: [styles[props.theme].label, styles.label]
					}>
					{props.label}
				</Text>
			</Animated.View>
			<TextInput
				{...props}
				maxLength={100}
				onFocus={handleFocus}
				onBlur={handleBlur}
				style={[styles[props.theme].input, styles.input]}
				cursorColor={COLORS.pink}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '70%',
		borderRadius: 8,
		borderWidth: 1,
		justifyContent: 'center',
		borderColor: COLORS.darkBlue,
	},
	input: {
		// height: 50,
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	labelContainer: {
		marginLeft: 10,
		position: 'absolute',
		paddingHorizontal: 20,
	},
	isHighlighted: {
		borderWidth: 2,
		borderColor: COLORS.pink,
	},
	isHighlightedLabel: {
		color: COLORS.pink,
	},
	light: {
		container: {
			borderWidth: 1,
			marginVertical: 20,
			borderColor: COLORS.darkBlue,
		},
		labelContainer: {
			backgroundColor: COLORS.bg,
		},
		label: {
			color: COLORS.lightBlue,
		},
	},
	dark: {
		container: {
			borderWidth: 0,
			marginVertical: 10,
			backgroundColor: COLORS.bgDark,
		},
		isHighlightedLabelContainer: {
			backgroundColor: COLORS.darkBlue,
		},
		label: {
			width: '100%',
			color: COLORS.bg,
		},
		isHighlighted: {
			backgroundColor: COLORS.darkBlue,
		},
		input: {
			color: COLORS.bg,
		},
	},
});

export default Input;
