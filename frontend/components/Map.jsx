import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export const Map = ({ mapRef, setUserSelected, user, markersList }) => {
	return (
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
	);
};

const styles = StyleSheet.create({
	map: {
		zIndex: -100,
		height: '55%',
		width: '100%',
	},
});
