import {
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { LINKS } from '../utils/data';
import { useSelector } from 'react-redux';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import Button from '../components/buttons/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({ navigation }) => {
	const user = useSelector((state) => state.user.value);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={STYLES_GLOBAL.container}>
				<View style={styles.container}>
					<Text style={STYLES_GLOBAL.subTitle}>PROFIL</Text>
					<View style={[styles.linkContainer]}>
						<Image
							source={{
								uri: user.avatarUrl,
							}}
							style={styles.image}
						/>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('UserProfile');
							}}
							activeOpacity={0.8}
							style={styles.profilLinkContainer}>
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
					<Text style={[STYLES_GLOBAL.subTitle, styles.settingContainer]}>
						PARAMETRES
					</Text>
					<View>
						{LINKS.map((link, i) => (
							<TouchableOpacity
								key={i}
								onPress={() => navigation.navigate(link.page)}
								activeOpacity={0.8}
								style={styles.linkContainer}>
								<View style={styles.linkWrapper}>
									<Ionicons name={link.icon} size={20} style={styles.icon} />
									<Text style={[STYLES_GLOBAL.textDark]}>{link.label}</Text>
								</View>
								<Ionicons
									name="chevron-forward-outline"
									size={20}
									style={styles.icon}
								/>
							</TouchableOpacity>
						))}
					</View>
				</View>

				<View style={styles.btnContainer}>
					<Button
						type="secondary"
						label="Se déconnecter"
						onpress={() => navigation.navigate('Login')}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		width: '100%',
		alignItems: 'flex-start',
	},
	settingContainer: {
		marginBottom: 20,
	},
	profilLinkContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	btnContainer: {
		marginVertical: 20,
	},
	linkContainer: {
		width: '90%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	linkWrapper: {
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
	iconLink: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default SettingsScreen;
