type SettingTypeComponentProps = {
    tag: string;
    title: string;
};

type Task = {
    id: number;
    todo: string;
    completed: boolean;
    priority: number;
    notificationId: string;
};

type CustomButtonProps = {
    title: string;
    onPress?: () => void;
};

type CreateButtonProps = {
    onPress?: () => void;
};

type MigrationErrorProps = {
    error: Error;
};

type FormElementProps = {
    control: any;
    name?: string;
    placeholder?: string;
};
