import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableWithoutFeedback,
} from 'react-native';
import ButtonIcon from '../buttons/ButtonIcon';
import { COLORS, RADIUS } from '../../utils/styles';

export const HostCard = ({ user, selected, handleClick, displayUserOnMap }) => {
	const getDescription = (desc) =>
		desc.length >= 70 ? desc.slice(0, desc.indexOf(' ', 70)) + '...' : desc;
	// if (newDesc.length >= 80) {
	// 	newDesc = newDesc.slice(0, newDesc.indexOf(' ', 79)) + '...';
	// }
	return (
		<TouchableWithoutFeedback onPress={displayUserOnMap}>
			<View style={[styles.container, selected && styles.selected]}>
				<Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
				<View style={styles.infoContainer}>
					<View style={styles.profilContainer}>
						<Text style={styles.name}>{user.firstname}</Text>
						<Text style={styles.city}>• {user.city.name}</Text>
					</View>
					<Text style={styles.desc}>{getDescription(user.description)}</Text>
				</View>
				<View style={styles.btnContainer}>
					<ButtonIcon
						onpress={handleClick}
						name="arrow-forward-outline"
						type="transparent"
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 80,
		width: '90%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		marginBottom: 15,
		borderRadius: RADIUS.card,
		backgroundColor: 'white',
	},
	selected: {
		borderWidth: 1,
		borderColor: COLORS.pink,
	},
	infoContainer: {
		width: 200,
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
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
	desc: {
		fontSize: 12,
	},
});
