import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ButtonIcon from '../buttons/ButtonIcon';
import { COLORS, RADIUS } from '../../utils/styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const AdventureCard = ({
	booking,
	isHost,
	isConfirmed,
	navigation,
	handleDismiss,
	handleValidate,
}) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() =>
					navigation.navigate('Profile', {
						user: booking[isHost ? 'traveler' : 'host'],
					})
				}
				activeOpacity={0.8}>
				<Image
					source={{ uri: booking[isHost ? 'traveler' : 'host'].avatarUrl }}
					style={styles.avatar}
				/>
			</TouchableOpacity>

			<View style={styles.infoContainer}>
				<View style={styles.profilContainer}>
					<Text style={styles.name}>
						{booking[isHost ? 'traveler' : 'host'].firstname}
					</Text>
					<Text style={styles.city}>
						• {booking[isHost ? 'traveler' : 'host'].city.name}
					</Text>
				</View>
				<Text style={styles.date}>
					{new Date(booking.startDate).toLocaleDateString()} -{' '}
					{new Date(booking.endDate).toLocaleDateString()}
				</Text>
				<View style={styles.profilContainer}>
					<View style={styles.date}>
						<Ionicons name="body" size={10} color={COLORS.darkBlue} />
						<Text style={styles.date}>{booking.adultsNumber}</Text>
					</View>
					{!!booking.childrenNumber && (
						<View style={styles.date}>
							<FontAwesome name="child" size={10} color={COLORS.darkBlue} />
							<Text style={styles.date}>{booking.childrenNumber}</Text>
						</View>
					)}
					{!!booking.babiesNumber && (
						<View style={styles.date}>
							<Ionicons name="egg" size={10} color={COLORS.darkBlue} />
							<Text style={styles.date}>{booking.babiesNumber}</Text>
						</View>
					)}
				</View>
			</View>

			{new Date(booking.endDate) >= new Date() && (
				<View style={styles.btnContainer}>
					<ButtonIcon
						onpress={handleDismiss}
						name="close-outline"
						type="transparent"
					/>
					{isHost && !isConfirmed && (
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
		color: COLORS.darkBlue,
	},
	city: {
		fontSize: 14,
		color: COLORS.darkBlue,
	},
	date: {
		fontSize: 12,
		paddingHorizontal: 10,
		color: COLORS.darkBlue,
	},
});
