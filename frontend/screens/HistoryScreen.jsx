import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import Button from '../components/buttons/Button';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { URL_EXPO } from '../environnement';
import { useIsFocused } from '@react-navigation/native';
import { AdventureCard } from '../components/cards/AdventuresCard';

const HistoryScreen = ({ navigation }) => {
	const isFocused = useIsFocused();
	const thisUser = useSelector((state) => state.user.value);
	const [user, setUser] = useState({});
	const [doneTravels, setDoneTravels] = useState([]);
	const [doneHosts, setDoneHosts] = useState([]);
	const [needReload, setNeedReload] = useState(false);

	useEffect(() => {
		if (isFocused) {
			fetch(`${URL_EXPO}:3000/bookings/${thisUser.token}`)
				.then((resp) => resp.json())
				.then((result) => {
					setUser(result.user);

					if (result.user.bookings) {
						setDoneTravels(
							result.user.bookings.filter(
								(booking) =>
									booking.endDate <= new Date() &&
									booking.host._id !== result.user._id
							)
						);
						setDoneHosts(
							result.user.bookings.filter(
								(booking) =>
									booking.endDate <= new Date() &&
									booking.host._id === result.user._id
							)
						);
					}
				});
		}
	}, [isFocused, needReload]);

	return (
		<View style={styles.container}>
			<Text style={STYLES_GLOBAL.subTitle}>Iconic Adventures</Text>

			{/* <View style={styles.tabContainer}>
				<Button
					label="Confirmés"
					type={
						currentTab === ADVENTURE_STATE.confirmed ? 'primary' : 'secondary'
					}
					onpress={() => setCurrentTab(ADVENTURE_STATE.confirmed)}
				/>
				<Button
					label="En attente"
					type={
						currentTab === ADVENTURE_STATE.pending ? 'primary' : 'secondary'
					}
					onpress={() => setCurrentTab(ADVENTURE_STATE.pending)}
				/>
			</View> */}

			{doneHosts.length > 0 && (
				<>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Hosts</Text>
						<Text>({doneHosts.length})</Text>
					</View>
					<ScrollView
						contentContainerStyle={styles.resultsContainer}
						style={styles.scrollViewItems}>
						{doneHosts.map((booking, index) => (
							<AdventureCard
								key={index}
								isHost={true}
								isConfirmed={true}
								userMatched={booking.traveler}
								startDate={new Date(booking.startDate).toLocaleDateString()}
								endDate={new Date(booking.endDate).toLocaleDateString()}
								handleDismiss={() => deleteBooking(booking._id)}
								handleValidate={() => validateBooking(booking._id)}
							/>
						))}
					</ScrollView>
				</>
			)}
			{doneTravels.length > 0 && (
				<>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Travels</Text>
						<Text>({doneTravels.length})</Text>
					</View>
					<ScrollView
						contentContainerStyle={styles.resultsContainer}
						style={styles.scrollViewItems}>
						{doneTravels.map((booking, index) => (
							<AdventureCard
								key={index}
								isHost={false}
								isConfirmed={true}
								userMatched={booking.host}
								startDate={new Date(booking.startDate).toLocaleDateString()}
								endDate={new Date(booking.endDate).toLocaleDateString()}
								handleDismiss={() => deleteBooking(booking._id)}
								handleValidate={() => {}}
							/>
						))}
					</ScrollView>
				</>
			)}
		</View>
	);
};

export default HistoryScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 40,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: COLORS.bg,
	},
	tabContainer: {
		width: '100%',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	resultsContainer: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	scrollViewItems: {
		width: '100%',
		height: 260,
	},
	titleContainer: {
		width: '90%',
		marginVertical: 15,
		paddingHorizontal: 5,
		borderBottomWidth: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 8,
		borderColor: COLORS.bgDark,
	},
	title: {
		fontSize: 18,
		paddingRight: 5,
		fontWeight: '700',
	},
});
