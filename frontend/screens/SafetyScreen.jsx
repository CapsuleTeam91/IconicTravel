import { useState } from 'react';
import { useSelector } from 'react-redux';
import { URL_EXPO } from '../utils/constants';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { SafeAreaView, StyleSheet, Text, View, Modal } from 'react-native';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';

const SafetyScreen = ({ navigation }) => {
	const user = useSelector((state) => state.user.value);
	const [modalVisible, setModalVisible] = useState(false);

	const handleDelete = () => {
		fetch(`${URL_EXPO}:3000/users/deletepicture/${user.token}`, {
			method: 'DELETE',
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					console.log('Image suprimée');
				} else {
					console.log('Image non suprimée !');
				}
			});

		fetch(`${URL_EXPO}:3000/users/delete/${user.token}`, { method: 'DELETE' })
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					console.log('Profil supprimé');
					navigation.navigate('Login');
				} else {
					console.log('Profil: Oh ooh !');
				}
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={[STYLES_GLOBAL.subTitle, styles.title]}>
				Connexion et Sécurité
			</Text>

			<View style={styles.wrapper}>
				<Text style={styles.subTitle}>Mot de passe</Text>
				<Button
					type="primary"
					label="Changer le mot de passe"
					onpress={() => {}}
				/>
			</View>

			<View style={styles.wrapper}>
				<Text style={styles.subTitle}>Compte</Text>
				<View style={styles.connexion}>
					<Button
						type="primary"
						label="Désactiver le compte"
						onpress={() => {}}
					/>
					<Button
						type="secondary"
						label="Supprimer le compte"
						onpress={() => setModalVisible(true)}
					/>
				</View>
			</View>

			<Modal visible={modalVisible} animationType="fade" transparent>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={styles.closeBtn}>
							<ButtonIcon
								type="transparent"
								name="close-outline"
								onpress={() => setModalVisible(false)}
							/>
						</View>
						<Text style={STYLES_GLOBAL.subTitle}>SUPPRESSION DU COMPTE</Text>
						<Text style={styles.modalText}>
							La suppression est définitive, êtes vous sûr(e) de vouloir
							continuer ?
						</Text>
						<View style={styles.modalBtnContainer}>
							<Button
								type="secondary"
								label="Non"
								onpress={() => setModalVisible(false)}
							/>
							<Button type="primary" label="Oui" onpress={handleDelete} />
						</View>
					</View>
				</View>
			</Modal>

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
	wrapper: {
		borderColor: 'red',
		borderWidth: 2,
		width: '100%',
		alignItems: 'center',
	},
	title: {
		marginTop: 70,
	},
	subTitle: {
		textAlign: 'left',
		alignSelf: 'flex-start',
		marginLeft: 20,
		fontSize: 20,
	},
	centeredView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.bgModal,
	},
	modalView: {
		paddingHorizontal: 20,
		paddingVertical: 30,
		borderRadius: 20,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		elevation: 5,
		shadowRadius: 4,
		shadowOpacity: 0.25,
		shadowColor: 'black',
		alignItems: 'center',
		backgroundColor: COLORS.bg,
	},
	modalBtnContainer: {
		width: '90%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	modalText: {
		fontSize: 18,
		textAlign: 'center',
	},
	closeBtn: {
		alignSelf: 'flex-end',
	},
});

export default SafetyScreen;
