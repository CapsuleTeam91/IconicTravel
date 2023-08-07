import { Dropdown } from 'react-native-element-dropdown';
import { DISTANCES } from '../utils/data';

export const DropdownDistances = () => {
	return (
		<Dropdown
			style={styles.dropdown}
			placeholderStyle={styles.placeholderStyle}
			selectedTextStyle={styles.selectedTextStyle}
			inputSearchStyle={styles.inputSearchStyle}
			iconStyle={styles.iconStyle}
			data={DISTANCES}
			maxHeight={300}
			labelField="label"
			valueField="value"
			placeholder="Distance"
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
					color="black"
				/>
			)}
		/>
	);
};
