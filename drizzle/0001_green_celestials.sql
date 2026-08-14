CREATE TABLE `courseEnrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseCode` varchar(32) NOT NULL,
	`status` enum('pending','active','refunded') NOT NULL DEFAULT 'pending',
	`stripeCheckoutSessionId` varchar(255),
	`stripePaymentIntentId` varchar(255),
	`enrolledAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courseEnrollments_id` PRIMARY KEY(`id`),
	CONSTRAINT `courseEnrollments_stripeCheckoutSessionId_unique` UNIQUE(`stripeCheckoutSessionId`),
	CONSTRAINT `courseEnrollments_user_course_unique` UNIQUE(`userId`,`courseCode`)
);
--> statement-breakpoint
CREATE TABLE `learnerBadges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`badgeCode` varchar(64) NOT NULL,
	`sourceCourseCode` varchar(32) NOT NULL,
	`awardedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `learnerBadges_id` PRIMARY KEY(`id`),
	CONSTRAINT `learnerBadges_user_badge_unique` UNIQUE(`userId`,`badgeCode`)
);
--> statement-breakpoint
CREATE TABLE `learnerRewards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`xp` int NOT NULL DEFAULT 0,
	`level` int NOT NULL DEFAULT 1,
	`currentStreak` int NOT NULL DEFAULT 0,
	`longestStreak` int NOT NULL DEFAULT 0,
	`lastLearningDay` varchar(10),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learnerRewards_id` PRIMARY KEY(`id`),
	CONSTRAINT `learnerRewards_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `lessonCompletions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseCode` varchar(32) NOT NULL,
	`lessonId` varchar(96) NOT NULL,
	`xpAwarded` int NOT NULL DEFAULT 0,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lessonCompletions_id` PRIMARY KEY(`id`),
	CONSTRAINT `lessonCompletions_user_lesson_unique` UNIQUE(`userId`,`lessonId`)
);
--> statement-breakpoint
ALTER TABLE `courseEnrollments` ADD CONSTRAINT `courseEnrollments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `learnerBadges` ADD CONSTRAINT `learnerBadges_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `learnerRewards` ADD CONSTRAINT `learnerRewards_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `lessonCompletions` ADD CONSTRAINT `lessonCompletions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;