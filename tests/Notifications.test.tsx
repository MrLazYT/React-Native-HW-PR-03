import * as Notifications from "expo-notifications";
import CreateTaskModal from "../components/modalTabs/CreateTaskModal";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";

jest.mock("expo-notifications");

const newDate = new Date(2025, 3, 9);

jest.useFakeTimers().setSystemTime(newDate);

const mockedNotifications = Notifications as jest.Mocked<typeof Notifications>;

describe("Notifications", () => {
    beforeEach(() => {});

    it("Notifications working correcly", async () => {
        const onClose = jest.fn();
        const onAddTask = jest.fn();

        render(<CreateTaskModal onClose={onClose} onAddTask={onAddTask} isVisible={true} />);

        const input = screen.getByPlaceholderText("Enter Title");
        fireEvent.changeText(input, "Test Task");

        const btn = screen.getByTestId("notify-btn");

        expect(btn).toBeOnTheScreen();

        let date = newDate;

        const triggeredDate = date.setSeconds(date.getSeconds() + 5);
        fireEvent.press(btn);

        await waitFor(() => {
            expect(mockedNotifications.scheduleNotificationAsync).toHaveBeenCalledTimes(1);
        });

        await waitFor(() => {
            expect(mockedNotifications.scheduleNotificationAsync).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: {
                        body: "Test Task",
                        title: "You must complete task",
                    },
                    trigger: {
                        type: Notifications.SchedulableTriggerInputTypes.DATE,
                        date: expect.any(Number),
                    },
                })
            );
        });
    });

    it("Notifications work correcly", async () => {
        const onClose = jest.fn();
        const onAddTask = jest.fn();

        render(<CreateTaskModal onClose={onClose} onAddTask={onAddTask} isVisible={true} />);

        const input = screen.getByPlaceholderText("Enter Title");
        fireEvent.changeText(input, "Test Task");

        const btn = screen.getByTestId("notify-btn");

        expect(btn).toBeOnTheScreen();

        fireEvent.press(btn);

        await waitFor(() => {
            expect(mockedNotifications.scheduleNotificationAsync).toHaveBeenCalledTimes(1);
        });

        let date = newDate;

        const triggeredDate = date.setSeconds(date.getSeconds() + 5);

        await waitFor(() => {
            expect(mockedNotifications.scheduleNotificationAsync).toHaveBeenCalledWith(
                expect.objectContaining({
                    content: {
                        body: "Test Task",
                        title: "You must complete task",
                    },
                    trigger: {
                        type: Notifications.SchedulableTriggerInputTypes.DATE,
                        date: triggeredDate,
                    },
                })
            );
        });
    });
});
