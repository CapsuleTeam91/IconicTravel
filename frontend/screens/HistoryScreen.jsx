import { useSelector } from 'react-redux';
import { URL_EXPO } from '../utils/constants';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { COLORS, RADIUS, STYLES_GLOBAL } from '../utils/styles';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { AdventureCard } from '../components/cards/AdventuresCard';

const HistoryScreen = ({ navigation }) => {
	const isFocused = useIsFocused();
	const thisUser = useSelector((state) => state.user.value);
	const [doneTravels, setDoneTravels] = useState([]);
	const [doneHosts, setDoneHosts] = useState([]);
	const [needReload, setNeedReload] = useState(false);

	useEffect(() => {
		if (isFocused) {
			fetch(`${URL_EXPO}/bookings/${thisUser.token}`)
				.then((resp) => resp.json())
				.then((result) => {
					if (result.user.bookings) {
						setDoneTravels(
							result.user.bookings.filter(
								(booking) =>
									new Date(booking.endDate) <= new Date() &&
									booking.host._id !== result.user._id
							)
						);
						setDoneHosts(
							result.user.bookings.filter(
								(booking) =>
									new Date(booking.endDate) <= new Date() &&
									booking.host._id === result.user._id
							)
						);
					}
				});
		}
	}, [isFocused, needReload]);

	return (
		<View style={styles.container}>
			<Text style={STYLES_GLOBAL.subTitle}>Iconic Story</Text>

			{!doneHosts.length && !doneTravels.length && (
				<View style={styles.emptyContainer}>
					<Text style={styles.empty}>
						Tu n'as pas encore d'Iconic Adventure dans ton historique
					</Text>
				</View>
			)}

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
								booking={booking}
								navigation={navigation}
								handleDismiss={() => {}}
								handleValidate={() => {}}
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
								booking={booking}
								navigation={navigation}
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
	emptyContainer: {
		width: '70%',
		padding: 20,
		paddingVertical: 40,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '20%',
		backgroundColor: 'white',
		borderRadius: RADIUS.card,
	},
	empty: {
		textAlign: 'center',
		fontSize: 16,
		letterSpacing: 1,
	},
});
