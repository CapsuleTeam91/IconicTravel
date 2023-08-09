import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import Button from '../components/buttons/Button';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { URL_EXPO } from '../environnement';
import { useIsFocused } from '@react-navigation/native';
import { AdventureCard } from '../components/cards/AdventuresCard';

const ADVENTURE_STATE = {
	confirmed: 'confirmed',
	pending: 'pending',
};
const AdventuresScreen = ({ navigation }) => {
	const isFocused = useIsFocused();
	const thisUser = useSelector((state) => state.user.value);
	const [currentTab, setCurrentTab] = useState(ADVENTURE_STATE.confirmed);
	const [user, setUser] = useState({});
	const [pendingTravels, setPendingTravels] = useState([]);
	const [pendingHosts, setPendingHosts] = useState([]);
	const [confirmedTravels, setConfirmedTravels] = useState([]);
	const [confirmedHosts, setConfirmedHosts] = useState([]);
	const [needReload, setNeedReload] = useState(false);

	useEffect(() => {
		if (isFocused) {
			fetch(`${URL_EXPO}:3000/bookings/${thisUser.token}`)
				.then((resp) => resp.json())
				.then((result) => {
					setUser(result.user);

					if (result.user.bookings) {
						const bookings = result.user.bookings.filter(
							(booking) => new Date(booking.endDate) > new Date()
						);
						setConfirmedTravels(
							bookings.filter(
								(booking) =>
									booking.status === 'Confirmé' &&
									booking.host._id !== result.user._id
							)
						);
						setConfirmedHosts(
							bookings.filter(
								(booking) =>
									booking.status === 'Confirmé' &&
									booking.host._id === result.user._id
							)
						);
						setPendingTravels(
							bookings.filter(
								(booking) =>
									booking.status !== 'Confirmé' &&
									booking.host._id !== result.user._id
							)
						);
						setPendingHosts(
							bookings.filter(
								(booking) =>
									booking.status !== 'Confirmé' &&
									booking.host._id === result.user._id
							)
						);
					}
				});
		}
	}, [isFocused, needReload]);

	const deleteBooking = (id) => {
		fetch(`${URL_EXPO}:3000/bookings/delete/${id}`, { method: 'DELETE' })
			.then((resp) => resp.json())
			.then(() => {
				setNeedReload(!needReload);
			});
	};

	const validateBooking = (id) => {
		fetch(`${URL_EXPO}:3000/bookings/update/${id}`, { method: 'PATCH' })
			.then((resp) => resp.json())
			.then(() => {
				setNeedReload(!needReload);
			});
	};

	return (
		<View style={styles.container}>
			<Text style={STYLES_GLOBAL.subTitle}>Iconic Adventures</Text>

			<View style={styles.tabContainer}>
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
			</View>

			{currentTab === ADVENTURE_STATE.pending && pendingHosts.length > 0 && (
				<>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Hosts</Text>
						<Text>({pendingHosts.length})</Text>
					</View>
					<ScrollView
						contentContainerStyle={styles.resultsContainer}
						style={styles.scrollViewItems}>
						{pendingHosts.map((booking, index) => (
							<AdventureCard
								key={index}
								isHost={true}
								navigation={navigation}
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
			{currentTab === ADVENTURE_STATE.pending && pendingTravels.length > 0 && (
				<>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>Travels</Text>
						<Text>({pendingTravels.length})</Text>
					</View>
					<ScrollView
						contentContainerStyle={styles.resultsContainer}
						style={styles.scrollViewItems}>
						{pendingTravels.map((booking, index) => (
							<AdventureCard
								key={index}
								isHost={false}
								navigation={navigation}
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
			{currentTab === ADVENTURE_STATE.confirmed &&
				confirmedHosts.length > 0 && (
					<>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Hosts</Text>
							<Text>({confirmedHosts.length})</Text>
						</View>
						<ScrollView
							contentContainerStyle={styles.resultsContainer}
							style={styles.scrollViewItems}>
							{confirmedHosts.map((booking, index) => (
								<AdventureCard
									key={index}
									isHost={false}
									navigation={navigation}
									userMatched={booking.traveler}
									startDate={new Date(booking.startDate).toLocaleDateString()}
									endDate={new Date(booking.endDate).toLocaleDateString()}
									handleDismiss={() => {}}
									handleValidate={() => {}}
								/>
							))}
						</ScrollView>
					</>
				)}
			{currentTab === ADVENTURE_STATE.confirmed &&
				confirmedTravels.length > 0 && (
					<>
						<View style={styles.titleContainer}>
							<Text style={styles.title}>Travels</Text>
							<Text>({confirmedTravels.length})</Text>
						</View>
						<ScrollView
							contentContainerStyle={styles.resultsContainer}
							style={styles.scrollViewItems}>
							{confirmedTravels.map((booking, index) => (
								<AdventureCard
									key={index}
									isHost={false}
									navigation={navigation}
									userMatched={booking.host}
									startDate={new Date(booking.startDate).toLocaleDateString()}
									endDate={new Date(booking.endDate).toLocaleDateString()}
									handleDismiss={() => {}}
									handleValidate={() => {}}
								/>
							))}
						</ScrollView>
					</>
				)}
		</View>
	);
};

export default AdventuresScreen;

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
