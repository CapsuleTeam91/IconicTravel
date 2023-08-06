import { StyleSheet, Text, View } from 'react-native';
import { COLORS, STYLES_GLOBAL } from '../../utils/styles';
import ButtonIcon from '../ButtonIcon';

const HeaderUpdateProfile = ({
	handleNagitaion,
	handleUpdateView,
	editViewEnabled,
}) => {
	return (
		<View style={styles.firstTopLayer}>
			<View style={styles.secondTopLayer}>
				<View style={styles.container}>
					<ButtonIcon
						type="secondary"
						name="close-outline"
						onpress={handleNagitaion}
					/>
					<Text style={[STYLES_GLOBAL.subTitle, STYLES_GLOBAL.subTitleLight]}>
						MON PROFIL
					</Text>
					<ButtonIcon
						type="secondary"
						name={
							editViewEnabled ? 'brush-outline' : 'ellipsis-vertical-outline'
						}
						onpress={handleUpdateView}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	firstTopLayer: {
		...StyleSheet.absoluteFillObject,
		flexGrow: 1,
		height: 160,
		backgroundColor: COLORS.bg,
	},
	secondTopLayer: {
		...StyleSheet.absoluteFillObject,
		flexGrow: 1,
		height: 160,
		alignItems: 'center',
		borderBottomRightRadius: 100,
		backgroundColor: COLORS.darkBlue,
	},
	container: {
		width: '80%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export default HeaderUpdateProfile;
