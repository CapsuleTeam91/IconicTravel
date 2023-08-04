import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import ButtonIcon from '../components/ButtonIcon';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { useState } from 'react';

const TraductionScreen = ({ navigation }) => {

	const [isEnabled, setIsEnabled] = useState(false);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.traductionContainer}>
			<Text style={[STYLES_GLOBAL.subTitle, styles.title]}>Traduction</Text>

				<View style={styles.message}>
					<Text>
						Traduit automatiquement les commentaires, messages et descriptions rédigés par les locaux en français.
					</Text>
				</View>

				<View style={styles.btn}>
					<Text>
						Traduction
					</Text>
					<Switch
						trackColor={{ false: COLORS.darkBlue, true: COLORS.pink }}
						thumbColor={isEnabled ? COLORS.bg : COLORS.lightBlue}
						style={{
							transform: [{ scaleX: Platform.OS === 'ios' ? 1 : 1.7 }, { scaleY: Platform.OS === 'ios' ? 1 : 1.7 }],
						}}
						ios_backgroundColor={COLORS.lightBlue}
						onValueChange={() => setIsEnabled(!isEnabled)}
						value={isEnabled}
					/>
				</View>
			</View>

			<ButtonIcon
				type="secondary"
				name="arrow-undo-outline"
				onpress={() => {
					navigation.navigate('TabNavigator', { screen: 'Settings' });
				}}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	title: {
		fontSize: 25,
		marginTop: 70,
		marginBottom: 60,
	},

	traductionContainer: {
		width: '100%',
		alignItems: 'center',
	},

	message: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		textAlign: 'justify',
		marginBottom: 60,
	},

	btn: {
		width: '80%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		margin: 10
	},

});

export default TraductionScreen;
