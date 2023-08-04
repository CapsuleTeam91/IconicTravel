import { StyleSheet } from 'react-native';

export const COLORS = {
	bg: '#F8F9FA',
	bgDark: '#1E4F61',
	bgModal: 'rgba(7,59,76,0.8)',
	pink: '#F87575',
	darkBlue: '#073B4C',
	lightBlue: '#95B8D1',
};

export const COLORS_THEME = {
	light: 'light',
	dark: 'dark',
};

export const STYLES_GLOBAL = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.bg,
	},
	title: {
		width: '90%',
		color: COLORS.darkBlue,
		fontSize: 32,
		letterSpacing: 1.2,
		fontWeight: '700',
		textAlign: 'center',
		textTransform: 'uppercase',
	},
	titleLight: {
		color: COLORS.bg,
		marginTop: 40,
		marginBottom: 20,
	},
	subTitle: {
		color: COLORS.darkBlue,
		fontSize: 24,
	},
	subTitleLight: {
		color: COLORS.bg,
		// margin: 20,
	},
	textLight: {
		padding: 15,
		fontSize: 16,
		color: COLORS.bg,
	},
	textDark: {
		padding: 15,
		fontSize: 16,
		color: COLORS.darkBlue,
	},
	error: {
		fontSize: 12,
		color: 'red',
		fontStyle: 'italic',
	},
	btnBottomContainer: {
		width: '90%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
});
