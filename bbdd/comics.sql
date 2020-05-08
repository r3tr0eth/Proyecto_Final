-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-05-2020 a las 12:44:12
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `comics`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comics`
--

CREATE TABLE `comics` (
  `id` int(11) NOT NULL,
  `nombre` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `titulo` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `num` int(11) DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  `imagen` varchar(254) COLLATE utf8_unicode_ci DEFAULT NULL,
  `num_likes` int(11) NOT NULL DEFAULT 0,
  `genero_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `comics`
--

INSERT INTO `comics` (`id`, `nombre`, `titulo`, `num`, `fecha_publicacion`, `imagen`, `num_likes`, `genero_id`) VALUES
(3, 'Asterix y Obelix', 'Asterix el galo', 1, '1959-10-29', 'https://detodoexpres.com/56111-medium_default/asterix-el-galo.jpg', 100, 2),
(4, 'Asterix y Obelix', 'La oz de horo', 2, '1960-08-11', 'https://www.asterix.com/wp-content/uploads/2017/06/alb02es.png', 30, 2),
(7, 'Las aventuras de Tintin', 'El cetro de Ottokar', 1, '1938-08-04', 'https://images-na.ssl-images-amazon.com/images/I/91mJAM4oipL.jpg', 0, 2),
(8, 'Capitan America ', 'Civil War', 1, '2016-06-18', 'https://comics.panini.es/store/media/catalog/product/cache/82/image/9df78eab33525d08d6e5fb8d27136e95/s/m/smain003_0.jpg', 250, 8),
(9, 'Watchmen', 'Doomsday Clock', 5, '2019-12-18', 'https://images-na.ssl-images-amazon.com/images/I/91jgR8T41gL.jpg', 100, 5),
(10, 'V de Vendetta', 'V de Vendetta', 3, '1980-02-13', 'https://images-na.ssl-images-amazon.com/images/I/51Otob2cPZL._SX325_BO1,204,203,200_.jpg', 55, 5),
(11, 'Spiderman', 'The amazing Spiderman', 55, '1963-03-01', 'https://vercomics.com/wp-content/uploads/2016/07/Amazing_Spider-Man_-1.jpg', 550, 8),
(12, 'Bakemonogatari', 'Monogatari', 2, '2006-11-01', 'https://cdn.normacomics.com/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/b/a/bakemonogatari.jpg', 30, 7),
(13, 'Banana Fish', 'Banana Fish', 19, '1985-04-13', 'https://1.bp.blogspot.com/-wEMvIdOchU0/WwcA16ZWIWI/AAAAAAAAFms/3bLGzLNlRTwaaCDa48EgejkgcFsi4yhdgCLcBGAs/s1600/banana-fish-anime-poster-2.jpg', 5, 1),
(14, 'CONTRA NATURA ', 'El renacer', 3, '2020-01-23', 'https://cdn.normacomics.com/media/catalog/product/cache/1/image/588x473/9df78eab33525d08d6e5fb8d27136e95/c/o/contra_natura_3.jpg', 62, 6),
(15, 'En la oscuridad', 'En la oscuridad', 1, '2019-04-06', 'https://www.planetadelibros.com/usuaris/libros/fotos/282/m_libros/portada_en-la-oscuridad_antonio-pampliega_201812201206.jpg', 350, 2),
(16, 'Pequeñas Brujas', 'El misterio del hechicero', 1, '2020-03-12', 'https://static.fnac-static.com/multimedia/Images/ES/NR/5f/d5/56/5690719/1540-1.jpg', 240, 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comics`
--
ALTER TABLE `comics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_genero_id` (`genero_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comics`
--
ALTER TABLE `comics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comics`
--
ALTER TABLE `comics`
  ADD CONSTRAINT `comics_ibfk_1` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
