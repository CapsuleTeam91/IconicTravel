import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DISTANCES } from '../../utils/data';
import { COLORS } from '../../utils/styles';

export const DropdownDistances = ({
	distanceSelected,
	setDistanceSelected,
}) => {
	return (
		<Dropdown
			style={styles.dropdown}
			placeholderStyle={styles.placeholderStyle}
			selectedTextStyle={styles.selectedTextStyle}
			containerStyle={styles.containerStyle}
			itemTextStyle={styles.itemTextStyle}
			data={DISTANCES}
			maxHeight={300}
			labelField="label"
			valueField="value"
			placeholder=""
			value={distanceSelected}
			onChange={(item) => {
				item.label === 'Illimité'
					? setDistanceSelected(null)
					: setDistanceSelected(item);
			}}
			mode="default"
			renderLeftIcon={() => (
				<MaterialCommunityIcons
					name="map-marker-distance"
					size={24}
					color={COLORS.bg}
				/>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	dropdown: {
		justifyContent: 'center',
		alignItems: 'center',
		// width: 120,
		margin: 16,
		height: 50,
		borderRadius: 8,
		borderBottomColor: 'gray',
		borderBottomWidth: 0.5,
		backgroundColor: COLORS.bgDark,
		paddingHorizontal: 15,
	},
	icon: {
		marginRight: 5,
		color: COLORS.bg,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
		color: COLORS.bg,
	},
	// inputSearchStyle: {
	// 	height: 40,
	// 	fontSize: 16,
	// },
	// dropdown: {
	// 	// height: 50,
	// 	width: '70%',

	// 	color: COLORS.bg,
	// 	paddingVertical: 3,
	// 	paddingHorizontal: 10,

	// },
	placeholderStyle: {
		// color: COLORS.bg,
		paddingHorizontal: 5,
	},
	selectedTextStyle: {
		fontSize: 16,
		color: COLORS.bg,
	},
	containerStyle: {
		maxHeight: 300,
		paddingTop: 15,
		borderRadius: 8,
		backgroundColor: COLORS.lightBlue,
	},
	itemTextStyle: {
		fontSize: 12,
		color: COLORS.bg,
	},
});
