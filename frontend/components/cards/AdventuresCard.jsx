import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ButtonIcon from '../buttons/ButtonIcon';
import { RADIUS } from '../../utils/styles';

export const AdventureCard = ({
	userMatched,
	isHost,
	isConfirmed,
	startDate,
	endDate,
	handleDismiss,
	handleValidate,
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
				<Image source={{ uri: userMatched.avatarUrl }} style={styles.avatar} />
			</TouchableOpacity>

			<View style={styles.infoContainer}>
				<View style={styles.profilContainer}>
					<Text style={styles.name}>{userMatched.firstname}</Text>
					<Text style={styles.city}>• {userMatched.city.name}</Text>
				</View>
				<Text style={styles.date}>
					{startDate} - {endDate}
				</Text>
			</View>

			{!isConfirmed && (
				<View style={styles.btnContainer}>
					<ButtonIcon
						onpress={handleDismiss}
						name="close-outline"
						type="transparent"
					/>
					{isHost && (
						<ButtonIcon
							onpress={handleValidate}
							name="checkmark-outline"
							type="transparent"
						/>
					)}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 78,
		width: '90%',
		marginBottom: 8,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		borderRadius: RADIUS.card,
		backgroundColor: 'white',
	},
	infoContainer: {
		width: 200,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	profilContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
	},
	btnContainer: {
		width: 80,
		flexDirection: 'row',
		justifyContent: 'space-between',
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
		fontSize: 14,
	},
	date: {
		fontSize: 12,
		paddingHorizontal: 10,
	},
});
