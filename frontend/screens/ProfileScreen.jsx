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

const UserProfileScreen = ({ route, navigation }) => {
	const user = route.params.user;
	const [modalVisible, setModalVisible] = useState(false);

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
					onRequestClose={() => {setModalVisible(!modalVisible)}}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Hello World!</Text>
							<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}>
							<Text style={styles.textStyle}>Hide Modal</Text>
							</Pressable>
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
				<View  style={styles.hobbiesContainer}>
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
	modale: {
		width:'50%',
		height: '50%',
		backgroundColor: 'blue'
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	  },
	  modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
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
});

export default UserProfileScreen;
