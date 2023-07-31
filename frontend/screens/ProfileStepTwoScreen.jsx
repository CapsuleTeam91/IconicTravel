import React, { useState, useEffect } from 'react';
import { addData } from '../reducers/user';
import { useDispatch } from 'react-redux';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, ScrollView } from 'react-native';
import { RemoteDataSet } from '../components/RemoteDataSet'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';
import Textarea from '../components/Textarea';

const ProfileStepTwoScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [description, setDescription] = useState('');
	const [city, setCity] = useState('');
	const [spokenLaguages, setSpokenLanguages] = useState([]); // CF utils/data.js - > dropdown ?
	const [error, setError] = useState('');


	const handleRegister = () => {
		dispatch(addData({ description, city, spokenLaguages }));
		console.log(navigation);
		navigation.navigate('ProfileStepThree');
	};

	const addCities = (newCity) => {
		if (!newCity) return
		setCities([...cities, newCity])
	}


	return (

		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				enabled>
				<ScrollView contentContainerStyle={styles.scrollContainer} style={{ flex: 1 }}>
					<View style={styles.container}>

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
						<AutocompleteDropdownContextProvider>
							<RemoteDataSet addCities={addCities} />
						</AutocompleteDropdownContextProvider >
						{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}

						<View style={STYLES_GLOBAL.btnBottomContainer}>
							<ButtonIcon
								type="secondary"
								name="arrow-undo-outline"
								onpress={() => navigation.navigate('ProfileStepOne')}
							/>
							<Button type="secondary" label="Suivant" onpress={handleRegister} />
						</View>


					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView >

	);
};
const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: COLORS.darkBlue,
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
	},
	scrollContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: COLORS.darkBlue,
	}
});

export default ProfileStepTwoScreen;
