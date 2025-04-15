import * as Notifications from "expo-notifications";
import CreateTaskModal from "../components/modalTabs/CreateTaskModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

jest.mock("expo-notifications");

const fixedNow = new Date("2025-04-09T12:00:00.000Z");
jest.setSystemTime(fixedNow);

const mockedNotifications = Notifications as jest.Mocked<typeof Notifications>;

describe("Notifications", () => {
    beforeEach(() => {});

    beforeAll(() => {
        jest.useFakeTimers();
        jest.setSystemTime(fixedNow);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it("Notifications working correcly", async () => {
        const onClose = jest.fn();
        const onAddTask = jest.fn();

        render(<CreateTaskModal onClose={onClose} onAddTask={onAddTask} isVisible={true} />);

        const input = screen.getByPlaceholderText("Enter Title");
        fireEvent.changeText(input, "Test Task");

        const btn = screen.getByTestId("notify-btn");

        expect(btn).toBeOnTheScreen();

        let date = fixedNow;

        const triggeredDate = new Date(fixedNow.getTime() + 5000).getTime();
        const expectedMinDate = fixedNow.getTime() + 5000;
        const expectedMaxDate = expectedMinDate + 100;

        fireEvent.press(btn);

        await waitFor(() => {
            expect(mockedNotifications.scheduleNotificationAsync).toHaveBeenCalledTimes(1);
        });

        const callArgs = mockedNotifications.scheduleNotificationAsync.mock.calls[0][0];
        expect(callArgs.content).toEqual({
            title: "You must complete task",
            body: "Test Task",
        });

        const trigger = callArgs.trigger;

        type DateTriggerInput = {
            type: "date";
            date: number | Date;
        };

        if (trigger && (trigger as DateTriggerInput).type === Notifications.SchedulableTriggerInputTypes.DATE) {
            const dateTrigger = trigger as DateTriggerInput;

            expect(dateTrigger.date).toBeGreaterThanOrEqual(expectedMinDate);
            expect(dateTrigger.date).toBeLessThanOrEqual(expectedMaxDate);
        } else {
            throw new Error("Trigger is not defined or not a date trigger");
        }
    });
});
