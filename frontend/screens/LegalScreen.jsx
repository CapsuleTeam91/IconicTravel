import { SafeAreaView, StyleSheet, Text } from 'react-native';
import ButtonIcon from '../components/ButtonIcon';
import { STYLES_GLOBAL } from '../utils/styles';

const LegalScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={STYLES_GLOBAL.subTitle}>Juridique</Text>
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
		paddingHorizontal: 20,
		justifyContent: 'space-between',
	},
});

export default LegalScreen;