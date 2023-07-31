import { useState } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	ScrollView,
} from 'react-native';
import { SIGN_VIEW } from '../utils/constants';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const SigninScreen = ({ navigation, view = SIGN_VIEW.in }) => {
	const [signView, setSignView] = useState(view);

	return (
		<TouchableWithoutFeedback
			onPress={() => Keyboard.dismiss()}
			style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<KeyboardAvoidingView
					style={styles.container}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					enabled>
					<SignIn
						signView={signView}
						navigate={() =>
							navigation.navigate('TabNavigator', { screen: 'Search' })
						}
					/>

					{/* <ScrollView
					nestedScrollEnabled
					keyboardDismissMode="on-drag"
					keyboardShouldPersistTaps="handled"
					contentInsetAdjustmentBehavior="automatic"
					contentContainerStyle={{
						paddingBottom: 200,
						justifyContent: 'space-between',
					}}
					style={{ flex: 1 }}> */}
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
								{signView === SIGN_VIEW.in ? 'Créer compte' : 'Se connecter'}
							</Text>
						</TouchableOpacity>
					</View>
					{/* </ScrollView> */}
				</KeyboardAvoidingView>
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
		fontWeight: '700',
		color: COLORS.pink,
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
});

export default SigninScreen;
