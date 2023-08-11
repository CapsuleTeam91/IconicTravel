import {
	Image,
	SafeAreaView,
	StyleSheet,
	Modal,
	Text,
	View,
	ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { getAge } from '../utils/helper';
import { useSelector } from 'react-redux';
import { URL_EXPO } from '../utils/constants';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import Button from '../components/buttons/Button';
import DatePicker from '../components/forms/DatePicker';
import ButtonIcon from '../components/buttons/ButtonIcon';

const UserProfileScreen = ({ route, navigation }) => {
	const user = route.params.user;
	const thisUser = useSelector((state) => state.user.value);
	const [modalVisible, setModalVisible] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 1))
	);
	const [adultsNumber, setAdultsNumber] = useState(1);
	const [childrenNumber, setChildrenNumber] = useState(0);
	const [babiesNumber, setBabiesNumber] = useState(0);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const startDateValidated = (date) => {
		setStartDate(date);
		if (endDate <= date) {
			setEndDate(calculateNextdate(date));
		}
	};

	const calculateNextdate = (date) => {
		var nextDay = new Date(date);
		nextDay.setDate(date.getDate() + 1);
		return nextDay;
	};

	const validateContact = () => {
		setLoading(true);
		fetch(`${URL_EXPO}/users/getId/${thisUser.token}/${user.email}`)
			.then((resp) => resp.json())
			.then((data) => {
				const travelDatas = {
					traveler: data.travelerId,
					host: data.hostId,
					startDate,
					endDate,
					adultsNumber,
					childrenNumber,
					babiesNumber,
				};
				fetch(`${URL_EXPO}/bookings/request`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						travelDatas,
					}),
				})
					.then((resp) => resp.json())
					.then((data) => {
						if (data.result) {
							navigation.navigate('Aventures');
						} else {
							setError(data.error);
						}
					});
			});
		setLoading(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<View style={styles.btnContainer}>
					<ButtonIcon
						type="secondary"
						size={18}
						name="arrow-back-outline"
						onpress={() => navigation.goBack()}
					/>
					<View style={styles.title}>
						<Text style={STYLES_GLOBAL.subTitle}>{user.firstname}</Text>
					</View>
				</View>

				<View style={styles.pictureContainer}>
					<Image
						source={{
							uri: user.avatarUrl,
						}}
						style={styles.image}
					/>
					<View style={styles.infosContainer}>
						<Text style={styles.city}>{user.city.name}</Text>
						<Text style={styles.age}>{getAge(user.dateOfBirth)} ans</Text>
						<View style={[styles.languagesContainer]}>
							{user.spokenLanguages.map((language, i) => (
								<Text
									key={i}
									style={[
										styles.spokenLanguages,
										{
											color: COLORS.darkBlue,
										},
									]}>
									{language}
								</Text>
							))}
						</View>
					</View>
				</View>

				<View style={styles.detailsContainer}>
					<Text style={[STYLES_GLOBAL.textDark, styles.description]}>
						{user.description}
					</Text>
				</View>

				<View style={styles.detailsContainer}>
					<Text style={[STYLES_GLOBAL.textDark, styles.passion]}>
						Mes Passions :{' '}
					</Text>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'flex-start',
						}}>
						{user.hobbies.map((h, i) => (
							<View key={i} style={styles.hobbyContainer}>
								<Text style={styles.hobby}>{h}</Text>
							</View>
						))}
					</View>
				</View>
			</View>

			<Button
				label="Contact"
				size="big"
				type="light"
				onpress={() => setModalVisible(true)}
			/>

			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={styles.categoryContainer}>
							<Text style={styles.subTitle}>Iconic Request</Text>
							<View style={styles.datePickersContainer}>
								<View style={styles.date}>
									<Text>Départ</Text>
									<DatePicker
										theme="dark"
										width="95%"
										date={startDate}
										label={startDate.toLocaleDateString()}
										onconfirm={(date) => startDateValidated(date)}
										minimumDate={new Date()}
									/>
								</View>
								<View style={styles.date}>
									<Text>Retour</Text>
									<DatePicker
										theme="dark"
										width="95%"
										date={endDate}
										label={endDate.toLocaleDateString()}
										onconfirm={(date) => setEndDate(date)}
										minimumDate={calculateNextdate(startDate)}
									/>
								</View>
							</View>
						</View>
						<View style={styles.categoryContainer}>
							<View style={styles.modalDetailsContainer}>
								<View style={styles.travelersDetailsContainer}>
									<Text>Adultes</Text>
									<View style={styles.travelerDetailParams}>
										<ButtonIcon
											type="count"
											size={18}
											name="remove-outline"
											onpress={() =>
												adultsNumber > 0 && setAdultsNumber(adultsNumber - 1)
											}
										/>
										<Text>{adultsNumber}</Text>
										<ButtonIcon
											type="count"
											size={18}
											name="add-outline"
											onpress={() => setAdultsNumber(adultsNumber + 1)}
										/>
									</View>
								</View>

								<View style={styles.travelersDetailsContainer}>
									<Text>Enfants</Text>

									<View style={styles.travelerDetailParams}>
										<ButtonIcon
											type="count"
											size={18}
											name="remove-outline"
											onpress={() =>
												childrenNumber > 0 &&
												setChildrenNumber(childrenNumber - 1)
											}
										/>
										<Text>{childrenNumber}</Text>
										<ButtonIcon
											type="count"
											size={18}
											name="add-outline"
											onpress={() => setChildrenNumber(childrenNumber + 1)}
										/>
									</View>
								</View>

								<View style={styles.travelersDetailsContainer}>
									{/* <View style={styles.travelerDetailTitle}> */}
									<Text>Bébés</Text>
									{/* </View> */}
									<View style={styles.travelerDetailParams}>
										<ButtonIcon
											type="count"
											size={18}
											name="remove-outline"
											onpress={() =>
												babiesNumber > 0 && setBabiesNumber(babiesNumber - 1)
											}
										/>
										<Text>{babiesNumber}</Text>
										<ButtonIcon
											type="count"
											size={18}
											name="add-outline"
											onpress={() => setBabiesNumber(babiesNumber + 1)}
										/>
									</View>
								</View>

								{error && (
									<View style={{ alignItems: 'center', width: '100%' }}>
										<Text style={{ color: 'red' }}>{error}</Text>
									</View>
								)}
							</View>

							{loading && (
								<View style={styles.activityindicatorContainer}>
									<ActivityIndicator size="large" color={COLORS.lightBlue} />
								</View>
							)}
						</View>
						<View style={styles.modalBtnContainer}>
							<Button
								label="Annuler"
								type="secondary"
								size="small"
								onpress={() => setModalVisible(!modalVisible)}
							/>
							<Button
								label="Valider"
								type="primary"
								size="small"
								onpress={() => validateContact()}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	activityindicatorContainer: {
		...StyleSheet.absoluteFillObject,
		top: '100%',
		left: 0,
		zIndex: 10,
		width: '100%',
		height: 50,
		justifyContent: 'space-around',
		backgroundColor: 'white',
	},
	container: {
		flex: 1,
		paddingVertical: 20,
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	btnContainer: {
		width: Platform.OS === 'ios' ? '90%' : '100%',
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	detailsContainer: {
		width: Platform.OS === 'ios' ? '90%' : '100%',
		marginTop: 20,
	},
	pictureContainer: {
		width: Platform.OS === 'ios' ? '90%' : '100%',
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 35,
	},
	infosContainer: {
		margin: 10,
		marginLeft: 20,
		justifyContent: 'center',
	},
	languagesContainer: {
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 250,
	},
	title: {
		flex: 1,
		alignItems: 'center',
	},
	city: {
		fontSize: 18,
		letterSpacing: 1,
		fontWeight: '700',
		color: COLORS.darkBlue,
	},
	age: {
		fontSize: 16,
		color: COLORS.darkBlue,
		paddingVertical: 5,
	},
	description: {
		lineHeight: 20,
	},
	passion: {
		fontSize: 20,
	},
	spokenLanguages: {
		fontSize: 14,
		letterSpacing: 1,
		fontStyle: 'italic',
		paddingRight: 5,
	},
	hobbyContainer: {
		margin: 2,
		borderRadius: 25,
		overflow: 'hidden',
	},
	hobby: {
		color: COLORS.bg,
		paddingVertical: 6,
		paddingHorizontal: 10,
		backgroundColor: COLORS.lightBlue,
	},
	subTitle: {
		fontSize: 24,
		marginBottom: 10,
		color: COLORS.darkBlue,
		textAlign: 'center',
		textTransform: 'uppercase',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		width: '90%',
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	categoryContainer: {
		width: '100%',
	},
	datePickersContainer: {
		marginVertical: 10,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	date: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
	},
	modalDetailsContainer: {
		marginTop: 10,
		marginBottom: 20,
	},
	travelersDetailsContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 5,
		paddingLeft: 10,
	},
	travelerDetailParams: {
		width: '40%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	modalBtnContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});

export default UserProfileScreen;
