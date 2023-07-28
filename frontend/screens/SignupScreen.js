import { StyleSheet, Text, View } from 'react-native';
import SigninScreen from './SigninScreen';
import { SIGN_VIEW } from '../utils/constants';

export default function SignupScreen() {
	return <SigninScreen view={SIGN_VIEW.up} />;
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
