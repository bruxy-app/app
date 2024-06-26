import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
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
import {
	setupNotifications,
	navigationRef,
	scheduleNotifications,
	sendLocalNotificationResponses,
} from './helpers';
import notifee from '@notifee/react-native';
import { StatusBar } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

AppRegistry.registerComponent('notification-modal', NotificationModal);

function BottomTabs({ updatingNotifications }) {
	const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator
			initialRouteName='Home'
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: '#2176FF',
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10,
				},
				tabBarIcon: ({ focused }) => {
					if (route.name === 'Home') {
						return <FontAwesomeIcon name='home' size={30} color={focused ? '#FFF' : '#000'} />;
					}
					if (route.name === 'Notifications') {
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
				initialParams={{ updatingNotifications }}
				component={Home}
				options={{
					title: '',
					headerShown: false,
					tabBarLabel: '',
					unmountOnBlur: true,
				}}
			/>
			{/* <Tab.Screen
				name='Notifications'
				component={Notifications}
				options={{
					title: '',
					tabBarLabel: '',
				}}
			/> */}
			<Tab.Screen
				name='Treatments'
				component={Treatments}
				options={{
					title: '',
					tabBarLabel: '',
					headerShown: false,
					unmountOnBlur: true,
				}}
			/>
		</Tab.Navigator>
	);
}

export default function App() {
	const [updatingNotifications, setUpdatingNotifications] = useState(true);
	const { isConnected } = useNetInfo();

	useEffect(() => {
		setupNotifications();

		const fetchData = async () => {
			const treatmentUuid = await AsyncStorage.getItem('treatmentUuid');

			if (treatmentUuid) {
				AsyncStorage.setItem('treatmentUuid', treatmentUuid);
				//TODO: update scheduled_notifications and set local answered notifications
			} else {
				AsyncStorage.removeItem('treatmentUuid');
			}

			return treatmentUuid;
		};

		const fetchDataAndScheduleNotifications = async () => {
			const treatmentUuid = await fetchData();
			if (treatmentUuid) {
				try {
					setUpdatingNotifications(true);
					console.log('isConnected', isConnected);
					if (isConnected) {
						console.log('sending local notifications');
						await sendLocalNotificationResponses();
						console.log('scheduling notifications');
						await scheduleNotifications(treatmentUuid);
					}
				} catch (error) {
					console.error(error);
				} finally {
					console.log('finished updating');
					setUpdatingNotifications(false);
				}
			}
		};

		const bootstrap = async () => {
			const initialNotification = await notifee.getInitialNotification();
			if (initialNotification) {
				console.log('initial notification', initialNotification);
				navigationRef.current?.navigate('question-modal', {
					notification_uuid: initialNotification.notification.id,
				});
			} else {
				fetchDataAndScheduleNotifications();
			}

			setUpdatingNotifications(false);
		};

		bootstrap();
	}, [isConnected]);

	const Stack = createStackNavigator();

	return (
		<NavigationContainer ref={navigationRef}>
			<StatusBar backgroundColor='#000' barStyle='light-content' />
			<Stack.Navigator
				screenOptions={{
					header: Header,
				}}
				initialRouteName='Main'
			>
				<Stack.Screen name='Main'>
					{(props) => (
						<BottomTabs
							{...props}
							key={updatingNotifications}
							updatingNotifications={updatingNotifications}
						/>
					)}
				</Stack.Screen>
				<Stack.Screen name='question-modal' component={NotificationModal} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
