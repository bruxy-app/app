import notifee, {
	AndroidImportance,
	AndroidNotificationSetting,
	EventType,
	TriggerType,
} from '@notifee/react-native';
import { navigationRef } from './RootNavigation';

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
		importance: AndroidImportance.HIGH,
	});

	notifee.onForegroundEvent(async (event) => {
		if (event.type === EventType.PRESS) {
			if (event.detail.pressAction.id === 'question-modal') {
				navigationRef.navigate('question-modal', {
					question_uuid: event.detail.notification.id,
				});
			}
		}
	});

	notifee.onBackgroundEvent(async (event) => {
		if (event.type === EventType.PRESS) {
			if (event.detail.pressAction.id === 'question-modal') {
				console.log('notification press', event.detail.notification.id);
				navigationRef.navigate('question-modal', {
					question_uuid: event.detail.notification.id,
				});

				return new Promise((resolve) => {
					// Close the notification
					resolve(true);
				});
			}
		}
	});
};

export const scheduleNotification = async (data) => {
	console.log('notification', data);
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
				channelId: 'default',
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
