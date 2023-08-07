import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { COLORS } from '../utils/styles';

export const Map = ({ mapRef, setUserSelected, user, markersList }) => {
	return (
		<View style={styles.container}>
			<View style={styles.layer}></View>
			<View style={styles.mapContainer}>
				<MapView
					style={styles.map}
					ref={mapRef}
					onPress={() => setUserSelected(null)}
					initialRegion={{
						latitude: user.city.latitude,
						longitude: user.city.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}>
					{markersList}
				</MapView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		zIndex: -100,
		height: '45%',
	},
	layer: {
		...StyleSheet.absoluteFillObject,
		width: '100%',
		height: 100,
		backgroundColor: COLORS.darkBlue,
	},
	mapContainer: {
		overflow: 'hidden',
		borderTopRightRadius: 100,
		borderBottomLeftRadius: 100,
	},
	map: {
		height: 340,
		width: '100%',
	},
});
