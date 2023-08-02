import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../reducers/user';
import { RemoteDataSet } from '../components/RemoteDataSet';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { SelectList } from 'react-native-dropdown-select-list'
import { Dropdown } from 'react-native-element-dropdown';
import ButtonIcon from '../components/ButtonIcon';
import MapView, { Marker } from 'react-native-maps';
import { ERRORS, URL_EXPO } from '../utils/constants';
import { Entypo } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const [city, setCity] = useState(null);
	const [usersAroundDestination, setUsersAroundDestination] = useState([]);
	const [error, setError] = useState('');
	const [distanceSelected, setDistanceSelected] = useState("");

	const distances = [
		{ label: '10km', value: '1' },
		{ label: '20km', value: '2' },
		{ label: '50km', value: '3' },
		{ label: '100km', value: '4' },
		{ label: '200km', value: '5' },
	]

	const mapRef = useRef(null)

	const toRadius = (deg) => {
		return deg * (Math.PI / 180);
	};

	const convertCoordsToKm = (origin, target) => {
		const R = 6371;

		const latRadians = toRadius(target.latitude - origin.latitude) / 2;
		const longRadians = toRadius(target.longitude - origin.longitude) / 2;

		const a =
			Math.pow(Math.sin(latRadians), 2) +
			Math.cos(toRadius(origin.latitude)) *
			Math.cos(toRadius(target.latitude)) *
			Math.pow(Math.sin(longRadians), 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return (R * c).toFixed(2);
	};

	const addCity = (newCity) => {
		if (!newCity) return;

		setCity({
			name: newCity.name,
			latitude: newCity.latitude,
			longitude: newCity.longitude,
		});
		mapRef.current.animateToRegion({
			latitude: newCity.latitude,
			longitude: newCity.longitude,
			latitudeDelta: 0.2,
			longitudeDelta: 0.2,
		})
	};

	useEffect(() => {
		fetch(`${URL_EXPO}:3000/users`)
			.then((response) =>
				response.status > 400 ? response.status : response.json()
			)
			.then((users) => {
				if (typeof users === 'number') {
					setError(ERRORS[`err${users}`]);
					return;
				}
				if (users.result) {
					setUsersAroundDestination(users.data);
				} else {
					setError(ERRORS[`err${users.status}`]);
				}
			});
	}, []);

	console.log('Distance selectionnée : ', distanceSelected)


	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar style={styles.statusBar} />
			<KeyboardAwareScrollView
				extraScrollHeight={100} // (when scroll)to have extra height between keyboard and text input
				enableOnAndroid={true}
				extraHeight={100} // make some height so the keyboard wont cover other component
				contentContainerStyle={styles.container}>
				<AutocompleteDropdownContextProvider>
					<View style={styles.searchContainer}>

						<RemoteDataSet
							addCity={addCity}
							label="Destination"
							ligthTheme={true}
							width={200}
						/>
						<Dropdown
							style={styles.dropdown}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							iconStyle={styles.iconStyle}
							data={distances}
							maxHeight={300}
							labelField="label"
							valueField="value"
							placeholder="Distance"
							searchPlaceholder="Search..."
							value={distanceSelected}
							onChange={item => {
								setDistanceSelected(item.value);
							}}
							renderLeftIcon={() => (
								<Entypo name="magnifying-glass" size={24} color="black" />
							)}
						/>
					</View>
				</AutocompleteDropdownContextProvider>
				<MapView
					style={styles.map}
					ref={mapRef}
					initialRegion={{
						latitude: user.city.latitude,
						longitude: user.city.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}>
					{usersAroundDestination.length > 0 &&
						usersAroundDestination.map((user, i) => {
							let distance = city
								? convertCoordsToKm(
									{ latitude: city.latitude, longitude: city.longitude },
									{
										latitude: user.city.latitude,
										longitude: user.city.longitude,
									}
								)
								: 0;

							return (
								<Marker
									key={i}
									coordinate={{
										latitude: user.city.latitude,
										longitude: user.city.longitude,
									}}
									title={user.firstname}
									pinColor="#fecb2d"
									// icon={icons[user.type]}
									description={city && `${distance}km`}
								/>
							);
						})}
				</MapView>

				{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}
				<View style={STYLES_GLOBAL.btnBottomContainer}>
					<ButtonIcon
						type="results"
						name="arrow-undo-outline"
						onpress={() => { }}
					/>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingVertical: 30,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: COLORS.bg,
	},
	statusBar: {
		backgroundColor: 'white'
	},
	searchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	},
	map: {
		zIndex: -1,
		width: '100%',
		height: '50%',
	},
	dropdown: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 120,
		margin: 16,
		height: 50,
		borderBottomColor: 'gray',
		borderBottomWidth: 0.5,
	},
	icon: {
		marginRight: 5,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
});

export default SearchScreen;
