import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ButtonIcon from '../components/ButtonIcon';
import { STYLES_GLOBAL } from '../utils/styles';

const MessagesScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<Text style={STYLES_GLOBAL.subTitle}>Messages</Text>
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

export default MessagesScreen;
