import { StyleSheet, Text, View, Image } from 'react-native';
import ButtonIcon from '../buttons/ButtonIcon';
import { RADIUS } from '../../utils/styles';

export const AdventureCard = ({
	userMatched,
	handleDismiss,
	handleValidate,
}) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: userMatched.avatarUrl }} style={styles.avatar} />
			<View style={styles.profilContainer}>
				<Text style={styles.name}>{userMatched.firstname}</Text>
				<Text style={styles.city}>• {userMatched.city.name}</Text>
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
		width: '90%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		borderRadius: RADIUS.card,
		backgroundColor: 'white',
	},
	profilContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'baseline',
	},
	btnContainer: {
		flexDirection: 'row',
	},
	avatar: {
		width: 42,
		height: 42,
		borderRadius: RADIUS.image,
	},
	name: {
		fontSize: 16,
		fontWeight: '700',
		paddingHorizontal: 10,
	},
	city: {
		fontSize: 12,
	},
});
