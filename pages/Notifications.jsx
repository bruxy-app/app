import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import notifee from '@notifee/react-native';

export default function TreatmentProgress() {
	const [pendingNotifications, setPendingNotifications] = useState([]);

	useEffect(() => {
		const getPendingNotifications = async () => {
			const notifications = await notifee.getTriggerNotifications();
			console.log('notifications', notifications);
			const pendingNotifications = notifications.filter(
				(notification) => notification.trigger.timestamp > Date.now()
			);

			setPendingNotifications(pendingNotifications);
		};

		getPendingNotifications();
	}, []);

	const formatTimestamp = (timestamp) => {
		const date = new Date(timestamp);

		const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
		const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

		return `${date.getDate()}/${month}/${date.getFullYear()} ${date.getHours()}:${minutes}`;
	};

	const onPressNotification = async (notificationId) => {
		console.log(notificationId);
		// await notifee.cancelTriggerNotification(notificationId);
		// setPendingNotifications(pendingNotifications.filter((notification) => notification.id !== notificationId));
	};

	if (pendingNotifications.length === 0) {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.infoCard}>
					<Text style={{ textAlign: 'center', marginBottom: 10, fontSize: 18 }}>
						Nenhuma notificação pendente
					</Text>
				</View>
			</ScrollView>
		);
	}

	return (
		<ScrollView style={styles.container}>
			{pendingNotifications.map((notification) => (
				<View key={notification.trigger.timestamp} style={styles.infoCard}>
					<Text>{formatTimestamp(notification.trigger.timestamp)}</Text>
					<TouchableOpacity
						style={styles.infoButton}
						onPress={() => {
							onPressNotification(notification.id);
						}}
					>
						<Text style={{ color: '#fff' }}>Responder</Text>
					</TouchableOpacity>
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	cardLabel: {
		marginBottom: 10,
		fontSize: 20,
	},
	infoCard: {
		padding: 10,
		marginBottom: 10,
		borderRadius: 8,
		backgroundColor: '#E8EAEE',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	infoButton: {
		borderRadius: 100,
		marginTop: 10,
		backgroundColor: '#2176FF',
		color: '#fff',
		width: 150,
		height: 33,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
