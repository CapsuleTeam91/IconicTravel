import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { useDispatch } from 'react-redux';
import { addAvatar } from '../reducers/user';
import { URL_EXPO } from '../utils/constants';
import { DEFAULT_AVATAR } from '../utils/constants';
import { useIsFocused } from '@react-navigation/native';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import {
	ActivityIndicator,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Snap from '../components/camera/Snap';
import ButtonIcon from '../components/buttons/ButtonIcon';
import HeaderCreateProfile from '../components/boxes/HeaderCreateProfile';
import FooterCreateProfile from '../components/boxes/FooterCreateProfile';

const ProfileStepOneScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
	const [hasCameraPermission, setHasCameraPermission] = useState(false);
	const [cameraOpen, setCameraOpen] = useState(false);
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

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

	const handleRegister = () => {
		if (!image) {
			dispatch(addAvatar(DEFAULT_AVATAR));
			navigation.navigate('ProfileStepTwo');
			return;
		}

		const formData = new FormData();

		formData.append('avatar', {
			uri: image,
			name: 'photo.jpg',
			type: 'image/jpeg',
		});

		setLoading(true);

		fetch(`${URL_EXPO}/users/upload`, {
			method: 'POST',
			body: formData,
		})
			.then((response) => response.json())
			.then((data) => {
				// If user doesn't select image we will give a default one
				if (data.result) {
					dispatch(addAvatar(data.url));
					navigation.navigate('ProfileStepTwo');
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

	return (
		<SafeAreaView style={styles.container}>
			<HeaderCreateProfile step={1} />

			{!cameraOpen && (
				<Image
					source={{
						uri: image || DEFAULT_AVATAR,
					}}
					style={styles.image}
				/>
			)}

			{hasCameraPermission && cameraOpen && (
				<Snap setImage={setImage} setCameraOpen={setCameraOpen} />
			)}

			{!cameraOpen && (
				<View>
					<Text style={STYLES_GLOBAL.textLight}>
						Sélectionnez votre plus belle photo !
					</Text>

					<View style={styles.btnContainer}>
						{!hasGalleryPermission ? (
							<Text style={STYLES_GLOBAL.error}>
								Pas de permission d'accéder à la gallerie
							</Text>
						) : (
							<ButtonIcon
								type="secondaryLight"
								name="images"
								onpress={() => {
									setCameraOpen(false);
									pickImage();
								}}
							/>
						)}
						{!hasCameraPermission || !isFocused ? (
							<Text style={STYLES_GLOBAL.error}>
								Pas de permission d'accéder à votre caméra
							</Text>
						) : (
							<ButtonIcon
								type="secondaryLight"
								name="camera-outline"
								onpress={() => setCameraOpen(!cameraOpen)}
							/>
						)}
					</View>
				</View>
			)}

			{loading && (
				<View style={styles.activityindicatorContainer}>
					<ActivityIndicator size="large" color={COLORS.lightBlue} />
				</View>
			)}

			<FooterCreateProfile
				step={1}
				onPressBack={() => navigation.navigate('Signup')}
				onPressNext={handleRegister}
			/>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.darkBlue,
	},
	btnContainer: {
		width: '70%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 250,
	},
	activityindicatorContainer: {
		...StyleSheet.absoluteFillObject,
		top: '85%',
		left: 0,
		zIndex: 10,
		width: '100%',
		height: '15%',
		justifyContent: 'space-around',
		backgroundColor: COLORS.darkBlue,
	},
});

export default ProfileStepOneScreen;
