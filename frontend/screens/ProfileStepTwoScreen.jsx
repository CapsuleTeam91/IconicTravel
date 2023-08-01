import React, { useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	ScrollView,
} from 'react-native';
import { addData } from '../reducers/user';
import { useDispatch } from 'react-redux';
import { RemoteDataSet } from '../components/RemoteDataSet';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
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
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				enabled>
				<ScrollView
					nestedScrollEnabled
					keyboardDismissMode="on-drag"
					keyboardShouldPersistTaps="handled"
					contentInsetAdjustmentBehavior="automatic"
					contentContainerStyle={{
						paddingBottom: 200,
						justifyContent: 'space-between',
					}}
					style={{ flex: 1 }}>
					<View
						style={[styles.container, Platform.select({ ios: { zIndex: 1 } })]}>
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
							style={[
								STYLES_GLOBAL.btnBottomContainer,
								styles.btnBottomContainer,
							]}>
							<ButtonIcon
								type="secondary"
								name="arrow-undo-outline"
								onpress={() => navigation.navigate('ProfileStepOne')}
							/>
							<Button
								type="secondary"
								label="Suivant"
								onpress={handleRegister}
							/>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.darkBlue,
		// paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	// scrollContainer: {
	// 	flex: 1,
	// 	justifyContent: 'flex-end',
	// 	backgroundColor: COLORS.darkBlue,
	// },
	btnBottomContainer: {},
});

export default ProfileStepTwoScreen;
