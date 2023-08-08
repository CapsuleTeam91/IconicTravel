import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ERRORS } from '../utils/constants';
import { URL_EXPO } from '../environnement';
import { COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from '../components/buttons/Button';
import ButtonIcon from '../components/buttons/ButtonIcon';
import ModalModel from '../components/modals/ModalModel';
import PasswordInput from '../components/forms/PasswordInput';

const SafetyScreen = ({ navigation }) => {
	const user = useSelector((state) => state.user.value);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [updateModalVisible, setUpdateModalVisible] = useState(false);
	const [newPassword, setNewPassword] = useState('');
	const [newConfirmedPassword, setNewConfirmedPassword] = useState('');
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	const handleUpdate = () => {
		setError('');

		if (!newPassword || !newConfirmedPassword) {
			setError(ERRORS.err403);
		} else if (newPassword !== newConfirmedPassword) {
			setError(ERRORS.difPassword);
		}

		fetch(`${URL_EXPO}:3000/users/password/${user.token}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password: newPassword }),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					setSuccess(true);
				} else {
					setError(`ECHEC DE L'ACTUALISATION`);
				}
			});
	};

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
					navigation.navigate('Login');
				}
			});
	};

	const UpdateHtml = (
		<>
			{success ? (
				<Text>Votre mot de passe a bien été mis à jour</Text>
			) : (
				<View
					style={{
						minWidth: '105%',
					}}>
					<PasswordInput
						label="Nouveau mot de passe"
						theme={COLORS_THEME.light}
						onchangetext={(value) => setNewPassword(value)}
						value={newPassword}
					/>
					<PasswordInput
						label="Confirmer le mot de passe"
						theme={COLORS_THEME.light}
						onchangetext={(value) => setNewConfirmedPassword(value)}
						value={newConfirmedPassword}
					/>

					{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}
					<View style={styles.modalBtnContainer}>
						<Button
							type="secondary"
							label="Annuler"
							onpress={() => setUpdateModalVisible(false)}
						/>
						<Button type="primary" label="Valider" onpress={handleUpdate} />
					</View>
				</View>
			)}
		</>
	);

	const DeleteHtml = (
		<>
			<Text style={styles.modalText}>
				La suppression est définitive, êtes vous sûr(e) de vouloir continuer ?
			</Text>
			<View style={styles.modalBtnContainer}>
				<Button
					type="secondary"
					label="Non"
					onpress={() => setDeleteModalVisible(false)}
				/>
				<Button type="primary" label="Oui" onpress={handleDelete} />
			</View>
		</>
	);

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
					onpress={() => {
						setUpdateModalVisible(true);
					}}
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
						onpress={() => setDeleteModalVisible(true)}
					/>
				</View>
			</View>

			<ModalModel
				visible={updateModalVisible}
				setVisible={setUpdateModalVisible}
				title="MODIFICATION DU MOT DE PASSE"
				children={UpdateHtml}
			/>

			<ModalModel
				visible={deleteModalVisible}
				setVisible={setDeleteModalVisible}
				title="SUPPRESSION DU COMPTE"
				children={DeleteHtml}
			/>

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
	modalBtnContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	modalText: {
		fontSize: 18,
		textAlign: 'center',
	},
});

export default SafetyScreen;
