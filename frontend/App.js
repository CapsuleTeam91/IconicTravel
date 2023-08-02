import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Redux + Persist
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import user from './reducers/user';

// Screens
import LoginScreen from './screens/LoginScreen';
import AboutScreen from './screens/AboutScreen';
import LegalScreen from './screens/LegalScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import SearchScreen from './screens/SearchScreen';
import SafetyScreen from './screens/SafetyScreen';
import HistoryScreen from './screens/HistoryScreen';
import TraductionScreen from './screens/Traduction';
import SettingsScreen from './screens/SettingsScreen';
import MessagesScreen from './screens/MessagesScreen';
import AdventuresScreen from './screens/AdventuresScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileStepOneScreen from './screens/ProfileStepOneScreen';
import ProfileStepTwoScreen from './screens/ProfileStepTwoScreen';
import ProfileStepFourScreen from './screens/ProfileStepFourScreen';
import ProfileStepThreeScreen from './screens/ProfileStepThreeScreen';

// Utils
import { COLORS } from './utils/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Store
const reducers = combineReducers({ user });
const persistConfig = { key: 'iconic', storage: AsyncStorage };
const store = configureStore({
	reducer: persistReducer(persistConfig, reducers),
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

// Navigation
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName = '';

					switch (route.name) {
						case 'History':
							iconName = 'earth';
							break;
						case 'Adventures':
							iconName = 'airplane';
							break;
						case 'Search':
							iconName = 'search';
							break;
						case 'Messages':
							iconName = 'chatbox-ellipses';
							break;
						case 'Settings':
							iconName = 'person-circle';
							break;
						default:
							break;
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: COLORS.pink,
				tabBarInactiveTintColor: COLORS.darkBlue,
				headerShown: false,
			})}>
			<Tab.Screen name="History" component={HistoryScreen} />
			<Tab.Screen name="Adventures" component={AdventuresScreen} />
			<Tab.Screen name="Search" component={SearchScreen} />
			<Tab.Screen name="Messages" component={MessagesScreen} />
			<Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<NavigationContainer>
					<StatusBar barStyle={styles.statusBar} />
					<View style={{ flex: 1, paddingTop: 40 }}>

						<Stack.Navigator screenOptions={{ headerShown: false }}>
							<Stack.Screen name="Login" component={LoginScreen} />
							<Stack.Screen name="Signin" component={SigninScreen} />
							<Stack.Screen name="Signup" component={SignupScreen} />
							<Stack.Screen
								name="ProfileStepOne"
								component={ProfileStepOneScreen}
							/>
							<Stack.Screen
								name="ProfileStepTwo"
								component={ProfileStepTwoScreen}
							/>
							<Stack.Screen
								name="ProfileStepThree"
								component={ProfileStepThreeScreen}
							/>
							<Stack.Screen
								name="ProfileStepFour"
								component={ProfileStepFourScreen}
							/>
							<Stack.Screen name="About" component={AboutScreen} />
							<Stack.Screen name="Legal" component={LegalScreen} />
							<Stack.Screen
								name="Notifications"
								component={NotificationsScreen}
							/>
							<Stack.Screen name="Traduction" component={TraductionScreen} />
							<Stack.Screen name="Safety" component={SafetyScreen} />
							<Stack.Screen name="UserProfile" component={UserProfileScreen} />
							<Stack.Screen name="TabNavigator" component={TabNavigator} />
						</Stack.Navigator>
					</View>
				</NavigationContainer>
			</PersistGate>
		</Provider >
	);
}

const styles = StyleSheet.create({
	statusBar: {
		backgroundColor: 'black'
	},
});
