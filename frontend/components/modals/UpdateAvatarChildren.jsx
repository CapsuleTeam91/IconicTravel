import { StyleSheet, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { useEffect, useState } from 'react';
import Snap from '../camera/Snap';
import ButtonIcon from '../buttons/ButtonIcon';
import * as ImagePicker from 'expo-image-picker';

export const UpdateAvatarChildren = ({
	image,
	setImage,
	isFocused,
	handleAvatarUpdate,
	setUpdateAvatarVisible,
}) => {
	const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
	const [hasCameraPermission, setHasCameraPermission] = useState(false);
	const [cameraOpen, setCameraOpen] = useState(false);

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

	return (
		<View style={styles.cameraContainer}>
			{image && (
				<Image
					source={{
						uri: image,
					}}
					style={styles.image}
				/>
			)}
			{isFocused && cameraOpen && (
				<Snap setImage={setImage} setCameraOpen={setCameraOpen} />
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
					name="arrow-back-outline"
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
};

const styles = StyleSheet.create({
	cameraContainer: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
	optionsContainer: {
		width: Platform.OS === 'ios' ? '70%' : '80%',
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
	image: {
		width: 120,
		height: 120,
		borderRadius: 250,
	},
});
