import SigninScreen from './SigninScreen';
import { SIGN_VIEW } from '../utils/constants';

const SignupScreen = ({ navigation }) => {
	return <SigninScreen view={SIGN_VIEW.up} navigation={navigation} />;
};
export default SignupScreen;
