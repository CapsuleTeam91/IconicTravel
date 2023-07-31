// import React, { useState, useEffect } from 'react';
// import { addData } from '../reducers/newUser';
// import { useDispatch } from 'react-redux';
// import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
// import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
// import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
// import Button from '../components/Button';
// import ButtonIcon from '../components/ButtonIcon';
// import Textarea from '../components/Textarea';
// import { LANGUAGES_ISO } from '../utils/data';

// const ProfileStepTwoScreen = ({ navigation }) => {
// 	const dispatch = useDispatch();
// 	const [description, setDescription] = useState('');
// 	const [city, setCity] = useState('');
// 	const [cities, setCities] = useState([]); // AutocompleteDropdown dataset
// 	const [spokenLaguages, setSpokenLanguages] = useState([]); // CF utils/data.js - > dropdown ?
// 	const [error, setError] = useState('');

// 	// GET ALL CITIES BEGINING WITH INPUT VALUE => AutocompleteDropdown dataset
// 	const getCities = async (city) => {
// 		if (city.length === 0) {
// 			setError('Sélectionnez une ville valide !');
// 			return;
// 		} else if (city.length < 4 || city.length > 200) {
// 			setError('La ville doit contenir entre 3 et 200 lettres');
// 			return;
// 		}
// 		// fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
// 		// 	.then((r) => r.json())
// 		// 	.then((d) => {
// 		// 		d && setCities([...d.features.map((f) => f.properties.name)]);
// 		// 	});

// 		const url =
// 			'https://eec19846-geocoder-us-census-bureau-v1.p.rapidapi.com/locations/onelineaddress?benchmark=Public_AR_Current&address=19%20route%20de%20l%20ocean%20Sainte%20Helene&format=json';
// 		const options = {
// 			method: 'GET',
// 			headers: {
// 				'X-RapidAPI-Key': '2ec319ab88msh57ac9967d9899d6p14f16cjsn15f43faeb754',
// 				'X-RapidAPI-Host':
// 					'eec19846-geocoder-us-census-bureau-v1.p.rapidapi.com',
// 			},
// 		};

// 		try {
// 			const response = await fetch(url, options);
// 			const result = await response.text();
// 			console.log('test', result);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 	const getSelectedCity = (city) => {
// 		// TODO : handle error if no city !!!!

// 		// TODO : FIND WORLDWIDE API !!!!!! + handleErrors
// 		city &&
// 			fetch(`https://api-adresse.data.gouv.fr/search/?q=${city.title}`)
// 				.then((response) => response.json())
// 				.then((data) => {
// 					data &&
// 						setCity({
// 							name: data.features[0].properties.name,
// 							latitude: data.features[0].geometry.coordinates[1],
// 							longitude: data.features[0].geometry.coordinates[0],
// 						});
// 					setCities([]);
// 				});
// 	};

// 	const getSelectedLanguages = (language) => {
// 		console.log(LANGUAGES_ISO[language.title]);
// 		language &&
// 			setSpokenLanguages([...spokenLaguages, LANGUAGES_ISO[language.title]]);
// 		console.log(spokenLaguages);
// 	};

{
	/* <AutocompleteDropdown
					clearOnFocus={false}
					closeOnBlur={true}
					closeOnSubmit={false}
					textInputProps={{
						placeholder: 'Langues parlées',
						autoCorrect: false,
						autoCapitalize: 'none',
					}}
					initialValue={{ id: '1' }}
					onSelectItem={(item) => getSelectedLanguages(item)}
					dataSet={LANGUAGES_ISO?.map((el, i) => ({
						id: i,
						title: Object.keys(el)[0],
					}))}
					inputContainerStyle={{
						backgroundColor: COLORS.bgDark,
						borderRadius: 8,
						width: '70%',
						color: COLORS.bg,
					}}
					suggestionsListContainerStyle={{
						backgroundColor: COLORS.bgDark,
						color: COLORS.bg,
					}}
				/>

				{spokenLaguages?.map((el, i) => (
					<Text key={i}>{el}</Text>
				))} */
}
