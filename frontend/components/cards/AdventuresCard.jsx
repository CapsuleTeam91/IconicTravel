import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	Touchable,
	TouchableOpacity,
	View,
	Image,
} from 'react-native';
import { COLORS } from '../../utils/styles';
import ButtonIcon from '../buttons/ButtonIcon';

import React from 'react';

export const AdventureCard = ({
	userMatched,
	handleDismiss,
	handleValidate,
}) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: userMatched.avatarUrl }} style={styles.avatar} />
			<View style={styles.profilContainer}>
				<Text>{userMatched.firstname}</Text>
			</View>
			<View style={styles.btnContainer}>
				<ButtonIcon
					onpress={handleDismiss}
					name="close-outline"
					type="transparent"
				/>
				<ButtonIcon
					onpress={handleValidate}
					name="checkmark-outline"
					type="transparent"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 78,
		width: '80%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,

		borderRadius: 20,
		backgroundColor: 'white',
	},

	profilContainer: {
		flex: 1,
		// backgroundColor: 'red',
		// width: '100%',
		height: '50%',
	},
	avatar: {
		width: 42,
		height: 42,
		borderRadius: 250,
	},
	btnContainer: {
		flexDirection: 'row',
	},
});
