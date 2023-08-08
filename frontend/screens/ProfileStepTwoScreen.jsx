import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addData } from '../reducers/user';
import { RemoteDataSet } from '../components/forms/RemoteDataSet';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import Textarea from '../components/forms/Textarea';
import DropdownLanguage from '../components/forms/DropdownLanguage';
import HeaderCreateProfile from '../components/boxes/HeaderCreateProfile';
import FooterCreateProfile from '../components/boxes/FooterCreateProfile';

const ProfileStepTwoScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [city, setCity] = useState('');
	const [error, setError] = useState('');
	const [description, setDescription] = useState('');
	const [spokenLanguages, setSpokenLanguages] = useState([]);

	const handleRegister = () => {
		if (!city) {
			setError('Vous devez sélectionner une ville');
			return;
		} else if (!description) {
			setError('Attention vous avez oublié de vous présenter');
			return;
		} else if (spokenLanguages.length <= 0) {
			setError('On sait que vous parlez au moin une langue mais laquelle ?');
			return;
		}
		dispatch(addData({ description, city, spokenLanguages }));
		navigation.navigate('ProfileStepThree');
	};

	const addCity = (newCity) => {
		if (!newCity) return;
		setCity({
			name: newCity.name,
			latitude: newCity.latitude,
			longitude: newCity.longitude,
		});
	};

	const clear = () => {
		setCity('');
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={'white'} />
			<KeyboardAwareScrollView
				extraScrollHeight={100} // (when scroll)to have extra height between keyboard and text input
				enableOnAndroid={true}
				extraHeight={100} // make some height so the keyboard wont cover other component
				contentContainerStyle={styles.container}>
				<View style={styles.headerContainer}>
					<HeaderCreateProfile step={2} />

					<Text style={[STYLES_GLOBAL.textLight, { marginBottom: 10 }]}>
						Faisons plus ample connaissance ...
					</Text>
				</View>

				<Textarea
					label="Description"
					theme={COLORS_THEME.dark}
					autoFocus={false}
					onChangeText={(value) => setDescription(value)}
					value={description}
				/>

				<AutocompleteDropdownContextProvider>
					<RemoteDataSet
						addCity={addCity}
						label="Ville de Résidence"
						ligthTheme={false}
						clear={clear}
					/>
				</AutocompleteDropdownContextProvider>

				<DropdownLanguage
					spokenLanguages={spokenLanguages}
					setSpokenLanguages={setSpokenLanguages}
				/>

				{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}

				<FooterCreateProfile
					step={2}
					onPressBack={() => navigation.navigate('ProfileStepOne')}
					onPressNext={handleRegister}
				/>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.darkBlue,
	},
	headerContainer: {
		width: '100%',
		alignItems: 'center',
	},
});

export default ProfileStepTwoScreen;
