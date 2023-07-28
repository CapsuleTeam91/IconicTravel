import React, { useRef, useState } from 'react';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { Path } from 'react-native-svg';
import { COLORS } from '../utils/styles';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStroke = ({ d, progress }) => {
	const ref = useRef(null);
	const [length, setLength] = useState(0);

	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: length - length * progress.value,
	}));

	return (
		<AnimatedPath
			animatedProps={animatedProps}
			onLayout={() => setLength(ref.current.getTotalLength())}
			ref={ref}
			d={d}
			stroke={COLORS.darkBlue}
			fill={COLORS.bg}
			strokeWidth={1}
			strokeDasharray={length}
			strokeDashoffset={0}
		/>
	);
};

export default AnimatedStroke;
