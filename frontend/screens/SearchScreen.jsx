import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import MapView from 'react-native-maps'

const SearchScreen = () => {
	const newUser = useSelector((state) => state.newUser.value);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<View style={styles.container}>
				<Text>Bonjour {newUser.firstname}</Text>
				<MapView style={styles.map} />
			</View>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
	},
	map: {
		width: '100%',
		height: '100%',
	},
});

export default SearchScreen;
