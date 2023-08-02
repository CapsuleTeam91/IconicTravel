import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearData } from '../reducers/user';
import { STYLES_GLOBAL } from '../utils/styles';
import Button from '../components/Button';
import StrokeAnimation from '../components/StrokeAnimation';

const LoginScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearData());
	}, []);

	return (
		<View style={STYLES_GLOBAL.container}>
			<Text style={STYLES_GLOBAL.title}>Iconic Travel</Text>
			<StrokeAnimation />
			<Button
				type="primary"
				label="Se connecter"
				onpress={() => navigation.navigate('Signin')}
			/>
			<Button
				type="secondary"
				label="Créer un compte"
				onpress={() => navigation.navigate('Signup')}
			/>
		</View>
	);
};

export default LoginScreen;
