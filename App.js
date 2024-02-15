import { StyleSheet, View } from 'react-native';
import React from 'react';
import Home from './pages/Home';
import TreatmentProgress from './pages/TreatmentProgress';
import Treatments from './pages/Treatments';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { default as FontAwesomeIcon } from 'react-native-vector-icons/FontAwesome';
import { default as FeatherIcon } from 'react-native-vector-icons/Feather';
import { default as AntDesignIcon } from 'react-native-vector-icons/AntDesign';
import Header from './Components/Header';

export default function App() {
	const Tab = createBottomTabNavigator();

	return (
		<NavigationContainer>
			<View style={styles.container}>
				<Tab.Navigator
					initialRouteName='Home'
					screenOptions={{
						tabBarStyle: {
							backgroundColor: '#1b3ce0',
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10,
						},
						header: Header,
					}}
				>
					<Tab.Screen
						name='Home'
						component={Home}
						options={{
							title: '',
							tabBarLabel: '',
							tabBarIcon: ({ focused }) => (
								<FontAwesomeIcon name='home' size={30} color={focused ? '#000' : 'fff'} />
							),
						}}
					/>
					<Tab.Screen
						name='TreatmentProgress'
						component={TreatmentProgress}
						options={{
							tabBarLabel: '',
							tabBarIcon: ({ focused }) => (
								<AntDesignIcon name='linechart' size={30} color={focused ? '#000' : 'fff'} />
							),
						}}
					/>
					<Tab.Screen
						name='Treatments'
						component={Treatments}
						options={{
							tabBarLabel: '',
							tabBarIcon: ({ focused }) => (
								<FeatherIcon name='clipboard' size={30} color={focused ? '#000' : 'fff'} />
							),
						}}
					/>
				</Tab.Navigator>
			</View>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
});
