import SigninScreen from './SigninScreen';
import { SIGN_VIEW } from '../utils/constants';

export default function SignupScreen({ navigation }) {
	return <SigninScreen view={SIGN_VIEW.up} navigation={navigation} />;
}
