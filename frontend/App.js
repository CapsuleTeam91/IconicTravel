//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoginScreen from './screens/LoginScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName = '';

					if (route.name === 'Home') {
						iconName = 'home';
					} else if (route.name === 'Profile') {
						iconName = 'user';
					}

					return <FontAwesome name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: '#2196f3',
				tabBarInactiveTintColor: 'gray',
				headerShown: false,
			})}>
			{/* <Tab.Screen name="Home" component={HomeScreen} />
     <Tab.Screen name="Profile" component={ProfileScreen} /> */}
		</Tab.Navigator>
	);
};

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style={styles.container} />

			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Signin" component={SigninScreen} />
				<Stack.Screen name="Signup" component={SignupScreen} />
				<Stack.Screen name="TabNavigator" component={TabNavigator} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'black',
	},
});
