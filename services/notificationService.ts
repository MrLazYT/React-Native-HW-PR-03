import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const notificationService = {
    async remind(task: Task) {
        let date = new Date();
        const triggeredDate = date.setSeconds(date.getSeconds() + 5);

        return await Notifications.scheduleNotificationAsync({
            content: {
                title: `You must complete task`,
                body: task.todo,
            },
            trigger: {
                type: SchedulableTriggerInputTypes.DATE,
                date: triggeredDate,
            },
        });
    },

    async cancel(id: string) {
        return await Notifications.cancelScheduledNotificationAsync(id);
    },

    async cancelAll() {
        return await Notifications.cancelAllScheduledNotificationsAsync();
    },
};

export { notificationService };
