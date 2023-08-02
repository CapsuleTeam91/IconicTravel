import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ButtonIcon from '../components/ButtonIcon';
import { STYLES_GLOBAL } from '../utils/styles';
import { useSelector } from 'react-redux';

const UserProfileScreen = ({ navigation }) => {
	const user = useSelector((state) => state.user.value);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.optionsContainer}>
				<Text style={STYLES_GLOBAL.subTitle}>MON PROFIL</Text>
				<View style={styles.optionsBtnContainer}>
					<ButtonIcon
						type="secondary"
						name="pencil-outline"
						onpress={() => {
							navigation.navigate('TabNavigator', { screen: 'Settings' });
						}}
					/>
					<ButtonIcon
						type="secondary"
						name="arrow-undo-outline"
						onpress={() => {
							navigation.navigate('TabNavigator', { screen: 'Settings' });
						}}
					/>
				</View>
			</View>
			<View style={[styles.optionsContainer, styles.imageContainer]}>
				<Image
					source={{
						uri: user.avatarUrl,
					}}
					style={styles.image}
				/>
				<View>
					<Text style={STYLES_GLOBAL.subTitle}>Iconic Host</Text>
				</View>
			</View>
			<View style={styles.optionsBtnContainer}>
				<Text style={STYLES_GLOBAL.subTitle}>
					{user.firstname} {user.lastname}
				</Text>
				<Text>{user.dateOfBirth}</Text>
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
	optionsContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	optionsBtnContainer: {
		width: '40%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	imageContainer: {
		padding: 20,
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 250,
		// margin: 20,
		// marginRight: 10,
	},
});

export default UserProfileScreen;
