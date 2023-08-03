import { SafeAreaView, StyleSheet, Text, View, Switch} from 'react-native';
import ButtonIcon from '../components/ButtonIcon';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { useState } from 'react';

const NotificationsScreen = ({ navigation }) => {

	const [isEnabled, setIsEnabled] = useState(false);

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
				<Switch
						trackColor={{ false: COLORS.darkBlue, true: COLORS.pink }}
						thumbColor={isEnabled ? COLORS.bg : COLORS.lightBlue}
						style={{
							marginTop: 10,
							transform: [{ scaleX: Platform.OS === 'ios' ? 1 : 1.7 }, { scaleY: Platform.OS === 'ios' ? 1 : 1.7}],
						}}
						ios_backgroundColor={COLORS.lightBlue}
						onValueChange={()=> setIsEnabled(!isEnabled)}
						value={isEnabled}
					/>
				<Text style={styles.sms}>
					SMS
				</Text>
				<Switch
						trackColor={{ false: COLORS.darkBlue, true: COLORS.pink }}
						thumbColor={isEnabled ? COLORS.bg : COLORS.lightBlue}
						style={{
							marginTop: 10,
							transform: [{ scaleX: Platform.OS === 'ios' ? 1 : 1.7 }, { scaleY: Platform.OS === 'ios' ? 1 : 1.7}],
						}}
						ios_backgroundColor={COLORS.lightBlue}
						onValueChange={()=> setIsEnabled(!isEnabled)}
						value={isEnabled}
					/>
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

	switchContainer: {
		alignItems: 'center',
	},
	
	notificationsContainer: {
		
	}


});

export default NotificationsScreen;
