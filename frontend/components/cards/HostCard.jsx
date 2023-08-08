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

	return (
		<TouchableWithoutFeedback onPress={displayUserOnMap}>
			<View style={[styles.container, selected && styles.selected]}>
				<View style={styles.wrapper}>
					<Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
					<View style={styles.infoContainer}>
						<View style={styles.profilContainer}>
							<Text style={styles.name}>{user.firstname}</Text>
							<Text style={styles.city}> • {user.city.name}</Text>
						</View>
						<Text style={styles.desc}>{getDescription(user.description)}</Text>
					</View>
				</View>

				<ButtonIcon
					onpress={handleClick}
					name="arrow-forward-outline"
					type="transparent"
				/>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 80,
		width: '90%',
		marginBottom: 15,
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: RADIUS.card,
		backgroundColor: 'white',
	},
	selected: {
		borderWidth: 1,
		borderColor: COLORS.pink,
	},
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	infoContainer: {
		width: 250,
		alignItems: 'flex-start',
		paddingHorizontal: 10,
	},
	profilContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
	},
	avatar: {
		width: 42,
		height: 42,
		borderRadius: RADIUS.image,
	},
	name: {
		fontSize: 16,
		fontWeight: '700',
	},
	city: {
		fontSize: 12.99,
	},
	desc: {
		fontSize: 12,
	},
});
