import { SafeAreaView, StyleSheet, Text } from 'react-native';
import ButtonIcon from '../components/ButtonIcon';
import { STYLES_GLOBAL } from '../utils/styles';

const SafetyScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={STYLES_GLOBAL.subTitle}>Safety</Text>
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

export default SafetyScreen;