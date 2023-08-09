import React, { useEffect, useRef, useState } from 'react';
import { Map } from '../components/Map';
import { useSelector } from 'react-redux';
import { Marker } from 'react-native-maps';
import { ERRORS } from '../utils/constants';
import { URL_EXPO } from '../utils/constants';
import { STYLES_GLOBAL } from '../utils/styles';
import { convertCoordsToKm } from '../utils/helper';
import { useIsFocused } from '@react-navigation/native';
import { HostCard } from '../components/cards/HostCard';
import { RemoteDataSet } from '../components/forms/RemoteDataSet';
import { DropdownDistances } from '../components/forms/DropdownDistances';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

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

	useEffect(() => {
		if (isFocused) {
			fetch(`${URL_EXPO}/users`)
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

		sortedUsers.map((sortedUser, index) =>
			Object.assign(sortedUser, { index })
		);
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

	const markersList = sortedUsers?.map((user, i) => (
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
	));

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
	container: {
		...StyleSheet.absoluteFillObject,
		width: '100%',
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	resultsContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 1000,
	},
	scrollViewItems: {
		width: '100%',
		height: '40%',
		paddingVertical: 15,
	},
});

export default SearchScreen;
