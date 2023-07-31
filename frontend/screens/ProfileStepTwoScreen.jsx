import React, { useState, useEffect } from 'react';
import { addData } from '../reducers/newUser';
import { useDispatch } from 'react-redux';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';
import Textarea from '../components/Textarea';

const ProfileStepTwoScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [description, setDescription] = useState('');
	const [city, setCity] = useState('');
	const [cities, setCities] = useState([]); // AutocompleteDropdown dataset
	const [spokenLaguages, setSpokenLanguages] = useState([]); // CF utils/data.js - > dropdown ?
	const [error, setError] = useState('');

	// GET ALL CITIES BEGINING WITH INPUT VALUE => AutocompleteDropdown dataset
	const getCities = (city) => {
		if (city.length === 0) {
			setError('Sélectionnez une ville valide !');
			return;
		} else if (city.length < 4 || city.length > 200) {
			setError('La ville doit contenir entre 3 et 200 lettres');
			return;
		}
		fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
			.then((r) => r.json())
			.then((d) => {
				d && setCities([...d.features.map((f) => f.properties.name)]);
			});
	};

	const getSelectedCity = (city) => {
		// TODO : handle error if no city !!!!

		// TODO : FIND WORLDWIDE API !!!!!! + handleErrors
		city &&
			fetch(`https://api-adresse.data.gouv.fr/search/?q=${city.title}`)
				.then((response) => response.json())
				.then((data) => {
					data &&
						setCity({
							name: data.features[0].properties.name,
							latitude: data.features[0].geometry.coordinates[1],
							longitude: data.features[0].geometry.coordinates[0],
						});
					setCities([]);
				});
	};

	const handleRegister = () => {
		dispatch(addData({ description, city, spokenLaguages }));
		console.log(navigation);
		navigation.navigate('ProfileStepThree');
	};

	return (
		<AutocompleteDropdownContextProvider>
			<SafeAreaView style={styles.container}>
				<Text style={[STYLES_GLOBAL.title, STYLES_GLOBAL.titleLight]}>
					Création de votre profil
				</Text>
				<Text style={[STYLES_GLOBAL.subTitle, STYLES_GLOBAL.subTitleLight]}>
					Etape 2/3
				</Text>

				<Text style={STYLES_GLOBAL.textLight}>
					Faisons plus ample connaissance ...
				</Text>

				<Textarea
					label="Description"
					theme={COLORS_THEME.dark}
					autoFocus={false}
					onChangeText={(value) => setDescription(value)}
					value={description}
				/>

				<AutocompleteDropdown
					// containerStyle={styles.dropdown}
					clearOnFocus={false}
					closeOnBlur={true}
					closeOnSubmit={false}
					textInputProps={{
						placeholder: 'Ville de résidence',
						autoCorrect: false,
						autoCapitalize: 'none',
					}}
					onSelectItem={(item) => getSelectedCity(item)}
					dataSet={cities?.map((el, i) => ({ id: i, title: el }))}
					onChangeText={(text) => getCities(text)}
				/>

				{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}

				<View style={STYLES_GLOBAL.btnBottomContainer}>
					<ButtonIcon
						type="secondary"
						name="arrow-undo-outline"
						onpress={() => navigation.navigate('ProfileStepOne')}
					/>
					<Button type="secondary" label="Suivant" onpress={handleRegister} />
				</View>
			</SafeAreaView>
		</AutocompleteDropdownContextProvider>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.darkBlue,
	},
});

export default ProfileStepTwoScreen;
