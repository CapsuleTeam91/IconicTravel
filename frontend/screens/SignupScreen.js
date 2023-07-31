import SigninScreen from './SigninScreen';
import { SIGN_VIEW } from '../utils/constants';

export default function SignupScreen() {
	return <SigninScreen view={SIGN_VIEW.up} />;
}
