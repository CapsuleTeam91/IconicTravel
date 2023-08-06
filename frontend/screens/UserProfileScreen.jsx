import {
	FlatList,
	Image,
	SafeAreaView,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Camera } from 'expo-camera';
import { addData } from '../reducers/user';
import { ERRORS } from '../utils/constants';
import { URL_EXPO } from '../environnement';
import { checkDOB, getAge } from '../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
import Snap from '../components/camera/Snap';
import Input from '../components/forms/Input';
import Textarea from '../components/forms/Textarea';
import DatePicker from '../components/DatePicker';
import ModalModel from '../components/modals/ModalModel';
import ButtonIcon from '../components/ButtonIcon';
import DropdownLanguage from '../components/forms/DropdownLanguage';
import HobbiesAutoCompleteHomeMade from '../components/forms/HobbiesAutoCompleteHomeMade';
import * as ImagePicker from 'expo-image-picker';
import HeaderUpdateProfile from '../components/boxes/HeaderUpdateProfile';

const UserProfileScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user.value);
	const [editViewEnabled, setEditViewEnabled] = useState(false);
	const [remoteDataSet, setRemoteDataSet] = useState([]);

	const [isEnabled, setIsEnabled] = useState(user.canHost);
	const [isEditable, setIsEditable] = useState('');
	const [firstname, setFirstname] = useState(null);
	const [lastname, setLastname] = useState(null);
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [description, setDescription] = useState(user.description);
	const [newCity, setNewCity] = useState('');
	const [city, setCity] = useState('');
	const [spokenLanguages, setSpokenLanguages] = useState(user.spokenLanguages);
	const [error, setError] = useState('');
	const [updateAvatarVisible, setUpdateAvatarVisible] = useState(false);
	const [updateDetailsVisible, setUpdateDetailsVisible] = useState(false);
	const [updateInfoVisible, setUpdateInfoVisible] = useState(false);
	const [updateLanguagesVisible, setUpdateLanguagesVisible] = useState(false);

	const [updatePassionVisible, setUpdatePassionVisible] = useState(false);
	const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
	const [hasCameraPermission, setHasCameraPermission] = useState(false);
	const [cameraOpen, setCameraOpen] = useState(false);
	const [image, setImage] = useState(null);
	const [hobbies, setHobbies] = useState(user.hobbies);

	// HOSTING
	const toggleSwitch = () => {
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

	// CITY
	const getSuggestions = useCallback(async (q) => {
		setNewCity(q);
		const filterToken = q.toLowerCase();

		if (typeof q !== 'string' || q.length < 3) {
			setRemoteDataSet([]);
			return;
		}

		// setLoading(true);

		const URL = `https://www.mapquestapi.com/geocoding/v1/address?key=WvE5tMdxgRUWtFIPcZXO1qITivOTwk7V&location=${filterToken}`;
		const response = await fetch(URL);
		const items = await response.json();
		const detailedCities = items.results[0].locations;

		const suggestions = detailedCities.map((city, i) => ({
			id: i,
			title: `${city.adminArea5}, ${city.adminArea4}`,
			name: city.adminArea5,
			latitude: city.displayLatLng.lat,
			longitude: city.displayLatLng.lng,
		}));

		setRemoteDataSet(suggestions);
		// setLoading(false);
	}, []);

	// REQUESTS
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

	// CAMERA
	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(status === 'granted');
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const galleryStatus =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			setHasGalleryPermission(galleryStatus);
		})();
	}, []);

	// TODO style
	const updateAvatar = (
		<View
			style={{
				width: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: 20,
			}}>
			{image && (
				<Image
					source={{
						uri: image,
					}}
					style={styles.image}
				/>
			)}
			{isFocused && cameraOpen && (
				<Snap
					setImage={setImage}
					setCameraOpen={setCameraOpen}
					// navigation={navigation}
				/>
			)}
			<View style={styles.btnContainer}>
				{hasGalleryPermission && (
					<ButtonIcon type="secondary" name="images" onpress={pickImage} />
				)}
				{hasCameraPermission && (
					<ButtonIcon
						type="secondary"
						name="camera-outline"
						onpress={() => setCameraOpen(!cameraOpen)}
					/>
				)}
			</View>
			<View style={styles.optionsContainer}>
				<ButtonIcon
					type="secondary"
					size={18}
					name="arrow-undo-outline"
					onpress={() => {
						setImage(null);
						setUpdateAvatarVisible(false);
					}}
				/>
				<ButtonIcon
					type="primary"
					size={18}
					name="checkmark-outline"
					onpress={handleAvatarUpdate}
				/>
			</View>
		</View>
	);

	const updateDetails = (
		<View style={styles.inputContainer}>
			<Input
				label={user.firstname}
				theme={COLORS_THEME.light}
				autoFocus={false}
				autoCapitalize="none"
				keyboardType="default"
				onChangeText={(value) => setFirstname(value)}
				value={firstname}
			/>
			<Input
				label={user.lastname}
				theme={COLORS_THEME.light}
				autoFocus={false}
				autoCapitalize="none"
				keyboardType="default"
				onChangeText={(value) => setLastname(value)}
				value={lastname}
			/>
			<DatePicker
				date={dateOfBirth}
				theme={COLORS_THEME.light}
				label={
					dateOfBirth.toLocaleDateString() !== new Date().toLocaleDateString()
						? dateOfBirth.toLocaleDateString()
						: new Date(user.dateOfBirth).toLocaleDateString()
				}
				onconfirm={(date) => setDateOfBirth(date)}
			/>

			<Input
				label={city.latitude ? 'Ville sélectionnée' : user.city.name}
				theme={COLORS_THEME.light}
				autoFocus={false}
				autoCapitalize="none"
				keyboardType="default"
				onChangeText={(value) => getSuggestions(value)}
				value={newCity}
			/>
			{remoteDataSet.length > 0 && (
				<FlatList
					data={remoteDataSet}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() =>
								setCity(
									!item?.name
										? user.city
										: {
												name: item.name,
												latitude: item.latitude,
												longitude: item.longitude,
										  }
								)
							}
							style={{
								paddingVertical: 5,
								paddingHorizontal: 10,
								margin: 2,
								borderRadius: 8,
								backgroundColor:
									city.latitude === item.latitude
										? COLORS.lightBlue
										: COLORS.pink,
							}}
							activeOpacity={0.8}>
							<Text style={{ fontSize: 16, color: COLORS.bg }}>
								{item.title}
							</Text>
						</TouchableOpacity>
					)}
					contentContainerStyle={{
						minWidth: '70%',
					}}
				/>
			)}

			{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}
			<View style={styles.optionsContainer}>
				<ButtonIcon
					type="secondary"
					size={18}
					name="arrow-back-outline"
					onpress={() => {
						setError('');
						setFirstname(null);
						setLastname(null);
						setDateOfBirth(new Date());
						setCity(null);
						setUpdateDetailsVisible(false);
					}}
				/>
				<ButtonIcon
					type="primary"
					size={18}
					name="checkmark-outline"
					onpress={() => {
						setError('');
						if (checkDOB(dateOfBirth)) {
							setError('18 ans ou plus');
							return;
						}
						handleUpdate({
							firstname: firstname?.trim() || user.firstname,
							lastname: lastname?.trim() || user.lastname,
							dateOfBirth,
							city,
						});

						setCity(null);
						setFirstname(null);
						setLastname(null);
						setDateOfBirth(new Date());
						setUpdateDetailsVisible(false);
					}}
				/>
			</View>
		</View>
	);

	const updateInfo = (
		<View style={styles.inputContainer}>
			<Textarea
				label={description ? '' : 'Description'}
				theme={COLORS_THEME.light}
				autoFocus={false}
				onChangeText={(value) => setDescription(value)}
				value={description}
			/>

			<View style={styles.optionsContainer}>
				<ButtonIcon
					type="secondary"
					size={18}
					name="arrow-back-outline"
					onpress={() => {
						setUpdateInfoVisible(false);
						setDescription(null);
					}}
				/>
				<ButtonIcon
					type="primary"
					size={18}
					name="checkmark-outline"
					onpress={() => {
						handleUpdate({
							description: description || user.description,
						});
						setDescription(null);
						setUpdateInfoVisible(false);
					}}
				/>
			</View>
		</View>
	);

	const updateLanguages = (
		<View style={styles.inputContainer}>
			<DropdownLanguage
				spokenLanguages={spokenLanguages}
				setSpokenLanguages={setSpokenLanguages}
			/>

			<View style={styles.optionsContainer}>
				<ButtonIcon
					type="secondary"
					size={18}
					name="arrow-back-outline"
					onpress={() => {
						setUpdateLanguagesVisible(false);
					}}
				/>
				<ButtonIcon
					type="primary"
					size={18}
					name="checkmark-outline"
					onpress={() => {
						handleUpdate({ spokenLanguages });
						setUpdateLanguagesVisible(false);
					}}
				/>
			</View>
		</View>
	);

	const updatePassion = (
		<View style={styles.inputContainer}>
			<HobbiesAutoCompleteHomeMade
				hobbies={hobbies}
				setHobbies={setHobbies}
				error={error}
				setError={setError}
			/>
			<View style={styles.optionsContainer}>
				<ButtonIcon
					type="secondary"
					size={18}
					name="arrow-undo-outline"
					onpress={() => {
						setUpdatePassionVisible(false);
					}}
				/>
				<ButtonIcon
					type="primary"
					size={18}
					name="checkmark-outline"
					onpress={() => {
						handleUpdate({
							hobbies,
						});
						setUpdatePassionVisible(false);
					}}
				/>
			</View>
		</View>
	);

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
					style={[styles.detailsContainer, editViewEnabled && styles.border]}
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
					onPress={() => editViewEnabled && setUpdateInfoVisible(true)}
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
						alignItems: 'center',
					}}>
					<TouchableOpacity
						style={[styles.detailsContainer, editViewEnabled && styles.border]}
						onPress={() => editViewEnabled && setUpdateLanguagesVisible(true)}
						activeOpacity={0.8}>
						<Text style={STYLES_GLOBAL.textDark}>Je parle :</Text>
						<View style={styles.languagesContainer}>
							{user.spokenLanguages.map((language, i) => (
								<Text
									key={i}
									style={[
										STYLES_GLOBAL.textDark,
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
					</TouchableOpacity>

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
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
					</View>
				</View>

				<TouchableOpacity
					style={[styles.detailsContainer, editViewEnabled && styles.border]}
					onPress={() => editViewEnabled && setUpdatePassionVisible(true)}
					activeOpacity={0.8}>
					<Text style={STYLES_GLOBAL.textDark}>Mes Passions : </Text>
					<View style={styles.optionsContainer}>
						{user.hobbies.map((h, i) => (
							<View key={i} style={styles.hobbyContainer}>
								<Text style={styles.hobby}>{h}</Text>
							</View>
						))}
					</View>
				</TouchableOpacity>
			</View>

			<ModalModel
				visible={updateDetailsVisible}
				setVisible={setUpdateDetailsVisible}
				title="MISE A JOUR DU PROFIL"
				children={updateDetails}
			/>

			<ModalModel
				visible={updateAvatarVisible}
				setVisible={setUpdateAvatarVisible}
				title="MISE A JOUR DE VOTRE PHOTO"
				children={updateAvatar}
			/>

			<ModalModel
				visible={updateInfoVisible}
				setVisible={setUpdateInfoVisible}
				title="MAIS QUI ÊTES-VOUS ?"
				children={updateInfo}
			/>

			<ModalModel
				visible={updateLanguagesVisible}
				setVisible={setUpdateLanguagesVisible}
				title="QUELLES LANGUES PARLEZ-VOUS ?"
				children={updateLanguages}
			/>

			<ModalModel
				visible={updatePassionVisible}
				setVisible={setUpdatePassionVisible}
				title="MISE A JOUR DE VOS PASSIONS"
				children={updatePassion}
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
		minWidth: '100%',
		marginTop: 160,
		alignItems: 'center',
		justifyContent: 'space-around',
		backgroundColor: COLORS.bg,
		borderTopLeftRadius: 100,
	},
	detailsContainer: {
		// width: Platform.OS === 'ios' ? '90%' : '100%',
		// flex: 1,
		padding: 20,
		marginTop: 50,
		paddingHorizontal: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	border: {
		borderColor: COLORS.lightBlue,
		borderWidth: 1,
		borderRadius: 30,
		shadowColor: COLORS.lightBlue,
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,
		elevation: 2,
	},

	inputContainer: {
		width: '100%',
		// marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	optionsContainer: {
		width: Platform.OS === 'ios' ? '90%' : '100%',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: 'red',
	},
	optionsBtnContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
	},
	btnContainer: {
		width: '70%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	switchContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		marginTop: 50,
		paddingHorizontal: 40,
	},

	languagesContainer: {
		// flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'flex-end',
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

	subTitle: {
		fontSize: 24,
		marginRight: 10,
		color: COLORS.darkBlue,
		textTransform: 'uppercase',
	},
	hobbyContainer: {
		margin: 5,
		borderRadius: 25,
		overflow: 'hidden',
	},
	hobby: {
		color: COLORS.bg,
		paddingVertical: 5,
		paddingHorizontal: 7,
		backgroundColor: COLORS.lightBlue,
	},
});

export default UserProfileScreen;
