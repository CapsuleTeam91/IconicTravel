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
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const SigninScreen = ({ navigation, view = SIGN_VIEW.in }) => {
	const [signView, setSignView] = useState(view);

	return (
		<TouchableWithoutFeedback
			onPress={() => Keyboard.dismiss()}
			style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<KeyboardAwareScrollView
					extraScrollHeight={100} // (when scroll)to have extra height between keyboard and text input
					enableOnAndroid={true}
					extraHeight={100} // make some height so the keyboard wont cover other component
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: COLORS.darkBlue,
					}}>
					<SignIn
						signView={signView}
						navigate={() =>
							navigation.navigate('TabNavigator', { screen: 'Search' })
						}
					/>
					<SignUp navigate={() => navigation.navigate('ProfileStepOne')} />

					<View>
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
								{signView === SIGN_VIEW.in ? 'Créer un compte' : 'Se connecter'}
							</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: COLORS.darkBlue,
	},
	link: {
		fontSize: 20,
		letterSpacing: 1,
		fontWeight: '700',
		color: COLORS.pink,
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
});

export default SigninScreen;
