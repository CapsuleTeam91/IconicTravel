import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import ButtonIcon from '../../components/ButtonIcon';

const Snap = (props) => {
	let cameraRef = useRef(null);
	const [type, setType] = useState(CameraType.back);
	const [flashMode, setFlashMode] = useState(FlashMode.off);

	const takePicture = async () => {
		const photo = await cameraRef.takePictureAsync({ quality: 0.3 });
		props.setImage(photo.uri);
		props.setCameraOpen(false);
	};

	return (
		<View style={styles.cameraContainer}>
			<View>
				<ButtonIcon
					type="tertiary"
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
					type="tertiary"
					name={flashMode === FlashMode.off ? 'flash' : 'flash-outline'}
					onpress={() =>
						setFlashMode(
							flashMode === FlashMode.off ? FlashMode.torch : FlashMode.off
						)
					}
				/>
				<ButtonIcon
					type="tertiary"
					name="close-outline"
					onpress={() => props.setCameraOpen(false)}
				/>
			</View>

			<Camera
				type={type}
				flashMode={flashMode}
				ref={(ref) => (cameraRef = ref)}
				style={styles.camera}
			/>

			<ButtonIcon
				type="tertiary"
				name="aperture-outline"
				onpress={() => cameraRef && takePicture()}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	cameraContainer: {
		width: '90%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	camera: {
		width: 200,
		height: 200,
	},
});

export default Snap;
