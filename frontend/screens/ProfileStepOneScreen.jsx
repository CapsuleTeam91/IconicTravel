import React, { useState, useEffect, useRef } from 'react';
import { addAvatar, addData } from '../reducers/user';
import { useDispatch } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';
import { DEFAULT_AVATAR, URL_EXPO } from '../utils/constants';

const ProfileStepOneScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	let cameraRef = useRef(null);
	const isFocused = useIsFocused();
	const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
	const [hasCameraPermission, setHasCameraPermission] = useState(false);
	const [cameraOpen, setCameraOpen] = useState(false);
	const [type, setType] = useState(CameraType.back);
	const [flashMode, setFlashMode] = useState(FlashMode.off);
	const [image, setImage] = useState(null);

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

	const takePicture = async () => {
		const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
		setImage(photo.uri);
		setCameraOpen(false);
	};

	const handleRegister = () => {
		if (!image) {
			setImage(DEFAULT_AVATAR);
			dispatch(addAvatar(image));
			navigation.navigate('ProfileStepTwo');
		}

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
			<Text style={[STYLES_GLOBAL.title, STYLES_GLOBAL.titleLight]}>
				Création de votre profil
			</Text>
			<Text style={[STYLES_GLOBAL.subTitle, STYLES_GLOBAL.subTitleLight]}>
				Etape 1/3
			</Text>
			<Image
				source={{
					uri: image || DEFAULT_AVATAR,
				}}
				style={styles.camera}
			/>
			{hasCameraPermission && cameraOpen && (
				<View style={styles.cameraContainer}>
					<View style={styles.buttonsContainer}>
						<ButtonIcon
							type="secondary"
							name={
								type === CameraType.back ? 'sync-circle' : 'sync-circle-outline'
							}
							onpress={() =>
								setType(
									type === CameraType.back ? CameraType.front : CameraType.back
								)
							}
						/>

						<ButtonIcon
							type="secondary"
							name={flashMode === FlashMode.off ? 'flash' : 'flash-outline'}
							onpress={() =>
								setFlashMode(
									flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off
								)
							}
						/>
					</View>
					<Camera
						type={type}
						flashMode={flashMode}
						ref={(ref) => (cameraRef = ref)}
						style={styles.camera}></Camera>
					<View style={styles.snapContainer}>
						<ButtonIcon
							type="secondary"
							name="camera-outline"
							onpress={() => cameraRef && takePicture()}
						/>
					</View>
				</View>
			)}

			<Text style={STYLES_GLOBAL.textLight}>
				Sélectionnez une photo de profil !
			</Text>
			<View style={styles.btnContainer}>
				{!hasGalleryPermission ? (
					<Text style={STYLES_GLOBAL.error}>
						Pas de permission d'accéder à la gallerie
					</Text>
				) : (
					<ButtonIcon
						type="secondary"
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
						type="secondary"
						name="camera-outline"
						onpress={() => setCameraOpen(!cameraOpen)}
					/>
				)}
			</View>

			<View style={STYLES_GLOBAL.btnBottomContainer}>
				<ButtonIcon
					type="secondary"
					name="arrow-undo-outline"
					onpress={() => navigation.navigate('Signup')}
				/>
				<Button type="secondary" label="Suivant" onpress={handleRegister} />
			</View>
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
	cameraContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	btnContainer: {
		width: '70%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	camera: {
		width: 200,
		height: 200,
		borderRadius: 250,
	},
	buttonsContainer: {
		flex: 1,
	},
	snapContainer: {
		flex: 1,
		paddingBottom: 5,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
});

export default ProfileStepOneScreen;
