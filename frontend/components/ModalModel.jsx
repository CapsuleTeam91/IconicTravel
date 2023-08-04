import { COLORS, STYLES_GLOBAL } from '../utils/styles';
import { StyleSheet, Text, View, Modal } from 'react-native';
import ButtonIcon from './ButtonIcon';

const ModalModel = ({ visible, setVisible, title, children }) => {
	return (
		<Modal visible={visible} animationType="fade" transparent>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={styles.closeBtn}>
						<ButtonIcon
							type="transparent"
							name="close-outline"
							onpress={() => setVisible(false)}
						/>
					</View>
					<Text style={STYLES_GLOBAL.subTitle}>{title}</Text>
					{children}
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	subTitle: {
		textAlign: 'left',
		alignSelf: 'flex-start',
		marginLeft: 20,
		fontSize: 20,
	},
	centeredView: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.bgModal,
	},
	modalView: {
		width: '100%',
		paddingHorizontal: 20,
		paddingVertical: 30,
		borderRadius: 20,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		elevation: 5,
		shadowRadius: 4,
		shadowOpacity: 0.25,
		shadowColor: 'black',
		alignItems: 'center',
		backgroundColor: COLORS.bg,
	},
	closeBtn: {
		alignSelf: 'flex-end',
	},
});

export default ModalModel;
