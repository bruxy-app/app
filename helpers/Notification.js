import notifee, {
	AndroidImportance,
	AndroidNotificationSetting,
	EventType,
	TriggerType,
} from '@notifee/react-native';
import { navigationRef } from './RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

export const setupNotifications = async () => {
	await notifee.requestPermission();
	const settings = await notifee.getNotificationSettings();
	if (!settings.android.alarm == AndroidNotificationSetting.ENABLED) {
		await notifee.openAlarmPermissionSettings();
	}

	await notifee.createChannel({
		id: 'default',
		name: 'default',
		bypassDnd: true,
		sound: 'default',
		importance: AndroidImportance.HIGH,
	});

	notifee.onForegroundEvent(async (event) => {
		if (event.type === EventType.PRESS) {
			if (event.detail.pressAction.id === 'question-modal') {
				navigationRef.current?.navigate('question-modal', {
					notification_uuid: event.detail.notification.id,
				});
			}
		}
	});

	notifee.onBackgroundEvent(async (event) => {
		if (event.type === EventType.PRESS) {
			if (event.detail.pressAction.id === 'question-modal') {
				console.log('notification press', event.detail.notification.id);
				navigationRef.current?.navigate('question-modal', {
					notification_uuid: event.detail.notification.id,
				});

				return new Promise((resolve) => {
					// Close the notification
					resolve(true);
				});
			}
		}
	});
};

export const scheduleNotifications = async (treatmentUuid) => {
	const data = await api.get(`/treatments/${treatmentUuid}/notifications`);
	console.log('data', data);
	if (data.status !== 'in_progress') {
		return;
	}

	const storage = [];
	for (const notification of data.notifications) {
		if (await scheduleNotification(notification)) {
			storage.push(notification);
		}
	}
	await AsyncStorage.setItem('scheduledNotifications', JSON.stringify(storage));
};

export const scheduleNotification = async (data) => {
	console.log('notification', data);
	// todo: possibly remove the past date check
	if (data.response || new Date(data.sent_at).getTime() < new Date().getTime()) {
		return false;
	}

	const notifications = await notifee.getTriggerNotifications();

	if (notifications.find((notification) => notification.notification.id === data.uuid)) {
		console.log('canceling notification');
		await notifee.cancelTriggerNotification(data.uuid);
	}

	console.log('creating notification');
	await notifee.createTriggerNotification(
		{
			title: 'Responda às perguntas do seu tratamento',
			body: data.body,
			id: data.uuid,
			android: {
				ongoing: true,
				channelId: 'default',
				sound: 'default',
				pressAction: {
					id: 'question-modal',
					mainComponent: 'notification-modal',
				},
			},
		},
		{
			type: TriggerType.TIMESTAMP,
			timestamp: new Date(data.sent_at).getTime(),
		}
	);

	return true;
};

export const sendLocalNotificationResponses = async () => {
	let notifications = await AsyncStorage.getItem('answeredNotification');

	if (!notifications) {
		console.log('No local notifications to send');
		return;
	}

	notifications = JSON.parse(notifications);
	if (notifications.length === 0) {
		console.log('No local notifications to send');
		return;
	}

	console.log('Sending local notifications', notifications);

	for (const [index, notification] of notifications.entries()) {
		await api.post(`treatments/${notification.uuid}/respond`, {
			notification,
		});

		console.log('after sending notification', notification);
	}

	await AsyncStorage.setItem('answeredNotification', JSON.stringify([]));

	console.log('Finished sending local notifications');
};
