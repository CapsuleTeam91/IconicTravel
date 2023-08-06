import {
	Image,
	SafeAreaView,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useState } from 'react';
import { getAge } from '../utils/helper';
import { addData } from '../reducers/user';
import { ERRORS } from '../utils/constants';
import { URL_EXPO } from '../environnement';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { UpdateAvatarChildren } from '../components/modals/UpdateAvatarChildren';
import { UpdateHobbiesChildren } from '../components/modals/UpdateHobbiesChildren';
import { UpdateDetailesChildren } from '../components/modals/UpdateDetailsChildren';
import { UpdateLanguagesChildren } from '../components/modals/UpdateLanguagesChildren';
import { UpdateDescriptionChildren } from '../components/modals/UpdateDescriptionChildren';
import ButtonIcon from '../components/ButtonIcon';
import ModalModel from '../components/modals/ModalModel';
import HeaderUpdateProfile from '../components/boxes/HeaderUpdateProfile';
import FooterUpdateProfile from '../components/boxes/FooterUpdateProfile';

const UserProfileScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user.value);
	const [editViewEnabled, setEditViewEnabled] = useState(false);
	const [isEnabled, setIsEnabled] = useState(user.canHost);
	const [image, setImage] = useState(null);
	const [firstname, setFirstname] = useState(null);
	const [lastname, setLastname] = useState(null);
	const [dateOfBirth, setDateOfBirth] = useState(new Date(user.dateOfBirth));
	const [description, setDescription] = useState(user.description);
	const [city, setCity] = useState('');
	const [hobbies, setHobbies] = useState(user.hobbies);
	const [spokenLanguages, setSpokenLanguages] = useState(user.spokenLanguages);
	const [error, setError] = useState('');
	const [updateAvatarVisible, setUpdateAvatarVisible] = useState(false);
	const [updateDetailsVisible, setUpdateDetailsVisible] = useState(false);
	const [updateDescriptionVisible, setUpdateDescriptionVisible] =
		useState(false);
	const [updateLanguagesVisible, setUpdateLanguagesVisible] = useState(false);
	const [updateHobbiesVisible, setUpdateHobbiesVisible] = useState(false);

	// REQUESTS
	const handleUpdateCanHost = () => {
		fetch(`${URL_EXPO}:3000/users/hosting/${user.token}`, { method: 'PUT' })
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					setIsEnabled(data.canHost);
					dispatch(addData({ canHost: data.canHost }));
				} else {
					setError(ERRORS[`err${data.status}`]);
				}
			});
	};

	const handleAvatarUpdate = () => {
		// if no image selected close modal
		if (!image) {
			setUpdateAvatarVisible(false);
			return;
		}
		// delete previous avatar
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

		// create new avatar url
		const formData = new FormData();

		formData.append('avatar', {
			uri: image,
			name: 'photo.jpg',
			type: 'image/jpeg',
		});

		fetch(`${URL_EXPO}:3000/users/upload`, {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					handleUpdate({ avatarUrl: data.url });
					setImage(null);
					setUpdateAvatarVisible(false);
				}
			});
	};

	const handleUpdate = (data) => {
		console.log(data);
		fetch(`${URL_EXPO}:3000/users/update/${user.token}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then((response) =>
				response.status > 400 ? response.status : response.json()
			)
			.then((userFound) => {
				if (typeof userFound === 'number') {
					setError(ERRORS[`err${userFound}`]);
					return;
				}
				if (userFound.result) {
					console.log('User updated reçu avant dispatch:', userFound.data);
					const {
						firstname,
						lastname,
						dateOfBirth,
						email,
						token,
						avatarUrl,
						description,
						city,
						spokenLanguages,
						hobbies,
						travels,
					} = userFound.data;
					dispatch(
						addData({
							firstname,
							lastname,
							dateOfBirth,
							email,
							token,
							avatarUrl,
							description,
							city,
							spokenLanguages,
							hobbies,
							travels,
						})
					);
				} else {
					setError(ERRORS[`err${userFound.status}`]);
				}
			});
	};

	return (
		<SafeAreaView style={styles.container}>
			<HeaderUpdateProfile
				editViewEnabled={editViewEnabled}
				handleNagitaion={() => {
					navigation.navigate('TabNavigator', { screen: 'Settings' });
				}}
				handleUpdateView={() => setEditViewEnabled(!editViewEnabled)}
			/>

			<View
				style={{
					...StyleSheet.absoluteFillObject,
					top: 80,
					width: '100%',
					height: 140,
					alignItems: 'center',
					padding: 20,
					zIndex: 3,
				}}>
				<Image
					source={{
						uri: user.avatarUrl,
					}}
					style={styles.image}
				/>
				{editViewEnabled && (
					<View
						style={{
							...StyleSheet.absoluteFillObject,
							top: 90,
							left: '60%',
						}}>
						<ButtonIcon
							type="secondaryLight"
							name="camera-reverse-outline"
							onpress={() => {
								setUpdateAvatarVisible(true);
							}}
						/>
					</View>
				)}
			</View>

			<View style={styles.wrapperLayer}>
				<TouchableOpacity
					style={[
						styles.detailsContainer,
						{ marginTop: 50 },
						editViewEnabled && styles.border,
					]}
					onPress={() => editViewEnabled && setUpdateDetailsVisible(true)}
					activeOpacity={0.8}>
					<Text
						style={[
							styles.name,
							{
								color: editViewEnabled ? COLORS.lightBlue : COLORS.darkBlue,
							},
						]}>
						{user.firstname} {user.lastname}
					</Text>

					<Text
						style={[
							styles.details,
							{
								color: editViewEnabled ? COLORS.lightBlue : COLORS.darkBlue,
							},
						]}>
						{user.city.name}
					</Text>

					<Text
						style={[
							styles.age,
							{
								color: editViewEnabled ? COLORS.lightBlue : COLORS.darkBlue,
							},
						]}>
						{getAge(user.dateOfBirth)} ans
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.detailsContainer, editViewEnabled && styles.border]}
					onPress={() => editViewEnabled && setUpdateDescriptionVisible(true)}
					activeOpacity={0.8}>
					<Text
						style={[
							STYLES_GLOBAL.textDark,
							{
								color: editViewEnabled ? COLORS.lightBlue : COLORS.darkBlue,
							},
						]}>
						{user.description}
					</Text>
				</TouchableOpacity>

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'flex-start',
					}}>
					<TouchableOpacity
						style={[styles.detailsContainer, editViewEnabled && styles.border]}
						onPress={() => editViewEnabled && setUpdateHobbiesVisible(true)}
						activeOpacity={0.8}>
						<Text style={STYLES_GLOBAL.textDark}>Mes Passions : </Text>

						{user.hobbies.map((h, i) => (
							<View key={i} style={styles.hobbyContainer}>
								<Text style={styles.hobby}>{h}</Text>
							</View>
						))}
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.detailsContainer}
						onPress={() => editViewEnabled && setUpdateLanguagesVisible(true)}
						activeOpacity={0.8}>
						<Text style={STYLES_GLOBAL.textDark}>Je parle :</Text>
						<View
							style={[
								styles.languagesContainer,
								editViewEnabled && styles.border,
							]}>
							{user.spokenLanguages.map((language, i) => (
								<Text
									key={i}
									style={[
										styles.spokenLanguages,
										{
											color: editViewEnabled
												? COLORS.lightBlue
												: COLORS.darkBlue,
										},
									]}>
									{language}
								</Text>
							))}
						</View>
						<View style={styles.switchContainer}>
							<Text style={STYLES_GLOBAL.subTitle}>Iconic Host</Text>
							<Switch
								trackColor={{ false: COLORS.darkBlue, true: COLORS.pink }}
								thumbColor={isEnabled ? COLORS.bg : COLORS.lightBlue}
								style={{
									marginTop: 10,
									transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
								}}
								ios_backgroundColor={COLORS.lightBlue}
								onValueChange={handleUpdateCanHost}
								value={isEnabled}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</View>

			<FooterUpdateProfile />

			<ModalModel
				visible={updateAvatarVisible}
				setVisible={setUpdateAvatarVisible}
				title="MISE A JOUR DE VOTRE PHOTO"
				children={
					<UpdateAvatarChildren
						{...{
							image,
							setImage,
							isFocused,
							handleAvatarUpdate,
							setUpdateAvatarVisible,
						}}
					/>
				}
			/>

			<ModalModel
				visible={updateDetailsVisible}
				setVisible={setUpdateDetailsVisible}
				title="MISE A JOUR DU PROFIL"
				children={
					<UpdateDetailesChildren
						{...{
							user,
							firstname,
							setFirstname,
							lastname,
							setLastname,
							dateOfBirth,
							setDateOfBirth,
							error,
							city,
							setCity,
							setError,
							handleUpdate,
							setUpdateDetailsVisible,
						}}
					/>
				}
			/>

			<ModalModel
				visible={updateDescriptionVisible}
				setVisible={setUpdateDescriptionVisible}
				title="MAIS QUI ÊTES-VOUS ?"
				children={
					<UpdateDescriptionChildren
						{...{
							user,
							description,
							setDescription,
							handleUpdate,
							setUpdateDescriptionVisible,
						}}
					/>
				}
			/>

			<ModalModel
				visible={updateLanguagesVisible}
				setVisible={setUpdateLanguagesVisible}
				title="QUELLES LANGUES PARLEZ-VOUS ?"
				children={
					<UpdateLanguagesChildren
						{...{
							spokenLanguages,
							setSpokenLanguages,
							handleUpdate,
							setUpdateLanguagesVisible,
						}}
					/>
				}
			/>

			<ModalModel
				visible={updateHobbiesVisible}
				setVisible={setUpdateHobbiesVisible}
				title="MISE A JOUR DE VOS PASSIONS"
				children={
					<UpdateHobbiesChildren
						{...{
							hobbies,
							setHobbies,
							handleUpdate,
							error,
							setError,
							setUpdateHobbiesVisible,
						}}
					/>
				}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: COLORS.darkBlue,
	},
	wrapperLayer: {
		marginTop: 160,
		// height: '100%',
		minWidth: '100%',
		alignItems: 'center',
		borderTopLeftRadius: 100,
		borderBottomRightRadius: 100,
		backgroundColor: COLORS.bg,
	},
	detailsContainer: {
		// width: Platform.OS === 'ios' ? '90%' : '100%',
		paddingHorizontal: 20,
		marginBottom: 5,
		alignItems: 'center',
		// borderWidth: 1,
		// borderColor: 'red',
	},
	border: {
		borderWidth: 1,
		borderRadius: 30,
		borderColor: '#DDE6ED',
		shadowColor: COLORS.bg,
		// shadowOffset: {
		// 	width: 0,
		// 	height: 1,
		// },
		// shadowOpacity: 0.2,
		// shadowRadius: 1.41,
		// elevation: 2,
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 250,
	},
	name: {
		fontSize: 28,
		fontWeight: '700',
		letterSpacing: 1,
		textTransform: 'capitalize',
	},
	details: {
		fontSize: 26,
	},
	age: {
		fontSize: 16,
	},
	languagesContainer: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	spokenLanguages: {
		fontSize: 16,
		letterSpacing: 1,
		fontWeight: '700',
		paddingHorizontal: 5,
	},
	switchContainer: {
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	hobbyContainer: {
		margin: 2,
		borderRadius: 25,
		overflow: 'hidden',
	},
	hobby: {
		color: COLORS.bg,
		paddingVertical: 6,
		paddingHorizontal: 10,
		backgroundColor: COLORS.lightBlue,
	},
});

export default UserProfileScreen;
