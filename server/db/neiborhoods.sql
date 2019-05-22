CREATE TABLE `neighborhoods` (
  `id` int(11) NOT NULL,
  `name` varchar(96) NOT NULL,
  `size` int(11) NOT NULL,
  `number_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `neighborhoods` (`id`, `name`, `size`, `number_id`) VALUES
(1, 'Център', 90, 1),
(2, 'Старият град', 120, 2),
(3, 'Каменица 1', 100, 3);

CREATE TABLE `landmarks` (
  `id` int(11) NOT NULL,
  `name` varchar(96) NOT NULL,
  `neighborhood_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `landmarks` (`id`, `name`,`neighborhood_id`) VALUES
(1, 'Джумая', 2),
(2, 'Античен театър', 1),
(3, 'Небе тепе', 3);

CREATE TABLE `numbers` (
  `id` int(11) NOT NULL,
  `number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `numbers` (`id`, `number`) VALUES
(1, 26),
(2, 2),
(3, 1);

ALTER TABLE `neighborhoods`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `landmarks`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `numbers`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `neighborhoods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `landmarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `numbers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=360;