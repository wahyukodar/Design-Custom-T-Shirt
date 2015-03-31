-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 30, 2015 at 11:59 PM
-- Server version: 5.5.41-cll-lve
-- PHP Version: 5.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gtpcom_desain`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE IF NOT EXISTS `category` (
  `id_category` int(5) NOT NULL AUTO_INCREMENT,
  `name_category` varchar(50) NOT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `name_category`) VALUES
(1, 'Men'),
(2, 'Women'),
(3, 'Kids');

-- --------------------------------------------------------

--
-- Table structure for table `color_product`
--

CREATE TABLE IF NOT EXISTS `color_product` (
  `id_color_product` int(20) NOT NULL AUTO_INCREMENT,
  `item_color` varchar(50) NOT NULL,
  `color_hexa` varchar(6) NOT NULL,
  `cost` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `id_product` int(20) NOT NULL,
  PRIMARY KEY (`id_color_product`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `color_product`
--

INSERT INTO `color_product` (`id_color_product`, `item_color`, `color_hexa`, `cost`, `title`, `id_product`) VALUES
(1, '04632', 'ccc', '40000', 'Gray', 1),
(2, '04601', '35e744', '40000', 'Green', 1),
(3, '04620', '4534a7', '40000', 'Blue', 1),
(4, '04639', 'a73443', '40000', 'Red', 1),
(5, '04600', 'fff', '40000', 'White', 1),
(6, '06100', 'fff', '45000', 'White', 2),
(7, '06102', 'eee', '45000', 'Gray', 2),
(8, '06103', '45e734', '45000', 'Green', 2),
(9, '06105', '9f2332', '45000', 'Red', 2),
(10, '06114', '23329f', '45000', 'Blue', 2),
(11, '119900', 'fff', '80000', 'White', 3),
(12, '119902', '000', '80000', 'Black', 3),
(13, '119904', 'd4d4d4', '80000', 'Gray', 3),
(14, '119906', '9f2332', '80000', 'Red', 3),
(15, '119918', '67ef11', '80000', 'Lime', 3);

-- --------------------------------------------------------

--
-- Table structure for table `font`
--

CREATE TABLE IF NOT EXISTS `font` (
  `id_font` int(20) NOT NULL AUTO_INCREMENT,
  `name_font` varchar(50) NOT NULL,
  `name_style` varchar(50) NOT NULL,
  PRIMARY KEY (`id_font`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `font`
--

INSERT INTO `font` (`id_font`, `name_font`, `name_style`) VALUES
(1, 'Arial', 'Arial'),
(2, 'Friday Night', 'friday_night_lightsregular'),
(3, 'Verdana', 'Verdana');

-- --------------------------------------------------------

--
-- Table structure for table `gambar`
--

CREATE TABLE IF NOT EXISTS `gambar` (
  `id_gambar` int(20) NOT NULL AUTO_INCREMENT,
  `folder` varchar(50) NOT NULL,
  `name_gambar` varchar(255) NOT NULL,
  `cost` varchar(50) NOT NULL,
  `id_image_category` int(20) NOT NULL,
  PRIMARY KEY (`id_gambar`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `gambar`
--

INSERT INTO `gambar` (`id_gambar`, `folder`, `name_gambar`, `cost`, `id_image_category`) VALUES
(1, 'musics', 'guitar1.png', '15000', 1),
(2, 'musics', 'guitar2.png', '10000', 1),
(3, 'musics', 'guitar3.png', '20000', 1),
(4, 'musics', 'guitar4.png', '22500', 1),
(5, 'musics', 'guitar5.png', '20000', 1),
(6, 'sports', 'basketball.png', '11500', 2),
(7, 'sports', 'nba.png', '11000', 2),
(8, 'sports', 'spalding.png', '13000', 2),
(9, 'panoramas', 'mountain.jpg', '30000', 3);

-- --------------------------------------------------------

--
-- Table structure for table `image_category`
--

CREATE TABLE IF NOT EXISTS `image_category` (
  `id_image_category` int(20) NOT NULL AUTO_INCREMENT,
  `name_image_category` varchar(50) NOT NULL,
  PRIMARY KEY (`id_image_category`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `image_category`
--

INSERT INTO `image_category` (`id_image_category`, `name_image_category`) VALUES
(1, 'Musics'),
(2, 'Sports'),
(3, 'Panoramas');

-- --------------------------------------------------------

--
-- Table structure for table `item_category`
--

CREATE TABLE IF NOT EXISTS `item_category` (
  `id_item_category` int(10) NOT NULL AUTO_INCREMENT,
  `name_item_category` varchar(50) NOT NULL,
  `id_category` int(5) NOT NULL,
  PRIMARY KEY (`id_item_category`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `item_category`
--

INSERT INTO `item_category` (`id_item_category`, `name_item_category`, `id_category`) VALUES
(1, 'T-Shirts', 1),
(2, 'Sweats', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE IF NOT EXISTS `product` (
  `id_product` int(20) NOT NULL AUTO_INCREMENT,
  `item_model` varchar(50) NOT NULL,
  `item_info` text NOT NULL,
  `item_color` varchar(50) NOT NULL,
  `cost` varchar(50) NOT NULL,
  `id_item_category` int(10) NOT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id_product`, `item_model`, `item_info`, `item_color`, `cost`, `id_item_category`) VALUES
(1, 'ShortSleeves', 'Sizes:S-3XL <br/> Colors Available:15 Min <br/> Qty:1 <br/> Price Guide:$$ (out of $$$) <br/>\r\n                    Detail: <li>10 oz. All colors are a poly/cotton blend</li>\r\n                    <li>Comfortable low-pill fleece fabric</li>\r\n                    <li>Spandex-ribbed cuffs and waistband for comfort</li>', '04600', '40000', 1),
(2, 'LongSleeves', '', '06100', '45000', 1),
(3, 'SweatShirts', '', '119900', '80000', 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
