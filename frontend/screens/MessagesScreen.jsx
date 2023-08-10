import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
	Image,
	ScrollView,
} from 'react-native';
import ButtonIcon from '../components/buttons/ButtonIcon';
import { URL_EXPO } from '../utils/constants';

import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { STYLES_GLOBAL, COLORS, RADIUS } from '../utils/styles';

const MessagesScreen = ({ navigation }, props) => {
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user.value);
	const [chats, setChats] = useState([]);

	useEffect(() => {
		if (isFocused) {
			fetch(`${URL_EXPO}/chats/${user.token}`)
				.then((resp) => resp.json())
				.then((resp) => {
					setChats(resp.chats);
				});
		}
	}, [isFocused]);

	const chatList = chats.map((chat, i) => {
		let userToDisplay = chat.traveler;
		if (chat.host.email !== user.email) {
			userToDisplay = chat.host;
		}

		return (
			<TouchableOpacity
				key={i}
				style={styles.messageContainer}
				onPress={() => chatClicked(chat)}>
				<Image
					source={{ uri: userToDisplay.avatarUrl }}
					style={styles.avatar}
				/>
				<View style={styles.profilContainer}>
					<Text style={styles.name}>{userToDisplay.firstname}</Text>
					<Text style={styles.city}>• {userToDisplay.city.name}</Text>
				</View>

				<ButtonIcon
					onpress={() => chatClicked(chat)}
					name="arrow-forward-outline"
					type="transparent"
				/>
			</TouchableOpacity>
		);
	});

	const chatClicked = (chat) => {
		navigation.navigate('Chat', { chat });
	};

	return (
		<View style={styles.container}>
			<Text style={[STYLES_GLOBAL.subTitle, styles.title]}>Messages</Text>
			<ScrollView contentContainerStyle={styles.messagesContainer}>
				{chatList}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: COLORS.bg,
	},
	title: {
		margin: 20,
		marginBottom: 30,
	},
	messagesContainer: {
		width: '90%',
		alignItems: 'center',
	},
	messageContainer: {
		marginVertical: 10,
		padding: 10,
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '90%',
		borderRadius: RADIUS.card,
		backgroundColor: 'white',
	},
	avatar: {
		width: 42,
		height: 42,
		borderRadius: 50,
	},
	message: {
		marginStart: 20,
	},
	profilContainer: {
		flexDirection: 'row',
		alignItems: 'baseline',
	},
	name: {
		fontSize: 16,
		fontWeight: '700',
		paddingHorizontal: 10,
		color: COLORS.darkBlue,
	},
	city: {
		fontSize: 14,
		color: COLORS.darkBlue,
	},
});

export default MessagesScreen;
