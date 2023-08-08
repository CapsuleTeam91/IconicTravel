import {
	FlatList,
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
} from 'react-native';
import { checkDOB } from '../../utils/helper';
import { useCallback, useState } from 'react';
import { URL_EXPO } from '../../environnement';
import { COLORS, COLORS_THEME } from '../../utils/styles';
import Input from '../forms/Input';
import DatePicker from '../forms/DatePicker';
import ButtonIcon from '../buttons/ButtonIcon';

export const UpdateDetailesChildren = ({
	user,
	firstname,
	setFirstname,
	lastname,
	setLastname,
	dateOfBirth,
	setDateOfBirth,
	city,
	setCity,
	error,
	setError,
	handleUpdate,
	setUpdateDetailsVisible,
}) => {
	const [remoteDataSet, setRemoteDataSet] = useState([]);
	const [newCity, setNewCity] = useState('');

	const getSuggestions = useCallback(async (q) => {
		setNewCity(q);
		const cityLetters = q.toLowerCase();

		if (typeof q !== 'string' || q.length < 3) {
			setRemoteDataSet([]);
			return;
		}
		const response = await fetch(`${URL_EXPO}:3000/city/${cityLetters}`);
		const result = await response.json();

		console.log(result);
		setRemoteDataSet(result.suggestions);
	}, []);

	return (
		<View style={styles.inputContainer}>
			<Input
				label={user.firstname}
				theme={COLORS_THEME.light}
				autoFocus={false}
				autoCapitalize="none"
				keyboardType="default"
				onChangeText={(value) => setFirstname(value)}
				value={firstname}
			/>
			<Input
				label={user.lastname}
				theme={COLORS_THEME.light}
				autoFocus={false}
				autoCapitalize="none"
				keyboardType="default"
				onChangeText={(value) => setLastname(value)}
				value={lastname}
			/>
			<DatePicker
				date={dateOfBirth}
				theme={COLORS_THEME.light}
				label={
					dateOfBirth !== user.dateOfBirth
						? dateOfBirth.toLocaleDateString()
						: new Date(user.dateOfBirth).toLocaleDateString()
				}
				onconfirm={(date) => setDateOfBirth(date)}
			/>

			<Input
				label={city.latitude ? 'Ville sélectionnée' : user.city.name}
				theme={COLORS_THEME.light}
				autoFocus={false}
				autoCapitalize="none"
				keyboardType="default"
				onChangeText={(value) => getSuggestions(value)}
				value={newCity}
			/>
			{remoteDataSet.length > 0 && (
				<FlatList
					data={remoteDataSet}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() =>
								setCity(
									!item?.name
										? user.city
										: {
												name: item.name,
												latitude: item.latitude,
												longitude: item.longitude,
										  }
								)
							}
							style={{
								paddingVertical: 5,
								paddingHorizontal: 10,
								margin: 2,
								borderRadius: 8,
								backgroundColor:
									city.latitude === item.latitude
										? COLORS.lightBlue
										: COLORS.pink,
							}}
							activeOpacity={0.8}>
							<Text style={{ fontSize: 16, color: COLORS.bg }}>
								{item.title}
							</Text>
						</TouchableOpacity>
					)}
					contentContainerStyle={{
						minWidth: '70%',
					}}
				/>
			)}

			{error && <Text style={STYLES_GLOBAL.error}>{error}</Text>}
			<View style={styles.optionsContainer}>
				<ButtonIcon
					type="secondary"
					size={18}
					name="arrow-back-outline"
					onpress={() => {
						setError('');
						setFirstname('');
						setLastname('');
						setDateOfBirth(new Date());
						setCity('');
						setUpdateDetailsVisible(false);
					}}
				/>
				<ButtonIcon
					type="primary"
					size={18}
					name="checkmark-outline"
					onpress={() => {
						setError('');

						if (checkDOB(dateOfBirth)) {
							setError('18 ans ou plus');
							return;
						}
						handleUpdate({
							firstname: firstname?.trim() || user.firstname,
							lastname: lastname?.trim() || user.lastname,
							dateOfBirth,
							city: city || user.city,
						});

						setCity('');
						setFirstname('');
						setLastname('');
						setDateOfBirth(new Date(user.dateOfBirth));
						setUpdateDetailsVisible(false);
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	optionsContainer: {
		width: Platform.OS === 'ios' ? '70%' : '80%',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	optionsBtnContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
	},
});
