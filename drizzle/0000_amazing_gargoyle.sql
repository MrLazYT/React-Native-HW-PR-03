CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`todo` text NOT NULL,
	`completed` integer NOT NULL,
	`priority` integer NOT NULL
);
