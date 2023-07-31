import React, { memo, useCallback, useState } from 'react';
import { Text } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { COLORS } from '../utils/styles';

export const RemoteDataSet = memo((props) => {
	const [loading, setLoading] = useState(false);
	const [remoteDataSet, setRemoteDataSet] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);

	const getSuggestions = useCallback(async (q) => {
		const filterToken = q.toLowerCase();
		console.log('getSuggestions', filterToken);
		if (typeof q !== 'string' || q.length < 3) {
			setRemoteDataSet(null);
			return;
		}
		setLoading(true);
		const response = await fetch(
			`https://api-adresse.data.gouv.fr/search/?q=${q}&limit=100&properties=city`
		).then(
			(data) =>
				new Promise((res) => {
					setTimeout(() => res(data), 2000); // imitate of a long response
				})
		);
		const items = await response.json();
		console.log(items.features);

		const suggestions = items.features
			.filter((item) =>
				item.properties.city.toLowerCase().includes(filterToken)
			)
			.map((item, i) => ({
				id: i,
				title: item.properties.city,
				details: item.properties.context,
			}));

		setRemoteDataSet(suggestions);
		setLoading(false);
	}, []);

	return (
		<>
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
					backgroundColor: COLORS.pink,
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
		</>
	);
});
