/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 8.0.34 : Database - angular-news-portal
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`angular-news-portal` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `angular-news-portal`;

/*Table structure for table `_prisma_migrations` */

DROP TABLE IF EXISTS `_prisma_migrations`;

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `_prisma_migrations` */

insert  into `_prisma_migrations`(`id`,`checksum`,`finished_at`,`migration_name`,`logs`,`rolled_back_at`,`started_at`,`applied_steps_count`) values 
('2061a463-c4af-40b0-af64-e3919eac1a60','c85313f21bb7d44f36bc655a1c1a9bf110a75f5576da7197dbd52577ddb80041','2024-01-13 16:16:34.884','20240113161634_dev',NULL,NULL,'2024-01-13 16:16:34.866',1),
('2a8b1e2f-99c0-4aea-bf36-e3ef8215fcaa','e2648a5620d1a317db0252e382d7474bba84ed6a0040774c7f0993c7a6d789c2','2024-01-15 18:36:30.497','20240115183630_dev',NULL,NULL,'2024-01-15 18:36:30.253',1),
('410a70d4-daf2-4f8f-8571-29e85230b81a','33d1d0f4381b6c488e1cc8ccdae82a91fbd231f7626e793c0721002357890d27','2024-01-14 20:04:24.760','20240114200424_dev',NULL,NULL,'2024-01-14 20:04:24.707',1),
('9ab4529e-708b-4da8-8bea-95c0fac6876b','6d484ff8a677e1ea0257c10f3a863dfc84cce698a81268d63753da6da2f54249','2024-01-13 10:33:38.305','20240113103337_news_portal',NULL,NULL,'2024-01-13 10:33:37.947',1),
('b2801df3-5041-4a64-ad24-5f5f76e8efb8','f943302a4da23a071e963638ac927f5b60456bc255da99139c998e00886abed4','2024-01-13 12:36:31.815','20240113123631_dev',NULL,NULL,'2024-01-13 12:36:31.792',1),
('d20eb663-99a5-48f6-95f7-b986745ff767','a859c1efb3e81868ef1fe927d68212b7fb2bc4bcb4d5a4c9058807fa891f5e7d','2024-01-15 19:15:10.420','20240115191510_dev',NULL,NULL,'2024-01-15 19:15:10.312',1),
('db55c210-67c8-4240-859a-e6de3cc920ea','fcc2a1079457080d7e8171c44d65aed3571a6cd60c54c69ff0ab89359e2e6039','2024-01-14 14:08:45.728','20240114140845_dev',NULL,NULL,'2024-01-14 14:08:45.711',1),
('e2ff7b1c-4d5d-448a-88ae-c591e5bd3eb1','94059e4c13f14545c98f107dd86834ec0a6980180364ed7f088b2b37e22df721','2024-01-14 17:16:21.947','20240114171621_dev',NULL,NULL,'2024-01-14 17:16:21.924',1);

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `category` */

insert  into `category`(`id`,`title`,`description`) values 
('2','Politics','This is a politics category description.'),
('3','Sports','This is a sports category description.'),
('4','Cars','This is a cars category description.'),
('6093fae4-e132-443b-b501-4d952c802a2b','Money','everything about money'),
('7b162a66-3ee9-4f25-8110-d5b4f6e01663','Dogs','small dogs'),
('c296d287-318c-4074-993e-8e440fb5ed82','Cats','something about cats');

/*Table structure for table `comment` */

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Comment_postId_fkey` (`postId`),
  KEY `Comment_authorId_fkey` (`authorId`),
  CONSTRAINT `Comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `post` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `comment` */

insert  into `comment`(`id`,`postId`,`createdAt`,`updatedAt`,`content`,`authorId`) values 
('20cf843e-860c-4cc9-a191-059d5215a09a','b1543fd9-1a08-4371-989a-08ac366a0b9f','2024-01-19 17:22:53.243','2024-01-19 17:22:53.243','I love gambling ( im in debt )','85702832-56a1-48af-8eb2-efa8b7c256bc'),
('41f8f059-9735-4ede-ba22-8fb051d53c59','3793939a-99fc-4a14-a402-0e33e0278132','2024-01-15 19:32:19.596','2024-01-15 19:32:19.596','FINI KEKSI','85702832-56a1-48af-8eb2-efa8b7c256bc'),
('88d91b1f-c5cc-4a5f-9ece-6c36bef782ed','3793939a-99fc-4a14-a402-0e33e0278132','2024-01-16 21:07:32.706','2024-01-18 19:18:03.657','awdawd2','85702832-56a1-48af-8eb2-efa8b7c256bc'),
('a1275b17-8726-4eaf-9707-e59d4b4370a6','73b03aee-d6bd-4260-938a-6ad784b5ddba','2024-01-18 19:57:49.322','2024-01-18 19:57:52.840','nice2','adb4d4c3-dc3e-44da-b21c-e142d8e88083'),
('a4ea3852-9db8-46d5-9071-89a3c7f73ba4','8b558fa0-27be-463d-b757-86c819f18d0b','2024-01-18 19:59:13.386','2024-01-18 19:59:13.386','I love this <3','adb4d4c3-dc3e-44da-b21c-e142d8e88083'),
('e9bd2ae3-b3fb-4c80-acb0-a061b4b62404','73b03aee-d6bd-4260-938a-6ad784b5ddba','2024-01-15 19:25:36.345','2024-01-15 19:25:36.345','YEET','85702832-56a1-48af-8eb2-efa8b7c256bc');

/*Table structure for table `post` */

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `authorId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `imageUrl` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Post_categoryId_fkey` (`categoryId`),
  KEY `Post_authorId_fkey` (`authorId`),
  CONSTRAINT `Post_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Post_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `post` */

insert  into `post`(`id`,`title`,`content`,`categoryId`,`authorId`,`createdAt`,`updatedAt`,`imageUrl`) values 
('3793939a-99fc-4a14-a402-0e33e0278132','Cookie baking tomorrow','Cookie baking tomorrowCookie baking tomorrowCookie baking tomorrowCookie baking tomorrowCookie baking tomorrowCookie baking tomorrow','2','85702832-56a1-48af-8eb2-efa8b7c256bc','2024-01-15 19:32:01.061','2024-01-15 19:32:01.061','https://images.unsplash.com/photo-1612884610549-ce221d92514a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTI2ODN8MHwxfHNlYXJjaHwxfHxDb29raWUlMjBiYWtpbmclMjB0b21vcnJvd3xlbnwwfHx8fDE3MDUzNDcxMTl8MA&ixlib=rb-4.0.3&q=80&w=1080'),
('73b03aee-d6bd-4260-938a-6ad784b5ddba','Racing at the old track today','Racing at the old track todayRacing at the old track todayRacing at the old track todayRacing at the old track today','4','85702832-56a1-48af-8eb2-efa8b7c256bc','2024-01-14 20:04:45.055','2024-01-14 20:04:45.055','https://images.unsplash.com/photo-1579618218290-24a26f63a738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTI2ODN8MHwxfHNlYXJjaHwxfHxSYWNpbmclMjBhdCUyMHRoZSUyMG9sZCUyMHRyYWNrJTIwdG9kYXl8ZW58MHx8fHwxNzA1MjYyNTQ5fDA&ixlib=rb-4.0.3&q=80&w=1080'),
('8b558fa0-27be-463d-b757-86c819f18d0b','Dog show at Vancouver','The annual Dog Show in Vancouver is a highly anticipated event that brings together dog enthusiasts, breeders, and pet lovers from across the region. Set against the picturesque backdrop of Vancouver\'s scenic landscapes, this event celebrates the diverse and wonderful world of dogs.\n\nHeld in a vibrant atmosphere, the Vancouver Dog Show showcases a wide array of dog breeds, from the majestic and regal to the charming and playful. Attendees have the opportunity to witness impressive displays of canine agility, obedience, and athleticism as dogs and their handlers navigate intricate courses with finesse.\n\nThe show isn\'t just about competition; it\'s a fantastic opportunity for dog owners to connect, share stories, and learn more about responsible pet care. From informative seminars on dog health and grooming to interactive sessions on training techniques, the event provides a wealth of knowledge for both seasoned dog owners and those considering adding a furry friend to their family.','3','adb4d4c3-dc3e-44da-b21c-e142d8e88083','2024-01-18 19:58:54.984','2024-01-18 19:58:54.984','https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTI2ODN8MHwxfHNlYXJjaHwxfHxEb2clMjBzaG93JTIwYXQlMjBWYW5jb3V2ZXJ8ZW58MHx8fHwxNzA1NjA3OTI2fDA&ixlib=rb-4.0.3&q=80&w=1080'),
('b1543fd9-1a08-4371-989a-08ac366a0b9f','Las Vegas Casino Free Entrance','Las Vegas, renowned as the entertainment capital of the world, is a city that never sleeps. While the dazzling lights, world-class shows, and vibrant nightlife are synonymous with this desert oasis, there\'s exciting news for casino enthusiasts – free entrance to some of the most iconic Las Vegas casinos!\n\nUnleashing the Thrill Without Breaking the Bank\n\nLas Vegas casinos have long been synonymous with glitz, glamour, and a touch of extravagance. Now, with several establishments offering free entrance, both locals and visitors can experience the thrill of the casino floor without spending a dime.','2','85702832-56a1-48af-8eb2-efa8b7c256bc','2024-01-18 21:39:22.800','2024-01-18 21:39:22.800','https://images.unsplash.com/photo-1517232115160-ff93364542dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTI2ODN8MHwxfHNlYXJjaHwxfHxMYXMlMjBWZWdhcyUyMENhc2lubyUyMEZyZWUlMjBFbnRyYW5jZXxlbnwwfHx8fDE3MDU2MTM5NTR8MA&ixlib=rb-4.0.3&q=80&w=1080');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `user` */

insert  into `user`(`id`,`firstName`,`lastName`,`email`,`createdAt`,`updatedAt`,`isAdmin`,`password`) values 
('19c2621d-7cfc-4329-9f3c-fb69f06f96c3','Jimmy','Jones','jimmyjones@gmail.com','2024-01-13 18:56:50.691','2024-01-13 18:56:50.691',0,'$2b$10$my6uaU9GsQVs.lYTeRiS1eZcwT/.N34d8HftEhPtQLQQ5b/efMeem'),
('85702832-56a1-48af-8eb2-efa8b7c256bc','Andrew','James','andrew@gmail.com','2024-01-13 15:52:16.776','2024-01-13 15:52:16.776',1,'$2b$10$rt08FuLqEahjYddSkxxUI.rwrInyJB1FLjBZ0518i7XPixaT1GU6e'),
('adb4d4c3-dc3e-44da-b21c-e142d8e88083','Marko','Markovic','marko@gmail.com','2024-01-18 19:52:34.310','2024-01-18 19:52:34.310',0,'$2b$10$HuMv25yv4WmNKCtCP8EaYOWnc8zLcJHP8PDYi5kxhZ.BF3U6PLb6a'),
('c9af1111-ff1b-4582-9d41-d11234ad7d63','Marko','Markovic','test@gmail.com','2024-01-13 12:38:50.504','2024-01-13 12:38:50.504',0,'$2b$10$0LjtF78qniV7PpH.zBCPieRvfRqDl8dbgsg3/XsEhnbPBcfETxTcu');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
