import React, { useEffect } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import Home from './pages/Home';
import TreatmentProgress from './pages/TreatmentProgress';
import Treatments from './pages/Treatments';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { default as FontAwesomeIcon } from 'react-native-vector-icons/FontAwesome';
import { default as FeatherIcon } from 'react-native-vector-icons/Feather';
import { default as AntDesignIcon } from 'react-native-vector-icons/AntDesign';
import Header from './Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationModal from './Components/NotificationModal';
import { setupNotifications, navigationRef } from './helpers';

AppRegistry.registerComponent('notification-modal', NotificationModal);

const setAuthUser = async () => {
	const tratmentUuid = await AsyncStorage.getItem('tratmentUuid');

	if (tratmentUuid) {
		AsyncStorage.setItem('tratmentUuid', tratmentUuid);
		//TODO: update scheduled_notifications and set local answered notifications
	} else {
		AsyncStorage.removeItem('tratmentUuid');
	}
};

function BottomTabs() {
	const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator
			initialRouteName='Home'
			screenOptions={({ route }) => ({
				tabBarStyle: {
					backgroundColor: '#2176FF',
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10,
				},
				tabBarIcon: ({ focused }) => {
					if (route.name === 'Home') {
						return <FontAwesomeIcon name='home' size={30} color={focused ? '#FFF' : '#000'} />;
					}
					if (route.name === 'TreatmentProgress') {
						return <AntDesignIcon name='linechart' size={30} color={focused ? '#FFF' : '#000'} />;
					}
					if (route.name === 'Treatments') {
						return <FeatherIcon name='clipboard' size={30} color={focused ? '#FFF' : '#000'} />;
					}
				},
			})}
		>
			<Tab.Screen
				name='Home'
				component={Home}
				options={{
					title: '',
					tabBarLabel: '',
				}}
			/>
			<Tab.Screen
				name='TreatmentProgress'
				component={TreatmentProgress}
				options={{
					tabBarLabel: '',
				}}
			/>
			<Tab.Screen
				name='Treatments'
				component={Treatments}
				options={{
					tabBarLabel: '',
				}}
			/>
		</Tab.Navigator>
	);
}

export default function App() {
	useEffect(() => {
		setupNotifications();

		setAuthUser();
	});

	const Stack = createStackNavigator();

	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator
				screenOptions={{
					header: Header,
				}}
			>
				<Stack.Screen name='Home' component={BottomTabs} />
				<Stack.Screen name='question-modal' component={NotificationModal} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		padding: 10,
		backgroundColor: '#2176FF',
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});
