import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	Touchable,
	TouchableOpacity,
	View,
	Image,
} from 'react-native';
import { COLORS, COLORS_THEME, STYLES_GLOBAL } from '../utils/styles';
import ButtonIcon from '../components/ButtonIcon';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { URL_EXPO } from '../environnement';
import { useIsFocused } from '@react-navigation/native';

const AdventuresScreen = ({ navigation }) => {
	const thisUser = useSelector((state) => state.user.value);

	const isFocused = useIsFocused();

	const [currentTab, setCurrentTab] = useState('confirmes');
	const [bookings, setBookings] = useState([]);

	useEffect(() => {
		if (isFocused) {
			fetch(`${URL_EXPO}:3000/bookings/${thisUser.token}`)
				.then((resp) => resp.json())
				.then((result) => {
					setBookings(result.bookings);
				});
		}
	}, [isFocused]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Iconic Adventures</Text>
			<View style={styles.tabContainer}>
				<TouchableOpacity
					style={[styles.tab]}
					onPress={() => setCurrentTab('confirmes')}>
					<Text
						style={[
							styles.confirmesContainer,
							{
								backgroundColor:
									currentTab === 'confirmes' ? COLORS.darkBlue : '#ffff',

								color: currentTab === 'confirmes' ? 'white' : COLORS.darkBlue,
								borderWidth: currentTab === 'confirmes' ? 0 : 1,
								borderColor: currentTab === 'confirmes' && COLORS.darkBlue,
							},
						]}>
						Confirmés
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tab]}
					onPress={() => setCurrentTab('en_attente')}>
					<Text
						style={[
							styles.enAttenteContainer,
							{
								backgroundColor:
									currentTab !== 'confirmes' ? COLORS.darkBlue : '#ffff',

								color: currentTab !== 'confirmes' ? 'white' : COLORS.darkBlue,
								borderWidth: currentTab !== 'confirmes' ? 0 : 1,
								borderColor: currentTab !== 'confirmes' && COLORS.darkBlue,
							},
						]}>
						En Attente
					</Text>
				</TouchableOpacity>
			</View>

			{currentTab === 'confirmes' ? (
				<></>
			) : (
				<View style={styles.bookingContainer}>
					<Image source={{ uri: thisUser.avatarUrl }} style={styles.avatar} />
					<View style={styles.profilContainer}>
						<Text>Laura</Text>
					</View>
					<View style={styles.btnContainer}>
						<ButtonIcon
							onpress={() => {}}
							name="close-outline"
							type="transparent"
						/>
						<ButtonIcon
							onpress={() => {}}
							name="checkmark-outline"
							type="transparent"
						/>
					</View>
				</View>
			)}
		</View>
	);
};

export default AdventuresScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: '#f0f0f0',
	},
	title: {
		color: COLORS.darkBlue,
		fontSize: 20,
		marginTop: 30,
		letterSpacing: 1.2,
		fontWeight: '700',
		textAlign: 'center',
		textTransform: 'uppercase',
	},
	tabContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: 10,
		marginTop: 20,
		overflow: 'visible',
	},
	tab: {
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	confirmesContainer: {
		// backgroundColor: currentTab === 'confirmes' ? COLORS.darkBlue : '#ffff',
		borderRadius: 10,
		textAlign: 'center',
		// color: currentTab === 'confirmes' ? 'white' : COLORS.darkBlue,
		// borderWidth: currentTab === 'confirmes' ? 0 : 1,
		// borderColor: currentTab === 'confirmes' && COLORS.darkBlue,
		fontWeight: 'bold',
		paddingVertical: 12,
		paddingHorizontal: 30,
		marginVertical: 30,
		overflow: 'hidden',
	},

	enAttenteContainer: {
		// backgroundColor: currentTab !== 'confirmes' ? COLORS.darkBlue : '#ffff',
		borderRadius: 10,
		fontWeight: 'bold',
		textAlign: 'center',
		borderWidth: 1,
		// color: currentTab !== 'confirmes' ? 'white' : COLORS.darkBlue,
		// borderWidth: currentTab !== 'confirmes' ? 0 : 1,
		// borderColor: currentTab !== 'confirmes' && COLORS.darkBlue,
		paddingVertical: 12,
		paddingHorizontal: 30,
		marginVertical: 30,
		overflow: 'hidden',
	},
	bookingContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,
		width: '80%',
		height: '10%',
		borderWidth: 1,
		borderRadius: 20,
	},
	profilContainer: {
		backgroundColor: 'red',
		// width: '100%',
		height: '50%',
	},
	avatar: {
		width: '15%',
		height: '80%',
		borderRadius: 250,
	},
	btnContainer: {
		flexDirection: 'row',
		width: '100%',
		height: '50%',
	},
});
