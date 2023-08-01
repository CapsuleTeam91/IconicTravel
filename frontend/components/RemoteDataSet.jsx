import React, { memo, useCallback, useState } from 'react';
import { Text } from 'react-native';
import { COLORS } from '../utils/styles';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

export const RemoteDataSet = memo((props) => {
	const [loading, setLoading] = useState(false);
	const [remoteDataSet, setRemoteDataSet] = useState(null);

	const getSuggestions = useCallback(async (q) => {
		const filterToken = q.toLowerCase();

		if (typeof q !== 'string' || q.length < 3) {
			setRemoteDataSet(null);
			return;
		}

		setLoading(true);

		const URL = `https://www.mapquestapi.com/geocoding/v1/address?key=WvE5tMdxgRUWtFIPcZXO1qITivOTwk7V&location=${filterToken}`;
		const response = await fetch(URL).then(
			(data) =>
				new Promise((res) => {
					setTimeout(() => res(data), 2000); // imitate of a long response
				})
		);
		const items = await response.json();
		const detailedCities = items.results[0].locations;

		const suggestions = detailedCities.map((city, i) => ({
			id: i,
			title: city.adminArea5,
			county: city.adminArea4,
			latitude: city.displayLatLng.lat,
			longitude: city.displayLatLng.lng,
		}));

		setRemoteDataSet(suggestions);
		setLoading(false);
	}, []);

	return (
		<AutocompleteDropdown
			dataSet={remoteDataSet}
			closeOnBlur={false}
			useFilter={false}
			clearOnFocus={false}
			onSelectItem={props.addCity}
			loading={loading}
			onChangeText={getSuggestions}
			textInputProps={{
				color: COLORS.bg,
				placeholder: 'Ville de Résidence',
			}}
			inputContainerStyle={{
				width: '70%',
				margin: 10,
				color: COLORS.bg,
				borderRadius: 8,
				backgroundColor: COLORS.bgDark,
			}}
			suggestionsListContainerStyle={{
				backgroundColor: COLORS.lightBlue,
			}}
			suggestionsListTextStyle={{
				color: COLORS.bgDark,
				fontWeight: '700',
				letterSpacing: 1,
			}}
			EmptyResultComponent={
				<Text style={{ padding: 10, fontSize: 15 }}>Not Found</Text>
			}
		/>
	);
});
