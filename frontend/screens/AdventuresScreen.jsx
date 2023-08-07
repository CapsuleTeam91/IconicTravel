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

	const userMatched = {
		firstname: 'Laura',
		city: 'San Francisco',
		avatarUrl: thisUser.avatarUrl,
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

			{currentTab === ADVENTURE_STATE.pending && (
				<AdventureCard
					userMatched={userMatched}
					handleDismiss={() => {}}
					handleValidate={() => {}}
				/>
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
