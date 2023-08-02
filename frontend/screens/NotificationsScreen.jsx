import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ButtonIcon from '../components/ButtonIcon';
import { STYLES_GLOBAL } from '../utils/styles';

const NotificationsScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={[STYLES_GLOBAL.subTitl, styles.title]}>Notifications</Text>

			<Text style={styles.notificationsContainer}>
				Recevez des rappels importants sur vos réservations, vos annonces et les messages des hôtes.
			</Text>
			<View style={styles.notifications}>
				<Text style={styles.téléphone}>
					Téléphone
				</Text>
				<Text style={styles.sms}>
					SMS
				</Text>
			</View>


			<ButtonIcon
				type="secondary"
				name="arrow-undo-outline"
				onpress={() => {
					navigation.navigate('TabNavigator', { screen: 'Settings' });
				}}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',

		justifyContent: 'space-between',
	},

	title: {
		marginTop: 70,
	},

	notificationsContainer: {
		
	}


});

export default NotificationsScreen;
