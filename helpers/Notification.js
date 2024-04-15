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
	await notifee.createTriggerNotification(
		{
			title: data.title,
			body: data.body,
			id: data.uuid,
			android: {
				channelId: 'default',
				pressAction: {
					id: 'question-modal',
					title: 'Responder',
				},
			},
		},
		{
			type: TriggerType.TIMESTAMP,
			timestamp: data.timestamp,
		}
	);
};
