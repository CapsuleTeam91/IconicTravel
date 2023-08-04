import React, { useState, useRef } from 'react';
import { COLORS } from '../utils/styles';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { StyleSheet, View } from 'react-native';

import ButtonIcon from '../components/ButtonIcon';

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
		<View style={styles.container}>
			<View style={styles.cameraContainer}>
				<View style={styles.buttonsContainer}>
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
				</View>
				<Camera
					type={type}
					flashMode={flashMode}
					ref={(ref) => (cameraRef = ref)}
					style={styles.camera}></Camera>
				<View style={styles.snapContainer}>
					<ButtonIcon
						type="tertiary"
						name="aperture-outline"
						onpress={() => cameraRef && takePicture()}
					/>
				</View>
			</View>
		</View>
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
		width: '90%',
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
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Snap;
