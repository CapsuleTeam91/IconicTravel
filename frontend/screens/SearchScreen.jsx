import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RemoteDataSet } from '../components/RemoteDataSet';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { Marker } from 'react-native-maps';
import { ERRORS } from '../utils/constants';
import { URL_EXPO } from '../environnement';
import { convertCoordsToKm } from '../utils/helper';
import { useIsFocused } from '@react-navigation/native';
import { Map } from '../components/Map';
import { HostCard } from '../components/cards/HostCard';
import { DropdownDistances } from '../components/forms/DropdownDistances';

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
		if (isFocused) {
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
		}
	}, [isFocused]);

	const sortedUsers = usersAroundDestination.filter(
		(traveler) => traveler.canHost && traveler.email !== user.email
	);

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
		if (city) {
			if (distanceSelected) {
				const distSearched = Number(distanceSelected.label.match(/\d+/)[0]);
				if (user.distance <= distSearched) {
					return (
						<HostCard
							key={i}
							user={user}
							displayUserOnMap={() => displayUserOnMap(user)}
							selected={userSelected?.index === user.index}
							handleClick={() => navigation.navigate('Profile', { user })}
						/>
					);
				}
			} else {
				return (
					<HostCard
						key={i}
						user={user}
						displayUserOnMap={() => displayUserOnMap(user)}
						selected={userSelected?.index === user.index}
						handleClick={() => navigation.navigate('Profile', { user })}
					/>
				);
			}
		} else {
			return (
				<HostCard
					key={i}
					user={user}
					displayUserOnMap={() => displayUserOnMap(user)}
					selected={userSelected?.index === user.index}
					handleClick={() => navigation.navigate('Profile', { user })}
				/>
			);
		}
	});

	const markersList = [];
	// if (usersAroundDestination.length > 0) {
	usersAroundDestination?.map((user, i) => {
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
	// }

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
			<View style={styles.container}>
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
					<DropdownDistances {...{ distanceSelected, setDistanceSelected }} />
				)}
			</View>

			{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}

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
	// container: {
	// 	flexGrow: 1,
	// 	paddingVertical: 30,
	// 	alignItems: 'center',
	// 	justifyContent: 'flex-start',
	// 	backgroundColor: COLORS.bg,
	// },
	// statusBar: {
	// 	backgroundColor: 'white',
	// },
	container: {
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
	// dropdown: {
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	width: 120,
	// 	margin: 16,
	// 	height: 50,
	// 	borderBottomColor: 'gray',
	// 	borderBottomWidth: 0.5,
	// },
	// icon: {
	// 	marginRight: 5,
	// },
	// placeholderStyle: {
	// 	fontSize: 16,
	// },
	// selectedTextStyle: {
	// 	fontSize: 16,
	// },
	// iconStyle: {
	// 	width: 20,
	// 	height: 20,
	// },
	// inputSearchStyle: {
	// 	height: 40,
	// 	fontSize: 16,
	// },
	resultsContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		// paddingBottom: 1000,
		// backgroundColor: COLORS.bg,
	},
	scrollViewItems: {
		width: '100%',
		height: '40%',
		paddingVertical: 15,
	},
	// userDetailsContainer: {
	// 	justifyContent: 'center',
	// 	alignItems: 'flex-start',
	// 	paddingLeft: 20,
	// 	width: '64%',
	// },
	// userDetailsContainer2: {
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	width: '19%',
	// },
	// userContainer: {
	// 	flexDirection: 'row',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	backgroundColor: '#E3E8ED',
	// 	width: '100%',
	// 	height: 80,
	// 	borderColor: 'black',
	// 	borderWidth: 0.5,
	// 	borderRadius: 10,
	// 	padding: 10,
	// 	marginBottom: 15,
	// },
	// userContainerSelected: {
	// 	flexDirection: 'row',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	backgroundColor: '#95B8D1',
	// 	width: '100%',
	// 	height: 80,
	// 	borderColor: 'black',
	// 	borderWidth: 0.5,
	// 	borderRadius: 10,
	// 	padding: 10,
	// 	marginBottom: 15,
	// },
	// avatar: {
	// 	width: '17%',
	// 	height: '100%',
	// 	borderRadius: 250,
	// },
});

export default SearchScreen;
