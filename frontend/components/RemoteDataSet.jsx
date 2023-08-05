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
		const response = await fetch(URL);
		const items = await response.json();
		const detailedCities = items.results[0].locations;

		const suggestions = detailedCities.map((city, i) => ({
			id: i,
			title: `${city.adminArea5}, ${city.adminArea4}`,
			name: city.adminArea5,
			latitude: city.displayLatLng.lat,
			longitude: city.displayLatLng.lng,
		}));

		setRemoteDataSet(suggestions);
		setLoading(false);
	}, []);

	const clear = () => {
		props.clear();
		setRemoteDataSet(null);
	};

	return (
		<AutocompleteDropdown
			disablePortal
			dataSet={remoteDataSet}
			closeOnBlur={false}
			useFilter={false}
			clearOnFocus={false}
			onSelectItem={props.addCity}
			loading={loading}
			onClear={() => clear()}
			onChangeText={getSuggestions}
			textInputProps={{
				color: props.ligthTheme ? COLORS.pink : COLORS.bg,
				placeholder: props.label,
			}}
			inputContainerStyle={{
				width: props.width ? props.width : '70%',
				margin: 10,
				borderRadius: 8,
				backgroundColor: props.ligthTheme ? COLORS.bg : COLORS.bgDark,
				borderWidth: 1,
				borderColor: props.ligthTheme ? COLORS.pink : COLORS.bg,
			}}
			suggestionsListContainerStyle={{
				zIndex: 10,
				backgroundColor: props.ligthTheme ? COLORS.pink : COLORS.lightBlue,
			}}
			suggestionsListTextStyle={{
				color: props.ligthTheme ? COLORS.bg : COLORS.bgDark,
				fontWeight: '700',
				letterSpacing: 1,
			}}
			EmptyResultComponent={
				<Text style={{ padding: 10, fontSize: 15 }}>Not Found</Text>
			}
		/>
	);
});
