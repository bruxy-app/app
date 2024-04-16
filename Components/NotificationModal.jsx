import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationModal({ route }) {
	console.log('question uuid', route.params.question_uuid);
	const [notification, setNotification] = useState(null);

	const fetchNotification = async () => {
		const notifications = JSON.parse(await AsyncStorage.getItem('scheduledNotifications'));
		const foundNotification = notifications.find(
			(notification) => notification.uuid === route.params.question_uuid
		);
		console.log('current notification', foundNotification);
		if (foundNotification) {
			setNotification(foundNotification);
		}
	};

	const handleOptionPress = (option) => {
		console.log('option', option);
		// Set the current question answer as the selected option
		const updatedNotification = { ...notification, answer: option };
		setNotification(updatedNotification);
	};

	useEffect(() => {
		fetchNotification();
	}, []);

	if (!notification) {
		return (
			<View style={styles.container}>
				<Text style={styles.loadingText}>Carregando</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.questionText}>{notification.question}</Text>
			<FlatList
				data={notification.options}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.optionCard} onPress={() => handleOptionPress(item)}>
						<Text style={styles.optionText}>{item}</Text>
					</TouchableOpacity>
				)}
				keyExtractor={(item, index) => index.toString()}
				contentContainerStyle={styles.optionsContainer}
			/>
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => console.log('Go to previous question')}
				>
					<Text style={{ color: '#FFF' }}>Voltar</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={() => console.log('Go to next question')}>
					<Text style={{ color: '#FFF' }}>Próxima</Text>
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
