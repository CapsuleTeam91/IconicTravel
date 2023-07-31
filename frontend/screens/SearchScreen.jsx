import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const SearchScreen = () => {
	const newUser = useSelector((state) => state.newUser.value);

	return (
		<View style={styles.container}>
			<Text>Bonjour {newUser.firstname}</Text>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default SearchScreen;
