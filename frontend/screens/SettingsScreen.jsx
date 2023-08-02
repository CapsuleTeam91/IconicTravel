import {
	Image,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import Button from '../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({ navigation }) => {
	const user = useSelector((state) => state.user.value);
	console.log(user);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={'white'} />
			<View style={STYLES_GLOBAL.container}>
				<View style={styles.container}>
					<Text style={STYLES_GLOBAL.subTitle}>PROFIL</Text>
					<View style={styles.linkContainer}>
						<Image
							source={{
								uri: user.avatarUrl,
							}}
							style={styles.image}
						/>
						<TouchableOpacity
							onPress={() => {}}
							activeOpacity={0.8}
							style={styles.linkContainer}>
							<Text style={[STYLES_GLOBAL.textDark, styles.link]}>
								Voir mon profil
							</Text>
							<Ionicons
								name="chevron-forward-outline"
								size={20}
								style={styles.icon}
							/>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.container}>
					<Text style={STYLES_GLOBAL.subTitle}>PARAMETRES</Text>
				</View>

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
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		width: '100%',
		borderColor: 'red',
		borderWidth: 2,
		alignItems: 'flex-start',
		// justifyContent: 'flex-start',
	},
	linkContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 250,
		margin: 20,
	},
	icon: {
		marginHorizontal: 10,
		color: COLORS.darkBlue,
	},
});

export default SettingsScreen;
