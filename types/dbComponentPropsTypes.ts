import { tasks } from "../db/schema";

export type TaskListProps = {
    tasks: (typeof tasks.$inferSelect)[] | null;
};
