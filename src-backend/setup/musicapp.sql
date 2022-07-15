-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Generation Time: Jul 12, 2022 at 02:11 AM
-- Server version: 10.5.9-MariaDB-1:10.5.9+maria~focal
-- PHP Version: 7.3.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `musicapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `liked_song`
--

CREATE TABLE `liked_song` (
  `user_id` varchar(8) NOT NULL,
  `song_id` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `password_salt`
--

CREATE TABLE `password_salt` (
  `user_id` varchar(8) NOT NULL,
  `salt` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `playlist`
--

CREATE TABLE `playlist` (
  `playlist_id` varchar(25) NOT NULL,
  `created_by` varchar(8) DEFAULT NULL,
  `type` enum('DEFAULT','ALBUM','SINGLE','EP') DEFAULT NULL,
  `title` text DEFAULT NULL,
  `thumbnail` text DEFAULT NULL,
  `published_date` bigint(20) DEFAULT NULL,
  `created_date` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `playlist_content`
--

CREATE TABLE `playlist_content` (
  `playlist_id` varchar(25) NOT NULL,
  `song_id` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `role_permission`
--

CREATE TABLE `role_permission` (
  `role_id` varchar(255) NOT NULL,
  `permission` varchar(255) NOT NULL,
  `status` enum('YES','NO','NEVER') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role_permission`
--

INSERT INTO `role_permission` (`role_id`, `permission`, `status`) VALUES
('admin', 'acp.access', 'YES'),
('admin', 'song.resolve', 'YES'),
('admin', 'song.upload', 'YES'),
('artist', 'song.upload', 'YES');

-- --------------------------------------------------------

--
-- Table structure for table `session_key`
--

CREATE TABLE `session_key` (
  `key` varchar(64) NOT NULL,
  `user_id` varchar(8) DEFAULT NULL,
  `time` bigint(20) DEFAULT NULL,
  `device` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `song`
--

CREATE TABLE `song` (
  `song_id` varchar(16) NOT NULL,
  `uploaded_by` varchar(8) DEFAULT NULL,
  `performer` text DEFAULT NULL,
  `title` text DEFAULT NULL,
  `play_count` bigint(20) DEFAULT NULL,
  `liked_count` bigint(20) DEFAULT NULL,
  `status` enum('APPROVED','DENIED','PROCESSING','IN_QUEUE') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` varchar(8) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `gender` tinyint(10) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `liked_song`
--
ALTER TABLE `liked_song`
  ADD PRIMARY KEY (`user_id`,`song_id`),
  ADD KEY `song_id` (`song_id`);

--
-- Indexes for table `password_salt`
--
ALTER TABLE `password_salt`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`playlist_id`),
  ADD KEY `playlist_created_by_index` (`created_by`);

--
-- Indexes for table `playlist_content`
--
ALTER TABLE `playlist_content`
  ADD PRIMARY KEY (`playlist_id`,`song_id`),
  ADD KEY `song_id` (`song_id`);

--
-- Indexes for table `role_permission`
--
ALTER TABLE `role_permission`
  ADD PRIMARY KEY (`role_id`,`permission`);

--
-- Indexes for table `session_key`
--
ALTER TABLE `session_key`
  ADD PRIMARY KEY (`key`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`song_id`),
  ADD KEY `uploaded_by` (`uploaded_by`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `liked_song`
--
ALTER TABLE `liked_song`
  ADD CONSTRAINT `liked_song_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `liked_song_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `song` (`song_id`);

--
-- Constraints for table `password_salt`
--
ALTER TABLE `password_salt`
  ADD CONSTRAINT `password_salt_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `playlist_content`
--
ALTER TABLE `playlist_content`
  ADD CONSTRAINT `playlist_content_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`playlist_id`),
  ADD CONSTRAINT `playlist_content_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `song` (`song_id`);

--
-- Constraints for table `session_key`
--
ALTER TABLE `session_key`
  ADD CONSTRAINT `session_key_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `song_ibfk_1` FOREIGN KEY (`uploaded_by`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
