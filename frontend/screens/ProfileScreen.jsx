import {
	Image,
	SafeAreaView,
	StyleSheet,
	Modal,
	Text,
	TouchableOpacity,
	View,
	Pressable
} from 'react-native';
import { useState } from 'react';
import { getAge } from '../utils/helper';
import { addData } from '../reducers/user';
import { ERRORS } from '../utils/constants';
import { URL_EXPO } from '../environnement';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import ButtonIcon from '../components/ButtonIcon';
import DatePicker from '../components/DatePicker'
import { AntDesign } from '@expo/vector-icons';

const UserProfileScreen = ({ route, navigation }) => {
	const user = route.params.user;
	const [modalVisible, setModalVisible] = useState(false);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
	const [adultsNbr, setAdultsNbr] = useState(0)
	const [childrenNbr, setChildrenNbr] = useState(0)
	const [babiesNbr, setBabiesNbr] = useState(0)

	const startDateValidated = (date) => {
		setStartDate(date)
		if (endDate <= date) {
			setEndDate(new Date(new Date().setDate(date.getDate() + 1)))
		}

	}

	const calculateNextdate = (date) => {
		return new Date(new Date().setDate(date.getDate() + 1));
	}

	const validateContact = () => {
		setModalVisible(!modalVisible)
		const travelDatas = {
			startDate,
			endDate,
			adultsNbr,
			childrenNbr,
			babiesNbr
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.username}>{user.firstname}</Text>
			<Text style={styles.age}>{getAge(user.dateOfBirth)} ans</Text>
			<View style={styles.headerContainer}>
				<Image
					source={{
						uri: user.avatarUrl,
					}}
					style={styles.image}
				/>
				<Modal
					animationType="fade"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => { setModalVisible(!modalVisible) }}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<View style={styles.categoryContainer}>
								<Text style={styles.subTitle}>Dates</Text>
								<View style={styles.datePickersContainer}>
									<View style={styles.date}>
										<Text>Départ</Text>
										<DatePicker theme='dark' width='95%' date={startDate} label={startDate.toLocaleDateString()}
											onconfirm={(date) => startDateValidated(date)} minimumDate={new Date()} />
									</View>
									<View style={styles.date}>
										<Text>Retour</Text>
										<DatePicker theme='dark' width='95%' date={endDate} label={endDate.toLocaleDateString()}
											onconfirm={(date) => setEndDate(date)} minimumDate={calculateNextdate(startDate)} />
									</View>
								</View>
							</View>
							<View style={styles.categoryContainer}>
								<Text style={styles.subTitle}>Voyageurs</Text>

								<View style={styles.modalDetailsContainer}>
									<View style={styles.travelersDetailsContainer}>
										<View style={styles.travelerDetailTitle}>
											<Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Adultes</Text>
										</View>
										<View style={styles.travelerDetailParams}>
											<TouchableOpacity onPress={() => adultsNbr > 0 && setAdultsNbr(adultsNbr - 1)}>
												<AntDesign name="minuscircleo" size={24} color="black" />
											</TouchableOpacity>
											<Text>{adultsNbr}</Text>
											<TouchableOpacity onPress={() => setAdultsNbr(adultsNbr + 1)}>
												<AntDesign name="pluscircleo" size={24} color="black" />
											</TouchableOpacity>
										</View>
									</View>

									<View style={styles.travelersDetailsContainer}>
										<View style={styles.travelerDetailTitle}>
											<Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Enfants</Text>
										</View>
										<View style={styles.travelerDetailParams}>
											<TouchableOpacity onPress={() => childrenNbr > 0 && setChildrenNbr(childrenNbr - 1)}>
												<AntDesign name="minuscircleo" size={24} color="black" />
											</TouchableOpacity>
											<Text>{childrenNbr}</Text>
											<TouchableOpacity onPress={() => setChildrenNbr(childrenNbr + 1)}>
												<AntDesign name="pluscircleo" size={24} color="black" />
											</TouchableOpacity>
										</View>
									</View>

									<View style={styles.travelersDetailsContainer}>
										<View style={styles.travelerDetailTitle}>
											<Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>Bébés</Text>
										</View>
										<View style={styles.travelerDetailParams}>
											<TouchableOpacity onPress={() => babiesNbr > 0 && setBabiesNbr(babiesNbr - 1)}>
												<AntDesign name="minuscircleo" size={24} color="black" />
											</TouchableOpacity>
											<Text>{babiesNbr}</Text>
											<TouchableOpacity onPress={() => setBabiesNbr(babiesNbr + 1)}>
												<AntDesign name="pluscircleo" size={24} color="black" />
											</TouchableOpacity>
										</View>
									</View>
								</View>

							</View>
							<View style={styles.btnContainer}>
								<TouchableOpacity
									style={[styles.button, styles.buttonClose]}
									onPress={() => setModalVisible(!modalVisible)}>
									<Text style={styles.textStyle}>Annuler</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[styles.button, styles.buttonClose]}
									onPress={() => validateContact()}>
									<Text style={styles.textStyle}>Valider</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
				<TouchableOpacity style={styles.hostingBtn} onPress={() => setModalVisible(true)}>
					<Text style={styles.hostingTxt}>Contact</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.detailsContainer}>

				<View style={styles.optionsContainer}>
					<Text style={STYLES_GLOBAL.textDark}>{user.description}</Text>
				</View>
			</View>

			<View style={styles.detailsContainer}>
				<Text style={styles.subTitle}>Informations</Text>
				<View style={styles.optionsContainer}>
					<Text style={[STYLES_GLOBAL.textDark, styles.details]}>
						Lieu de résidence
					</Text>
					<Text style={[STYLES_GLOBAL.textDark, styles.details]}>
						{user.city.name}
					</Text>
				</View>
				<View style={styles.optionsContainer}>
					<Text style={[STYLES_GLOBAL.textDark, styles.details]}>
						Langues parlées
					</Text>
					<View style={styles.languagesContainer}>
						{user.spokenLanguages.map((language, i) => (
							<Text key={i} style={[STYLES_GLOBAL.textDark, styles.details, styles.hobby]}>
								{language}
							</Text>
						))}
					</View>
				</View>
			</View>

			<View style={styles.passionsContainer}>
				<View>
					<Text style={styles.subTitle}>Passions</Text>
				</View>
				<View style={styles.hobbiesContainer}>
					{user.hobbies.map((h, i) => (
						<Text key={i} style={styles.hobby}>{h}</Text>
					))}
				</View>
			</View>

		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 40,
		paddingHorizontal: 20,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	username: {
		color: COLORS.darkBlue,
		fontSize: 30,
		alignItems: 'center'
	},
	hostingBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 80,
		width: 80
	},
	hostingTxt: {
		backgroundColor: '#95B8D1',
		height: '100%',
		width: '100%',
		textAlign: 'center',
		textAlignVertical: 'center',
		borderRadius: 30
	},
	optionsContainer: {
		width: Platform.OS === 'ios' ? '90%' : '100%',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	headerContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'

	},
	switchContainer: {
		alignItems: 'center',
	},
	detailsContainer: {
		width: Platform.OS === 'ios' ? '90%' : '100%',
	},
	passionsContainer: {
		width: '100%'
	},
	languagesContainer: {
		flex: 1,
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	imageContainer: {
		padding: 20,
	},
	image: {
		width: 120,
		height: 120,
		borderRadius: 250,
	},
	age: {
		fontSize: 18
	},
	name: {
		fontSize: 24,
		letterSpacing: 1,
		color: COLORS.darkBlue,
		textTransform: 'capitalize',
	},
	subTitle: {
		fontSize: 24,
		color: COLORS.darkBlue,
		textTransform: 'uppercase',
	},
	hobbiesContainer: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	hobby: {
		textAlign: 'center',
		textAlignVertical: 'center',
		margin: 5,
		borderRadius: 25,
		overflow: 'hidden',
		justifyContent: 'center',
		alignItems: 'center',
		color: COLORS.bg,
		paddingVertical: 5,
		paddingHorizontal: 15,
		backgroundColor: COLORS.lightBlue,
	},
	details: {
		paddingVertical: 2,
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
	button: {
		marginHorizontal: 10,
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
	categoryContainer: {
		width: '100%'
	},
	datePickersContainer: {
		marginVertical: 10,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	date: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%'
	},
	modalDetailsContainer: {
		marginTop: 10,
		marginBottom: 20
	},
	travelersDetailsContainer: {
		width: '100%',
		flexDirection: 'row',
		marginVertical: 5
	},
	travelerDetailTitle: {
		paddingLeft: 10,
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: '60%'
	},
	travelerDetailParams: {
		width: '40%',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	btnContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default UserProfileScreen;
