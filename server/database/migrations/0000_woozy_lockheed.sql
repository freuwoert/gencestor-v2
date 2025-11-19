CREATE TABLE `animals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`legacy_id` text,
	`chip_number` text,
	`studbook_number` text,
	`name` text,
	`kennel` text,
	`kennel_name_first` integer DEFAULT false NOT NULL,
	`awards_length_1` text,
	`awards_length_2` text,
	`awards_length_3` text,
	`awards_length_4` text,
	`notes` text,
	`birth_date` text,
	`breed` text,
	`sex` text,
	`size` text,
	`hair_type` text,
	`hair_color` text,
	`pedigree_id` integer,
	`mother_id` integer,
	`father_id` integer,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	FOREIGN KEY (`pedigree_id`) REFERENCES `pedigrees`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`mother_id`) REFERENCES `animals`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`father_id`) REFERENCES `animals`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pedigrees` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text,
	`kennel` text,
	`address` text,
	`created_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `settings_key_unique` ON `settings` (`key`);