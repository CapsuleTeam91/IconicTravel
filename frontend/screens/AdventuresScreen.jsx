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

	useEffect(() => {
		if (isFocused) {
			fetch(`${URL_EXPO}:3000/bookings/${thisUser.token}`)
				.then((resp) => resp.json())
				.then((result) => {
					setUser(result.user);
				});
		}
	}, [isFocused]);

	console.log('User Trouvé : ', user);

	let pendingTravels = [];
	let pendingHosts = [];

	if (user.bookings) {
		pendingTravels = user.bookings.filter(
			(booking) => booking.host !== user._id
		);
		pendingHosts = user.bookings.filter((booking) => booking.host === user._id);
	}

	// if (user.bookings) {
	// 	pendingBooksList = user.bookings.map((booking, index) => {
	// 		return (
	// 			//Créer une scrollview pour les hostings requests et une pour les user's requests en attente
	// 			booking.host === user._id && (
	// 				<ScrollView>
	// 					{/* <Text>Hosts</Text> */}
	// 					<AdventureCard
	// 						key={index}
	// 						userMatched={booking.traveler}
	// 						startDate={new Date(booking.startDate).toLocaleDateString()}
	// 						endDate={new Date(booking.endDate).toLocaleDateString()}
	// 						handleDismiss={() => {}}
	// 						handleValidate={() => {}}
	// 					/>
	// 				</ScrollView>
	// 			)
	// 		);
	// 	});
	// }

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
								userMatched={booking.traveler}
								startDate={new Date(booking.startDate).toLocaleDateString()}
								endDate={new Date(booking.endDate).toLocaleDateString()}
								isHost={false}
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
		marginBottom: 5,
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
