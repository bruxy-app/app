import { View, StyleSheet, Text, FlatList, TouchableOpacity, BackHandler } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../helpers/api';
import { useNetInfo } from '@react-native-community/netinfo';

export default function NotificationModal({ route }) {
	const [notificationIndex, setNotificationIndex] = useState(0);
	const [notification, setNotification] = useState(null);
	const [loading, setLoading] = useState(true);
	const { isConnected } = useNetInfo();

	const fetchNotification = async () => {
		setLoading(true); // Set loading state to true before fetching data
		try {
			const notifications = JSON.parse(await AsyncStorage.getItem('scheduledNotifications'));
			const foundNotification = notifications.find(
				(notification) => notification.uuid === route.params.notification_uuid
			);
			console.log('current notification', foundNotification);
			if (foundNotification) {
				setNotification(foundNotification);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false); // Set loading state to false after fetching data
		}
	};

	const handleOptionPress = async (option) => {
		console.log('option', option);
		// Set the current question answer as the selected option
		const updatedNotification = { ...notification };
		updatedNotification.questions[notificationIndex].response = option;
		setNotification(updatedNotification);
		// Save the updated notification
		// const notifications = JSON.parse(await AsyncStorage.getItem('scheduledNotifications'));
		// const index = notifications.findIndex(
		// 	(notification) => notification.uuid === updatedNotification.uuid
		// );
		// notifications[index] = updatedNotification;
		// await AsyncStorage.setItem('scheduledNotifications', JSON.stringify(notifications));
		goToNextQuestion();
	};

	const goToPreviousQuestion = () => {
		if (notificationIndex > 0) {
			setNotificationIndex(notificationIndex - 1);
		}
	};

	const goToNextQuestion = async () => {
		if (
			notificationIndex < notification.questions.length - 1 &&
			notification.questions[notificationIndex].response
		) {
			setNotificationIndex(notificationIndex + 1);
		} else {
			try {
				setLoading(true);
				// update all local notifications with the new responses
				const localNotifications = JSON.parse(await AsyncStorage.getItem('scheduledNotifications'));
				const index = localNotifications.findIndex((n) => n.uuid === notification.uuid);
				localNotifications[index] = notification;

				// save the updated notifications
				await AsyncStorage.setItem('scheduledNotifications', JSON.stringify(localNotifications));

				// check if the device is connected to the internet, if so, send the responses to the server
				console.log('is connected', isConnected);
				if (isConnected) {
					await api.post(`treatments/${notification.uuid}/respond`, {
						notification,
					});

					// remove the notification from local storage
					const notifications = JSON.parse(await AsyncStorage.getItem('scheduledNotifications'));
					const index = notifications.findIndex((n) => n.uuid === notification.uuid);
					notifications.splice(index, 1);
					await AsyncStorage.setItem('scheduledNotifications', JSON.stringify(notifications));
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
				BackHandler.exitApp();
			}
		}
	};

	useEffect(() => {
		fetchNotification();
	}, []);

	if (loading) {
		return (
			<View style={styles.container}>
				<Text style={styles.loadingText}>Carregando</Text>
			</View>
		);
	}

	if (!notification) {
		return (
			<View style={styles.container}>
				<Text style={styles.loadingText}>No notification found</Text>
			</View>
		);
	}

	const currentQuestion = notification.questions[notificationIndex]; // Get the current question

	return (
		<View style={styles.container}>
			<Text style={styles.questionText}>{currentQuestion.question}</Text>
			<FlatList
				data={currentQuestion.options}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={[
							styles.optionCard,
							notification.questions[notificationIndex].response === item && {
								backgroundColor: '#2176FF',
							},
						]}
						onPress={() => handleOptionPress(item)}
					>
						<Text style={styles.optionText}>{item}</Text>
					</TouchableOpacity>
				)}
				keyExtractor={(item, index) => index.toString()}
				contentContainerStyle={styles.optionsContainer}
			/>
			<View style={styles.header}>
				<TouchableOpacity
					disabled={notificationIndex === 0}
					style={styles.button}
					onPress={goToPreviousQuestion}
				>
					<Text style={{ color: '#FFF' }}>Voltar</Text>
				</TouchableOpacity>
				<TouchableOpacity
					disabled={!notification.questions[notificationIndex].response}
					style={{
						...styles.button,
						backgroundColor:
							notificationIndex === notification.questions.length - 1 ? '#4ee014' : '#2176FF',
					}}
					onPress={goToNextQuestion}
				>
					<Text style={{ color: '#FFF' }}>
						{notificationIndex === notification.questions.length - 1 ? 'Enviar' : 'Próxima'}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	loadingText: {
		fontSize: 18,
		textAlign: 'center',
	},
	questionText: {
		marginBottom: 30,
		fontSize: 18,
		textAlign: 'center',
	},
	optionCard: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	},
	optionText: {
		fontSize: 16,
	},
	optionsContainer: {
		paddingBottom: 10,
	},
	header: {
		padding: 10,
		flexDirection: 'row',
		flexWrap: 'nowrap',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	button: {
		backgroundColor: '#2176FF',
		color: '#fff',
		width: 150,
		height: 33,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 100,
		marginTop: 10,
	},
});
