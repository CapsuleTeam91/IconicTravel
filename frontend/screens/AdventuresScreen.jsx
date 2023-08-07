import { StyleSheet, Text, View } from 'react-native';
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

	let pendingBooksList = [];

	if (user.bookings) {
		pendingBooksList = user.bookings.map((booking, index) => {
			return (
				booking.host === user._id && (
					<AdventureCard
						key={index}
						userMatched={booking.traveler}
						startDate={new Date(booking.startDate).toLocaleDateString()}
						endDate={new Date(booking.endDate).toLocaleDateString()}
						handleDismiss={() => {}}
						handleValidate={() => {}}
					/>
				)
			);
		});
	}

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

			{currentTab === ADVENTURE_STATE.pending && pendingBooksList}
		</View>
	);
};

export default AdventuresScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: COLORS.bg,
		paddingVertical: 40,
	},
	tabContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginTop: 40,
		overflow: 'visible',
	},
});
