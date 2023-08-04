import React, { useRef, useState } from 'react';
import { COLORS } from '../utils/styles';
import { Easing } from 'react-native-reanimated';
import { StyleSheet, TextInput, View, Text, Animated } from 'react-native';

const Textarea = (props) => {
	const transY = useRef(new Animated.Value(10)).current;
	const [isHighlighted, setIsHighlighted] = useState(props.autoFocus);

	const handleFocus = () => {
		setIsHighlighted(true);
		Animated.timing(transY, {
			toValue: -32,
			duration: 200,
			easing: Easing.ease,
			useNativeDriver: true, //makes animations run on the UI thread
		}).start();
	};

	const handleBlur = () => {
		setIsHighlighted(false);
		if (!props.value) {
			Animated.timing(transY, {
				toValue: 10,
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
							? styles[props.theme].isHighlightedLabel
							: [styles[props.theme].label, styles.label]
					}>
					{props.label}
				</Text>
			</Animated.View>
			<TextInput
				{...props}
				maxLength={1000}
				multiline={true}
				numberOfLines={8}
				onFocus={handleFocus}
				onBlur={handleBlur}
				style={[
					styles[props.theme].input,
					styles.input,
					{ textAlignVertical: 'top' },
				]}
				cursorColor={props.theme === 'light' ? COLORS.pink : COLORS.lightBlue}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '70%',
		borderRadius: 8,
	},
	input: {
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	labelContainer: {
		marginLeft: 10,
		position: 'absolute',
		paddingHorizontal: 20,
	},
	label: {
		fontStyle: 'italic',
	},
	isHighlighted: {
		borderWidth: 2,
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
		isHighlighted: {
			borderColor: COLORS.pink,
		},
		isHighlightedLabel: {
			color: COLORS.pink,
		},
	},
	dark: {
		container: {
			borderWidth: 0,
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
			borderColor: COLORS.lightBlue,
			backgroundColor: COLORS.darkBlue,
		},
		isHighlightedLabel: {
			color: COLORS.bg,
		},
		input: {
			color: COLORS.bg,
		},
	},
});

export default Textarea;
