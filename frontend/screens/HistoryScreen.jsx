import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { STYLES_GLOBAL } from '../utils/styles';

const HistoryScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<Text style={STYLES_GLOBAL.subTitle}>Historique</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingVertical: 40,
		paddingHorizontal: 20,
		justifyContent: 'space-between',
		borderWidth: 2,
		borderColor: 'red',
	},
});

export default HistoryScreen;
