import { useEffect, useRef, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Button,
	Image,
} from 'react-native';
import { URL_EXPO } from '../utils/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Pusher from 'pusher-js/react-native';
import { useSelector } from 'react-redux';
import { COLORS, RADIUS } from '../utils/styles';
import { useIsFocused } from '@react-navigation/native';
import ButtonIcon from '../components/buttons/ButtonIcon';

const ChatScreen = ({ navigation, route: { params } }) => {
	let pusher = null;
	const isFocused = useIsFocused();
	const user = useSelector((state) => state.user.value);
	const [messages, setMessages] = useState([]);
	const [messageText, setMessageText] = useState('');

	useEffect(() => {
		pusher = new Pusher('61007bd879a7928d12d9', { cluster: 'eu' });
		const chatname = params.chat.traveler._id + params.chat.host._id;
		fetch(`${URL_EXPO}/chats/previousMessages/${chatname}`)
			.then((resp) => resp.json())
			.then((data) => {
				setMessages(data.messages);
			});
	}, [isFocused]);

	//Join and leave chat
	useEffect(() => {
		const chatname = params.chat.traveler._id + params.chat.host._id;
		(() => {
			fetch(`${URL_EXPO}/chats/${chatname}/${user.firstname}`, {
				method: 'PUT',
			});

			const subscription = pusher.subscribe(chatname);

			subscription.bind('pusher:subscription_succeeded', () => {
				subscription.bind('message', handleReceiveMessage);
			});
		})();

		return async () =>{
			await pusher.disconnect();
			fetch(`${URL_EXPO}/chats/${chatname}/${user.firstname}`, {
				method: 'DELETE',
			});
		}
	}, [isFocused]);

	const handleReceiveMessage = async (data) => {
		setMessages((messages) => [...messages, data]);
	};

	const handleSendMessage = () => {
		if (!messageText) {
			return;
		}

		const payload = {
			text: messageText,
			username: user.firstname,
			chatname: params.chat.traveler._id + params.chat.host._id,
			createdAt: new Date(),
			id: Math.floor(Math.random() * 100000),
		};
		fetch(`${URL_EXPO}/chats/message`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});

		setMessageText('');
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<View style={styles.banner}>
				{/* <MaterialIcons
					name="keyboard-backspace"
					color="#ffffff"
					size={24}
					onPress={() => navigation.goBack()}
				/> */}
				<ButtonIcon
					type="primary"
					size={18}
					name="arrow-back-outline"
					onpress={() => navigation.goBack()}
				/>
				<Image
					source={{ uri: params.chat.traveler.avatarUrl }}
					style={styles.avatar}
				/>
				<Text style={styles.greetingText}>
					{params.chat.traveler.firstname} • {params.chat.traveler.city.name}
				</Text>
			</View>

			<View style={styles.inset}>
				<ScrollView
					ref={(ref) => {
						this.scrollView = ref;
					}}
					onContentSizeChange={() =>
						this.scrollView.scrollToEnd({ animated: true })
					}
					style={styles.scroller}>
					{messages.map((message, i) => (
						<View
							key={i}
							style={[
								styles.messageWrapper,
								{
									...(message.username === user.firstname
										? styles.messageSent
										: styles.messageRecieved),
								},
							]}>
							<View
								style={[
									styles.message,
									{
										...(message.username === user.firstname
											? styles.messageSentBg
											: styles.messageRecievedBg),
									},
								]}>
								<Text style={styles.messageText}>{message.text}</Text>
							</View>
							<Text style={styles.timeText}>
								{new Date(message.createdAt).getHours()}:
								{String(new Date(message.createdAt).getMinutes()).padStart(
									2,
									'0'
								)}
							</Text>
						</View>
					))}
				</ScrollView>

				<View style={styles.inputContainer}>
					<TextInput
						onChangeText={(value) => setMessageText(value)}
						value={messageText}
						style={styles.input}
						autoFocus
					/>
					{/* <TouchableOpacity
						onPress={() => handleSendMessage()}
						style={styles.sendButton}>
						<MaterialIcons name="send" color="#ffffff" size={24} />
					</TouchableOpacity> */}
					<ButtonIcon
						name="send-outline"
						size={24}
						type="primary"
						onpress={() => handleSendMessage()}
					/>
				</View>
			</View>
		</KeyboardAvoidingView>
	);
}

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.darkBlue,
	},
	inset: {
		flex: 1,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		backgroundColor: COLORS.bg,
		width: '100%',
		paddingTop: 20,
		position: 'relative',
		borderTopColor: COLORS.lightBlue,
		borderLeftColor: COLORS.lightBlue,
		borderRightColor: COLORS.lightBlue,
		borderTopWidth: 4,
		borderRightWidth: 0.1,
		borderLeftWidth: 0.1,
	},
	banner: {
		width: '100%',
		height: '15%',
		paddingTop: 20,
		paddingLeft: 20,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	greetingText: {
		color: COLORS.bg,
		fontWeight: 'bold',
		fontSize: 18,
		marginLeft: 15,
	},
	message: {
		paddingTop: 12,
		paddingBottom: 12,
		paddingRight: 20,
		paddingLeft: 20,
		borderRadius: 24,
		alignItems: 'flex-end',
		justifyContent: 'center',
		maxWidth: '65%',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 6.41,
		elevation: 1.2,
	},
	messageWrapper: {
		alignItems: 'flex-end',
		marginBottom: 20,
	},
	messageRecieved: {
		alignSelf: 'flex-end',
		alignItems: 'flex-end',
	},
	messageSent: {
		alignSelf: 'flex-start',
		alignItems: 'flex-start',
	},
	messageSentBg: {
		backgroundColor: '#ffad99',
		// backgroundColor: COLORS.extralightPink,
	},
	messageRecievedBg: {
		backgroundColor: '#d6fff9',
		// backgroundColor: COLORS.lightBlue,
	},
	messageText: {
		color: '#506568',
		fontWeight: '400',
	},
	timeText: {
		color: '#506568',
		opacity: 0.5,
		fontSize: 10,
		marginTop: 2,
	},
	inputContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		justifySelf: 'flex-end',
		alignItems: 'center',
		// alignContent: 'flex-start',
		marginBottom: 30,
		marginTop: 'auto',
		background: 'transparent',
		paddingLeft: 20,
		paddingRight: 20,
	},
	input: {
		backgroundColor: '#f0f0f0',
		width: '60%',
		padding: 14,
		marginRight: 10,
		borderRadius: RADIUS.card,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 6.41,
		elevation: 1.2,
	},
	avatar: {
		width: 62,
		height: 62,
		marginLeft: 20,
		borderRadius: RADIUS.image,
	},
	// recordButton: {
	// 	borderRadius: 50,
	// 	padding: 16,
	// 	backgroundColor: '#ff5c5c',
	// 	marginLeft: 12,
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// 	shadowColor: '#000',
	// 	shadowOffset: {
	// 		width: 0,
	// 		height: 1,
	// 	},
	// 	shadowOpacity: 0.2,
	// 	shadowRadius: 6.41,
	// 	elevation: 1.2,
	// },
	// sendButton: {
	// 	borderRadius: 50,
	// 	padding: 16,
	// 	backgroundColor: '#ffe099',
	// 	marginLeft: 12,
	// 	alignItems: 'center',
	// 	justifyContent: 'center',
	// 	shadowColor: '#000',
	// 	shadowOffset: {
	// 		width: 0,
	// 		height: 1,
	// 	},
	// 	shadowOpacity: 0.2,
	// 	shadowRadius: 6.41,
	// 	elevation: 1.2,
	// },
	// buttonText: {
	// 	color: '#ffffff',
	// 	fontWeight: '800',
	// 	textTransform: 'uppercase',
	// },
	scroller: {
		paddingLeft: 20,
		paddingRight: 20,
	},
});
