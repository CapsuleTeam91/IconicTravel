import React, { useEffect, useRef, useState } from 'react';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../reducers/user';
import { RemoteDataSet } from '../components/RemoteDataSet';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { Dropdown } from 'react-native-element-dropdown';
import MapView, { Marker } from 'react-native-maps';
import { ERRORS } from '../utils/constants';
import { URL_EXPO } from '../environnement';
import { DISTANCES } from '../utils/data';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { convertCoordsToKm } from '../utils/helper';
import { useIsFocused } from '@react-navigation/native';
import { Map } from '../components/Map';

const SearchScreen = ({ navigation }) => {
	const isFocused = useIsFocused();
	const mapRef = useRef(null);
	const svRef = useRef(null);
	const markersRef = useRef([]);
	const user = useSelector((state) => state.user.value);
	const [city, setCity] = useState(null);
	const [usersAroundDestination, setUsersAroundDestination] = useState([]);
	const [error, setError] = useState('');
	const [distanceSelected, setDistanceSelected] = useState(null);
	const [userSelected, setUserSelected] = useState(null);

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
	}, [isFocused]);

	const sortedUsers = usersAroundDestination;

	if (usersAroundDestination.length > 0) {
		for (let i = 0; i < sortedUsers.length; i++) {
			const localCoords = {
				latitude: city ? city.latitude : user.city.latitude,
				longitude: city ? city.longitude : user.city.longitude,
			};
			const destCoords = {
				latitude: sortedUsers[i].city.latitude,
				longitude: sortedUsers[i].city.longitude,
			};

			let distance = convertCoordsToKm(localCoords, destCoords);

			Object.assign(sortedUsers[i], { distance });
		}
		sortedUsers.sort((p1, p2) =>
			Number(p1.distance) < Number(p2.distance)
				? -1
				: Number(p1.distance) > Number(p2.distance)
				? 1
				: 0
		);
	}

	for (let i = 0; i < sortedUsers.length; i++) {
		Object.assign(sortedUsers[i], { index: i });
	}

	const usersList = sortedUsers.map((user, i) => {
		var ageDate = new Date(Date.now() - new Date(user.dateOfBirth));
		const age = Math.abs(ageDate.getUTCFullYear() - 1970);
		let newDesc = user.description;

		if (newDesc.length >= 80) {
			newDesc = newDesc.slice(0, newDesc.indexOf(' ', 79)) + '...';
		}

		if (city) {
			if (distanceSelected) {
				const distSearched = Number(distanceSelected.label.match(/\d+/)[0]);
				if (user.distance <= distSearched) {
					return (
						<TouchableWithoutFeedback
							key={i}
							onPress={() => displayUserOnMap(user)}>
							<View
								key={i}
								style={
									userSelected?.index === user.index
										? styles.userContainerSelected
										: styles.userContainer
								}>
								<Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
								<View style={styles.userDetailsContainer}>
									<Text
										style={{
											fontWeight: 600,
										}}>{`${user.firstname} • ${user.city.name}`}</Text>
									<Text style={{ fontSize: 12 }}>{newDesc}</Text>
								</View>
								<View style={styles.userDetailsContainer2}>
									<TouchableOpacity
										on
										onPress={() => navigation.navigate('Profile', { user })}>
										<Ionicons
											name="arrow-forward-circle-outline"
											size={35}
											color="black"
										/>
									</TouchableOpacity>
								</View>
							</View>
						</TouchableWithoutFeedback>
					);
				}
			} else {
				return (
					<TouchableWithoutFeedback
						key={i}
						onPress={() => displayUserOnMap(user)}>
						<View
							key={i}
							style={
								userSelected?.index === user.index
									? styles.userContainerSelected
									: styles.userContainer
							}>
							<Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
							<View style={styles.userDetailsContainer}>
								<Text
									style={{
										fontWeight: 600,
									}}>{`${user.firstname} • ${user.city.name}`}</Text>
								<Text style={{ fontSize: 12 }}>{newDesc}</Text>
							</View>
							<View style={styles.userDetailsContainer2}>
								<TouchableOpacity
									on
									onPress={() => navigation.navigate('Profile', { user })}>
									<Ionicons
										name="arrow-forward-circle-outline"
										size={35}
										color="black"
									/>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableWithoutFeedback>
				);
			}
		} else {
			return (
				<TouchableWithoutFeedback
					key={i}
					onPress={() => displayUserOnMap(user)}>
					<View
						style={
							userSelected?.index === user.index
								? styles.userContainerSelected
								: styles.userContainer
						}>
						<Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
						<View style={styles.userDetailsContainer}>
							<Text
								style={{
									fontWeight: 600,
								}}>{`${user.firstname} • ${user.city.name}`}</Text>
							<Text style={{ fontSize: 12 }}>{newDesc}</Text>
						</View>
						<View style={styles.userDetailsContainer2}>
							<TouchableOpacity
								on
								onPress={() => navigation.navigate('Profile', { user })}>
								<Ionicons
									name="arrow-forward-circle-outline"
									size={35}
									color="black"
								/>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
			);
		}
	});

	const markersList = [];
	if (usersAroundDestination.length > 0) {
		usersAroundDestination.map((user, i) => {
			markersList.push(
				<Marker
					key={i}
					ref={(ref) => (markersRef.current[i] = ref)}
					coordinate={{
						latitude: user.city.latitude,
						longitude: user.city.longitude,
					}}
					title={user.firstname}
					pinColor="#F87575"
					description={`${user.distance}km`}
					onPress={() => displayUser(user)}
				/>
			);
		});
	}

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
		});
	};

	const clear = () => {
		setCity(null);
		setDistanceSelected(null);
		mapRef.current.animateToRegion({
			latitude: user.city.latitude,
			longitude: user.city.longitude,
			latitudeDelta: 0.2,
			longitudeDelta: 0.2,
		});
		setUserSelected(null);
	};

	const displayUser = (user) => {
		setUserSelected({ index: user.index });
		svRef.current.scrollTo({ x: 0, y: 96 * user.index, animated: true });
	};

	const displayUserOnMap = (user) => {
		setUserSelected({ index: user.index });
		svRef.current.scrollTo({ x: 0, y: 96 * user.index, animated: true });
		markersRef.current[user.index].showCallout();
		mapRef.current.animateToRegion({
			latitude: user.city.latitude,
			longitude: user.city.longitude,
			latitudeDelta: 0.2,
			longitudeDelta: 0.2,
		});
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.searchContainer}>
				<AutocompleteDropdownContextProvider>
					<RemoteDataSet
						addCity={addCity}
						label="Destination"
						ligthTheme={false}
						width={230}
						clear={clear}
					/>
				</AutocompleteDropdownContextProvider>

				{city && (
					<Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						data={DISTANCES}
						maxHeight={300}
						labelField="label"
						valueField="value"
						placeholder="Distance"
						value={distanceSelected}
						onChange={(item) => {
							item.label === 'Illimité'
								? setDistanceSelected(null)
								: setDistanceSelected(item);
						}}
						mode="default"
						renderLeftIcon={() => (
							<MaterialCommunityIcons
								name="map-marker-distance"
								size={24}
								color="black"
							/>
						)}
					/>
				)}
			</View>
			{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}

			{/* <View
				style={{
					borderBottomRightRadius: 100,
					borderTopLeftRadius: 100,
					overflow: 'hidden',
					borderWidth: 1,
					borderColor: 'red',
				}}> */}
			{/* <MapView
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
			</MapView> */}
			{/* </View> */}

			<Map {...{ mapRef, setUserSelected, user, markersList }} />

			<View style={{ alignItems: 'center', marginTop: 15 }}>
				<Text style={STYLES_GLOBAL.subTitle}>Iconic Hosts</Text>
				<ScrollView
					ref={svRef}
					contentContainerStyle={styles.resultsContainer}
					style={styles.scrollViewItems}>
					{usersList}
				</ScrollView>
			</View>
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
		backgroundColor: 'white',
	},
	searchContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.darkBlue,
	},
	// map: {
	// 	zIndex: -1,
	// 	width: '100%',
	// 	height: 350,
	// 	shadowColor: 'black',
	// 	shadowOffset: { width: 20, height: 40 },
	// 	shadowOpacity: 0.2,
	// 	shadowRadius: 3,
	// 	elevation: 20,
	// },
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
	resultsContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.bg,
	},
	scrollViewItems: {
		width: '100%',
		padding: 15,
	},
	userContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#E3E8ED',
		width: '100%',
		height: 80,
		borderColor: 'black',
		borderWidth: 0.5,
		borderRadius: 10,
		padding: 10,
		marginBottom: 15,
	},
	userContainerSelected: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#95B8D1',
		width: '100%',
		height: 80,
		borderColor: 'black',
		borderWidth: 0.5,
		borderRadius: 10,
		padding: 10,
		marginBottom: 15,
	},
	avatar: {
		width: '17%',
		height: '100%',
		borderRadius: 250,
	},
	userDetailsContainer: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingLeft: 20,
		width: '64%',
	},
	userDetailsContainer2: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '19%',
	},
});

export default SearchScreen;
