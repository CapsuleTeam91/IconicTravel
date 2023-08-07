import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import ButtonIcon from '../components/buttons/ButtonIcon';
import { URL_EXPO } from '../environnement';
import { STYLES_GLOBAL, COLORS } from '../utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

const MessagesScreen = ({ navigation }, props) => {
	const isFocused = useIsFocused();

	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		if (isFocused) {
			fetch(`${URL_EXPO}:3000/chats/${user.token}`)
				.then((resp) => resp.json())
				.then((chats) => {
					console.log(chats);
				});
		}
	}, [isFocused]);



	return (
		<View style={styles.container}>
			<Text style={styles.title}>Messages</Text>
			<View style={styles.messageContainer}>

			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0',
	},
	title: {
		color: COLORS.darkBlue,
		fontSize: 20,
		letterSpacing: 1.2,
		fontWeight: '700',
		textAlign: 'center',
		textTransform: 'uppercase',
		marginTop: 20,
	},
	messageContainer: {
		marginTop: 50,
	},
});

export default MessagesScreen;
