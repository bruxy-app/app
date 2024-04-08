import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import { navigationRef } from './RootNavigation';

export const setupNotifications = async () => {
	notifee.requestPermission();

	notifee.createChannel({
		id: 'default',
		name: 'default',
		bypassDnd: true,
		importance: AndroidImportance.HIGH,
	});

	notifee.onForegroundEvent(async (event) => {
		if (event.type === EventType.PRESS) {
			if (event.detail.pressAction.id === 'question-modal') {
				navigationRef.navigate('question-modal');
			}
		}
	});

	notifee.onBackgroundEvent(async (event) => {});
};

export const scheduleNotification = async () => {};
