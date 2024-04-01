import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Home from './pages/Home';
import TreatmentProgress from './pages/TreatmentProgress';
import Treatments from './pages/Treatments';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { default as FontAwesomeIcon } from 'react-native-vector-icons/FontAwesome';
import { default as FeatherIcon } from 'react-native-vector-icons/Feather';
import { default as AntDesignIcon } from 'react-native-vector-icons/AntDesign';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

function MenuScreen() {
	return <View></View>;
}

export default function App() {
	const Drawer = createDrawerNavigator();

	return (
		<NavigationContainer>
			<Drawer.Navigator drawerContent={MenuScreen}>
				<Drawer.Screen
					options={{
						drawerPosition: 'right',
						headerStyle: styles.header,
						headerTitleStyle: { color: '#FFF' },
						header: ({ navigation }) => (
							<View style={styles.header}>
								<Text style={{ color: '#fff', fontSize: 18 }}>BRUXY</Text>
								<Icon.Button
									onPress={() => navigation.openDrawer()}
									iconStyle={{ margin: 0 }}
									name='menu'
									color='#fff'
								/>
							</View>
						),
					}}
					name='drawer'
					component={MainStackNavigator}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
}

const MainStackNavigator = () => {
	const Tab = createBottomTabNavigator();

	return (
		<Tab.Navigator
			initialRouteName='Home'
			screenOptions={{
				tabBarStyle: {
					backgroundColor: '#2176FF',
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10,
				},
				headerShown: false,
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
	);
};

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
