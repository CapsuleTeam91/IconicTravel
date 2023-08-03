import { SafeAreaView, StyleSheet, Text, View, Switch } from 'react-native';
import ButtonIcon from '../components/ButtonIcon';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { useState } from 'react';

const NotificationsScreen = ({ navigation }) => {

	const [isEnabledPhone, setIsEnabledPhone] = useState(false);
	const [isEnabledSms, setIsEnabledSms] = useState(false);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.notificationsContainer}>
				<Text style={[STYLES_GLOBAL.subTitle, styles.title]}>Notifications</Text>

				<Text>
					Recevez des rappels importants sur vos réservations, vos annonces et les messages des hôtes.
				</Text>

				<View style={styles.notifications}>
					<View style={styles.btn}>
						<Text>
							Téléphone
						</Text>
						<Switch
							trackColor={{ false: COLORS.darkBlue, true: COLORS.pink }}
							thumbColor={isEnabledPhone ? COLORS.bg : COLORS.lightBlue}
							style={{
								transform: [{ scaleX: Platform.OS === 'ios' ? 1 : 1.7 }, { scaleY: Platform.OS === 'ios' ? 1 : 1.7 }],
							}}
							ios_backgroundColor={COLORS.lightBlue}
							onValueChange={() => setIsEnabledPhone(!isEnabledPhone)}
							value={isEnabledPhone}
						/>
					</View>

					<View style={styles.btn}>
						<Text>
							SMS
						</Text>
						<Switch
							trackColor={{ false: COLORS.darkBlue, true: COLORS.pink }}
							thumbColor={isEnabledSms ? COLORS.bg : COLORS.lightBlue}
							style={{
								transform: [{ scaleX: Platform.OS === 'ios' ? 1 : 1.7 }, { scaleY: Platform.OS === 'ios' ? 1 : 1.7 }],
							}}
							ios_backgroundColor={COLORS.lightBlue}
							onValueChange={() => setIsEnabledSms(!isEnabledSms)}
							value={isEnabledSms}
						/>
					</View>
				</View>
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
		fontSize: 25,
		marginTop: 70,
		marginBottom: 60,
	},

	notificationsContainer: {
		width: '100%',
		alignItems: 'center',
	},

	notifications: {
		width: '100%',
		alignItems: 'center',
		marginTop: 60
	},

	btn: {
		width: '80%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: 10
	},

});

export default NotificationsScreen;
