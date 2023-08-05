import { useState } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import { SIGN_VIEW } from '../utils/constants';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SignIn from '../components/login/SignIn';
import SignUp from '../components/login/SignUp';

const SigninScreen = ({ navigation, view = SIGN_VIEW.in }) => {
	const [signView, setSignView] = useState(view);

	return (
		<TouchableWithoutFeedback
			onPress={() => Keyboard.dismiss()}
			style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<KeyboardAwareScrollView
					extraScrollHeight={100} // (when scroll)to have extra height between keyboard and text input
					enableOnAndroid={true}
					extraHeight={100} // make some height so the keyboard wont cover other component
					contentContainerStyle={styles.contentContainerStyle}>
					<SignIn
						signView={signView}
						navigate={() =>
							navigation.navigate('TabNavigator', { screen: 'Search' })
						}
					/>
					<SignUp navigate={() => navigation.navigate('ProfileStepOne')} />

					<View style={styles.switchLinkContainer}>
						<View style={styles.switchLinkContainer2}>
							<Text style={STYLES_GLOBAL.textLight}>
								{signView === SIGN_VIEW.in
									? 'Pas encore de compte ?'
									: 'Vous avez déjà un compte ?'}
							</Text>
							<TouchableOpacity
								onPress={() =>
									setSignView(
										signView === SIGN_VIEW.in ? SIGN_VIEW.up : SIGN_VIEW.in
									)
								}
								activeOpacity={0.8}>
								<Text style={styles.link}>
									{signView === SIGN_VIEW.in
										? 'Créer un compte'
										: 'Se connecter'}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		// justifyContent: 'space-between',
		backgroundColor: COLORS.lightBlue,
	},
	contentContainerStyle: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	switchLinkContainer: {
		width: '100%',
		height: 100,
		// flexDirection: 'row',

		backgroundColor: COLORS.darkBlue,
	},
	switchLinkContainer2: {
		width: '100%',
		height: 100,
		alignItems: 'center',
		backgroundColor: COLORS.lightBlue,
		// borderTopLeftRadius: 100,
	},
	link: {
		fontSize: 16,
		letterSpacing: 1,
		fontWeight: '700',
		color: COLORS.darkBlue,
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
});

export default SigninScreen;
