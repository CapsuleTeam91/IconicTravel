import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { addData } from '../reducers/user';
import { RemoteDataSet } from '../components/RemoteDataSet';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import ButtonIcon from '../components/ButtonIcon';
import DropdownLanguage from '../components/DropdownLanguage';

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
			name: newCity.title,
			latitude: newCity.latitude,
			longitude: newCity.longitude,
		});
	};

	return (

		<SafeAreaView style={{ flex: 1 }}>
			<StatusBar backgroundColor={'white'} />
			<KeyboardAwareScrollView
				extraScrollHeight={100} // (when scroll)to have extra height between keyboard and text input
				enableOnAndroid={true}
				extraHeight={100} // make some height so the keyboard wont cover other component
				contentContainerStyle={styles.container}>
				<Text style={[STYLES_GLOBAL.title, STYLES_GLOBAL.titleLight]}>
					Création de votre profil
				</Text>
				<Text style={[STYLES_GLOBAL.subTitle, STYLES_GLOBAL.subTitleLight]}>
					Etape 2/3
				</Text>
				<Text style={[STYLES_GLOBAL.textLight, { marginBottom: 20 }]}>
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
					<RemoteDataSet addCity={addCity} />
					<DropdownLanguage
						spokenLanguages={spokenLanguages}
						setSpokenLanguages={setSpokenLanguages}
					/>
				</AutocompleteDropdownContextProvider>

				{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}

				<View
					style={STYLES_GLOBAL.btnBottomContainer}>
					<ButtonIcon
						type="secondary"
						name="arrow-undo-outline"
						onpress={() => navigation.navigate('ProfileStepOne')}
					/>
					<Button type="secondary" label="Suivant" onpress={handleRegister} />
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLORS.darkBlue,
	}
});

export default ProfileStepTwoScreen;
