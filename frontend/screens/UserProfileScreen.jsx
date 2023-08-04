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
import Snap from './Snap';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import DatePicker from '../components/DatePicker';
import ModalModel from '../components/ModalModel';
import ButtonIcon from '../components/ButtonIcon';
import DropdownLanguage from '../components/DropdownLanguage';
import HobbiesAutoCompleteHomeMade from '../components/HobbiesAutoCompleteHomeMade';
import * as ImagePicker from 'expo-image-picker';

const EDITABLES = {
	city: 'city',
};

const UserProfileScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user.value);
	const [isEnabled, setIsEnabled] = useState(user.canHost);
	const [isEditable, setIsEditable] = useState('');
	const [firstname, setFirstname] = useState(null);
	const [lastname, setLastname] = useState(null);
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [description, setDescription] = useState(null);
	const [newCity, setNewCity] = useState('');
	const [city, setCity] = useState('');
	const [spokenLanguages, setSpokenLanguages] = useState(user.spokenLanguages);
	const [error, setError] = useState('');
	const [updateAvatarVisible, setUpdateAvatarVisible] = useState(false);
	const [updateDetailsVisible, setUpdateDetailsVisible] = useState(false);
	const [updateInfoVisible, setUpdateInfoVisible] = useState(false);
	const [updatePassionVisible, setUpdatePassionVisible] = useState(false);
	const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
	const [hasCameraPermission, setHasCameraPermission] = useState(false);
	const [cameraOpen, setCameraOpen] = useState(false);
	const [image, setImage] = useState(null);
	const [hobbies, setHobbies] = useState(user.hobbies);

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

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
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

	const [remoteDataSet, setRemoteDataSet] = useState([]);

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

			<Textarea
				label="Description"
				theme={COLORS_THEME.light}
				autoFocus={false}
				onChangeText={(value) => setDescription(value)}
				value={description}
			/>
			{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}
			<View style={styles.optionsContainer}>
				<ButtonIcon
					type="secondary"
					size={18}
					name="arrow-undo-outline"
					onpress={() => {
						setError('');
						setFirstname(null);
						setLastname(null);
						setDateOfBirth(new Date());
						setDescription(null);
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
							description: description || user.description,
						});
						setFirstname(null);
						setLastname(null);
						setDateOfBirth(new Date());
						setDescription(null);
						setUpdateDetailsVisible(false);
					}}
				/>
			</View>
		</View>
	);

	// TODO opti création component
	const updateInfo = (
		<View style={styles.inputContainer}>
			<View
				style={{
					width: '100%',
					alignItems: 'center',
				}}>
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
			</View>

			<View style={styles.optionsContainer}>
				<ButtonIcon
					type="secondary"
					size={18}
					name="arrow-undo-outline"
					onpress={() => {
						setUpdateInfoVisible(false);
					}}
				/>
				<ButtonIcon
					type="primary"
					size={18}
					name="checkmark-outline"
					onpress={() => {
						handleUpdate({
							city,
						});
						setCity('');
						setUpdateInfoVisible(false);
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
			<View style={styles.optionsContainer}>
				<Text style={STYLES_GLOBAL.subTitle}>MON PROFIL</Text>
				<ButtonIcon
					type="secondary"
					name="arrow-undo-outline"
					onpress={() => {
						navigation.navigate('TabNavigator', { screen: 'Settings' });
					}}
				/>
			</View>

			<View style={[styles.optionsContainer, styles.imageContainer]}>
				<View
					style={{
						width: 150,
						padding: 10,
					}}>
					<Image
						source={{
							uri: user.avatarUrl,
						}}
						style={styles.image}
					/>
					<View
						style={{
							...StyleSheet.absoluteFillObject,
							top: '65%',
							left: '75%',
							margin: -20,
						}}>
						<ButtonIcon
							type="primary"
							name="camera-reverse-outline"
							onpress={() => {
								setUpdateAvatarVisible(true);
							}}
						/>
					</View>
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
						onValueChange={toggleSwitch}
						value={isEnabled}
					/>
				</View>
			</View>

			<View style={styles.detailsContainer}>
				<View style={styles.optionsBtnContainer}>
					<View style={styles.nameContainer}>
						<Text style={styles.name}>
							{user.firstname} {user.lastname}
						</Text>
						<Text style={styles.age}> - {getAge(user.dateOfBirth)} ans</Text>
					</View>

					<ButtonIcon
						type="transparent"
						size={18}
						name="pencil-outline"
						onpress={() => {
							setUpdateDetailsVisible(true);
						}}
					/>
				</View>

				<View style={styles.optionsContainer}>
					<Text style={STYLES_GLOBAL.textDark}>{user.description}</Text>
				</View>
			</View>

			<View style={styles.detailsContainer}>
				<Text style={styles.subTitle}>Informations</Text>

				<View style={styles.optionsContainer}>
					<View style={styles.optionsContainer}>
						<Text style={[STYLES_GLOBAL.textDark, styles.details]}>
							Lieu de résidence
						</Text>
						<View
							style={[styles.optionsBtnContainer, { width: 'fit-content' }]}>
							<Text style={[STYLES_GLOBAL.textDark, styles.details]}>
								{user.city.name}
							</Text>
							<ButtonIcon
								type="transparent"
								size={18}
								name="pencil-outline"
								onpress={() => {
									setNewCity('');
									setUpdateInfoVisible(true);
								}}
							/>
						</View>
					</View>
				</View>

				<View style={styles.optionsContainer}>
					{isEditable !== EDITABLES.languages ? (
						<>
							<Text style={[STYLES_GLOBAL.textDark, styles.details]}>
								Langues parlées
							</Text>
							<View style={styles.languagesContainer}>
								{user.spokenLanguages.map((language, i) => (
									<Text
										key={i}
										style={[STYLES_GLOBAL.textDark, styles.details]}>
										{language}
									</Text>
								))}
								<ButtonIcon
									type="transparent"
									size={18}
									name="pencil-outline"
									onpress={() => {
										setIsEditable(EDITABLES.languages);
									}}
								/>
							</View>
						</>
					) : (
						<>
							<View style={{ flex: 1 }}>
								<DropdownLanguage
									spokenLanguages={spokenLanguages}
									setSpokenLanguages={setSpokenLanguages}
								/>
							</View>

							<ButtonIcon
								type="transparent"
								size={18}
								name="checkmark-outline"
								onpress={() => {
									handleUpdate({ spokenLanguages });
									setIsEditable('');
								}}
							/>
						</>
					)}
				</View>
			</View>

			<View style={styles.detailsContainer}>
				<View style={styles.optionsBtnContainer}>
					<Text style={styles.subTitle}>Passions</Text>
					<ButtonIcon
						type="transparent"
						size={18}
						name="pencil-outline"
						onpress={() => {
							setUpdatePassionVisible(true);
						}}
					/>
				</View>
				<View style={styles.optionsContainer}>
					{user.hobbies.map((h, i) => (
						<View key={i} style={styles.hobbyContainer}>
							<Text style={styles.hobby}>{h}</Text>
						</View>
					))}
				</View>
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
				title="MISE A JOUR DE VOS PASSIONS"
				children={updateInfo}
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
		paddingVertical: 40,
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	inputContainer: {
		width: '100%',
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	optionsContainer: {
		width: Platform.OS === 'ios' ? '90%' : '100%',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
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
	},

	detailsContainer: {
		width: Platform.OS === 'ios' ? '90%' : '100%',
	},
	nameContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'flex-start',
	},
	languagesContainer: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	imageContainer: {
		padding: 20,
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 250,
	},
	age: {
		marginRight: 20,
	},
	name: {
		fontSize: 24,
		letterSpacing: 1,
		color: COLORS.darkBlue,
		textTransform: 'capitalize',
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
	details: {
		paddingVertical: 2,
	},
});

export default UserProfileScreen;
