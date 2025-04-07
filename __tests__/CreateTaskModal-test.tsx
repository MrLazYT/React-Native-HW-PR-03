import { render, fireEvent, screen } from "@testing-library/react-native";
import CreateTaskModal from "../components/modalTabs/CreateTaskModal";

jest.mock("expo-notifications", () => ({
    setNotificationHandler: jest.fn(),
    scheduleNotificationAsync: jest.fn(),
    getExpoPushTokenAsync: jest.fn().mockResolvedValue("mock-token"),
    cancelAllScheduledNotificationsAsync: jest.fn(),
}));

describe("<CreateTaskModal />", () => {
    test("Component renders correctly", () => {
        const mockClose = jest.fn();
        const mockAddTask = jest.fn();
        const { getByText } = render(<CreateTaskModal isVisible={true} onClose={mockClose} onAddTask={mockAddTask} />);

        expect(getByText("Creating Task")).toBeTruthy();
    });

    test("TextInput component renders correctly", () => {
        const mockClose = jest.fn();
        const mockAddTask = jest.fn();
        const { getByPlaceholderText } = render(
            <CreateTaskModal isVisible={true} onClose={mockClose} onAddTask={mockAddTask} />
        );

        expect(getByPlaceholderText("Enter Title")).toBeTruthy();
    });
    // test("Should add new item to the list after button press", async () => {
    //     const mockClose = jest.fn();
    //     const mockAddTask = jest.fn();

    //     render(<CreateTaskModal isVisible={true} onClose={mockClose} onAddTask={mockAddTask} />);
    //     const inputField = screen.getByPlaceholderText("Enter Title");
    //     const createButton = screen.getByText("Create Task");

    //     fireEvent.changeText(inputField, "New Task");

    //     await fireEvent.press(createButton);

    //     expect(mockAddTask).toHaveBeenCalledWith({
    //         id: expect.any(Number),
    //         todo: "New Task",
    //         completed: false,
    //         priority: 0,
    //         notificationId: "",
    //     });
    // });
});
