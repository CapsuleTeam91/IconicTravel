import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/styles';
import { DISTANCES } from '../../utils/data';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
		height: 43,
		borderRadius: 8,
		paddingHorizontal: 15,
		backgroundColor: COLORS.bgDark,
		borderWidth: 1,
		borderColor: COLORS.bg,
	},
	containerStyle: {
		maxHeight: 230,
		paddingVertical: 5,
		borderRadius: 8,
		backgroundColor: COLORS.bgDark,
	},
	itemTextStyle: {
		fontSize: 12,
		color: COLORS.lightBlue,
	},
	selectedTextStyle: {
		fontSize: 12,
		color: COLORS.bgDark,
	},
});
