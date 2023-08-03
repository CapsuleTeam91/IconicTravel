import {
	Image,
	SafeAreaView,
	StyleSheet,
	Switch,
	Text,
	View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { getAge } from '../utils/helper';
import { addData } from '../reducers/user';
import { ERRORS } from '../utils/constants';
import { URL_EXPO } from '../environnement';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
import ButtonIcon from '../components/ButtonIcon';
import Input from '../components/Input';
import DatePicker from '../components/DatePicker';
import ModalModel from '../components/ModalModel';
import Textarea from '../components/Textarea';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

import { Camera } from 'expo-camera';

import * as ImagePicker from 'expo-image-picker';
import { RemoteDataSet } from '../components/RemoteDataSet';
import DropdownLanguage from '../components/DropdownLanguage';
import Snap from './Snap';
import { useIsFocused } from '@react-navigation/native';

const UserProfileScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user.value);
	const [isEnabled, setIsEnabled] = useState(user.canHost);
	const [isEditable, setIsEditable] = useState(false);

	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [description, setDescription] = useState('');
	const [city, setCity] = useState('');
	const [spokenLanguages, setSpokenLanguages] = useState([]);

	const [error, setError] = useState('');

	const [updateAvatarVisible, setUpdateAvatarVisible] = useState(false);
	const [updateDetailsVisible, setUpdateDetailsVisible] = useState(false);
	const [updateInfoVisible, setUpdateInfoVisible] = useState(false);
	const [updatePassionVisible, setUpdatePassionVisible] = useState(false);
	const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
	const [hasCameraPermission, setHasCameraPermission] = useState(false);
	const [cameraOpen, setCameraOpen] = useState(false);
	const [image, setImage] = useState(null);

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

	const addCity = (newCity) => {
		if (!newCity) return;
		setCity({
			name: newCity.name,
			latitude: newCity.latitude,
			longitude: newCity.longitude,
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
			{cameraOpen && (
				<Snap
					setImage={setImage}
					setCameraOpen={setCameraOpen}
					navigation={navigation}
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
						onpress={() => setCameraOpen(true)}
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
					onpress={() => console.log(image)}
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

			<View style={styles.optionsContainer}>
				<ButtonIcon
					type="secondary"
					size={18}
					name="arrow-undo-outline"
					onpress={() => {
						setUpdateDetailsVisible(false);
					}}
				/>
				<ButtonIcon
					type="primary"
					size={18}
					name="checkmark-outline"
					onpress={() => {}}
				/>
			</View>
		</View>
	);

	const updateInfo = (
		<View style={styles.inputContainer}>
			<AutocompleteDropdownContextProvider>
				<RemoteDataSet
					addCity={addCity}
					label="Ville de Résidence"
					ligthTheme={false}
					clear={() => setCity('')}
				/>
				<DropdownLanguage
					spokenLanguages={spokenLanguages}
					setSpokenLanguages={setSpokenLanguages}
				/>
			</AutocompleteDropdownContextProvider>

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
					onpress={() => {}}
				/>
			</View>
		</View>
	);

	const updatePassion = (
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
					onpress={() => {}}
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
				<Image
					source={{
						uri: user.avatarUrl,
					}}
					style={styles.image}
				/>
				<ButtonIcon
					type="transparent"
					size={18}
					name="camera-reverse-outline"
					onpress={() => {
						setUpdateAvatarVisible(true);
					}}
				/>

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
						name={isEditable ? 'checkmark-outline' : 'pencil-outline'}
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
				<View style={styles.optionsBtnContainer}>
					<Text style={styles.subTitle}>Informations</Text>
					<ButtonIcon
						type="transparent"
						size={18}
						name="pencil-outline"
						onpress={() => {
							setUpdateInfoVisible(true);
						}}
					/>
				</View>

				<View style={styles.optionsContainer}>
					<Text style={[STYLES_GLOBAL.textDark, styles.details]}>
						Lieu de résidence
					</Text>
					<Text style={[STYLES_GLOBAL.textDark, styles.details]}>
						{user.city.name}
					</Text>
				</View>
				<View style={styles.optionsContainer}>
					<Text style={[STYLES_GLOBAL.textDark, styles.details]}>
						Langues parlées
					</Text>
					<View style={styles.languagesContainer}>
						{user.spokenLanguages.map((language, i) => (
							<Text key={i} style={[STYLES_GLOBAL.textDark, styles.details]}>
								{language}
							</Text>
						))}
					</View>
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
				title="MISE A JOUR DE VOS INFORMATIONS"
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
