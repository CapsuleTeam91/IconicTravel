import { StyleSheet } from 'react-native';
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
import newUser from './reducers/newUser';

// Screens
import LoginScreen from './screens/LoginScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileStepOneScreen from './screens/ProfileStepOneScreen';
import ProfileStepTwoScreen from './screens/ProfileStepTwoScreen';
import ProfileStepThreeScreen from './screens/ProfileStepThreeScreen';
import ProfileStepFourScreen from './screens/ProfileStepFourScreen';

// Utils
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from './utils/styles';

// Store
const reducers = combineReducers({ newUser });
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

					return (
						<Ionicons
							name={iconName}
							// name={isSelected ? `${iconName}` : `${iconName}-outline`}
							size={size}
							color={color}
						/>
					);
				},
				tabBarActiveTintColor: COLORS.pink,
				tabBarInactiveTintColor: COLORS.darkBlue,
				headerShown: false,
			})}>
			<Tab.Screen name="History" component={SearchScreen} />
			<Tab.Screen name="Adventures" component={SearchScreen} />
			<Tab.Screen name="Search" component={SearchScreen} />
			<Tab.Screen name="Messages" component={SearchScreen} />
			<Tab.Screen name="Settings" component={SearchScreen} />
		</Tab.Navigator>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<NavigationContainer>
					<StatusBar style={styles.container} />
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
						<Stack.Screen name="TabNavigator" component={TabNavigator} />
					</Stack.Navigator>
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
	},
});
