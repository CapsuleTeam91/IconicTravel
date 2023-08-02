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

	const links = [
		{
			icon: 'shield-outline',
			label: 'Connexion et sécurité',
			page: 'Safety',
		},
		{
			icon: 'notifications-outline',
			label: 'Notifications',
			page: 'Notifications',
		},
		{
			icon: 'language-outline',
			label: 'Traduction',
			page: 'Traduction',
		},
		{
			icon: 'warning-outline',
			label: 'Juridique',
			page: 'Legal',
		},
	];

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
					<View>
						{links.map((link, i) => (
							<TouchableOpacity
								onPress={() => navigation.navigate(link.page)}
								activeOpacity={0.8}
								style={styles.linkContainer}>
								<Ionicons name={link.icon} size={20} style={styles.icon} />
								<Text style={[STYLES_GLOBAL.textDark]}>
									{link.label}
									{link.page}
								</Text>
								<Ionicons
									name="chevron-forward-outline"
									size={20}
									style={styles.icon}
								/>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<Button
					type="secondary"
					label="Se déconnecter"
					onpress={() => navigation.navigate('Login')}
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
		marginRight: 10,
	},
	icon: {
		color: COLORS.darkBlue,
	},
	link: {
		textDecorationLine: 'underline',
	},
});

export default SettingsScreen;
