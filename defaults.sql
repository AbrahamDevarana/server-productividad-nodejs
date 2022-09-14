-- EMPRESA
INSERT INTO `corporativos` ( `proposito`, `mision`, `vision`, `logotipo`, `isotipo`, `politica_responsabilidad`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(    
    'Creamos espacios extraordinarios que evocan la alegría y el placer del buen vivir.', 
    'Inspiramos al mundo creando espacios únicos con amor y pasión, cuidando nuestro entorno, la rentabilidad y el bienestar de nuestros clientes', 
    'Seremos el punto de referencia en la creación de desarrollos inmobiliarios extraordinarios en las zonas estratégicas de las grandes ciudades de México; destacando el diseño, calidad y servicio.', 
    'Buscamos crear un entorno de paz y armonía, es por ello la selección del nombre de nuestra empresa que significa <<JARDÍN CELESTIAL>> o <<EDÉN>> en el antiguo idioma sánscrito.',
    'El isotipo que nos identifica es un ave que representa la fusión de tres especies, conjuntando la cabeza de un gorrión, cola de golondrina y alas de colibrí. Simboliza la diversidad entre nuestros clientes, colaboradores, y el entorno.',
    'En DEVARANA hemos asumido el compromiso de implementar un modelo de Gestión de la Calidad, basado en la norma ISO 9001-2015, que nos proporcione un marco de referencia integral para el establecimiento de objetivos específicos de calidad y con la finalidad de, a través de la mejora continua, conseguir la satisfacción total de nuestros colaboradores, clientes y socios de negocio, convirtiéndonos en un referente en el sector de desarrollo inmobiliario, por los estándares de calidad que empleamos en el servicio que ofrecemos y los productos que desarrollamos.', 
    date(now()),
    date(now()), 
    NULL
);

-- VALORES

INSERT INTO `valores` (`id`, `nombre`, `descripcion`, `imagen`, `corporativo_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES 
(NULL, 'LO EXTRAORDINARIO ES PRIMERO', 'La atención en los detalles, nuestro servicio legendario y esfuerzo por la satisfacción total, son parte de nuestra esencia.', 'imagen', '1', date(now()), date(now()), NULL),
(NULL, 'SOMOS APASIONADOS', 'Buscamos nuestra esencia para dedicarnos a lo que amamos y hacer nuestro trabajo siempre con pasión. ¡Nos levantamos cada día con entusiasmo para enfrentar los retos que encontramos en nuestro camino!', 'imagen', '1', date(now()), date(now()), NULL),
(NULL, 'LA EXCELENCIA ESTÁ EN NUESTRO ADN', 'Buscamos la excelencia en todo lo que hacemos y damos todos los días lo mejor de nosotros mismos para vivir plenamente y sentirnos felices.', 'imagen', '1', date(now()), date(now()), NULL),
(NULL, 'INSPIRAMOS CON AMOR', 'El amor verdadero es preeminente en esta vida y nos motiva a hacer el bien en todo lo que emprendemos. Con nuestras acciones tratamos de hacer de este mundo un lugar mejor.', 'imagen', '1', date(now()), date(now()), NULL),
(NULL, 'ESPÍRITU TRIUNFADOR', '¡Somos optimistas, nos enfocamos en lo positivo y ante cualquier situación nos acompaña nuestro espíritu triunfador!', 'imagen', '1', date(now()), date(now()), NULL),
(NULL, 'SOMOS INCLUYENTES', 'Vamos más allá de la tolerancia y hacemos siempre un esfuerzo por incluir a todos. El respeto a la diversidad nos hace una empresa incluyente.', 'imagen', '1', date(now()), date(now()), NULL),
(NULL, 'LA INNOVACIÓN NOS DISTINGUE', '¡Creemos firmemente en la constante innovación! Nos Ilusionan los retos y buscamos siempre estar a la vanguardia.', 'imagen', '1', date(now()), date(now()), NULL);

-- Responsabilidades

INSERT INTO `dev-responsabilidades` (`id`, `nombre`, `descripcion`, `imagen`, `corporativo_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES 
(NULL, 'Medio Ambiente', 'Vestibulum sed euismod turpis. Nunc ac venenatis elit, ut fermentum turpis. Etiam et pulvinar nisl.', 'img', '1', date(now()), date(now()), NULL),
(NULL, 'Calidad', 'Vestibulum sed euismod turpis. Nunc ac venenatis elit, ut fermentum turpis. Etiam et pulvinar nisl.', 'img', '1', date(now()), date(now()), NULL),
(NULL, 'Bienestar', 'Vestibulum sed euismod turpis. Nunc ac venenatis elit, ut fermentum turpis. Etiam et pulvinar nisl.', 'img', '1', date(now()), date(now()), NULL),
(NULL, 'Seguridad', 'Vestibulum sed euismod turpis. Nunc ac venenatis elit, ut fermentum turpis. Etiam et pulvinar nisl.', 'img', '1', date(now()), date(now()), NULL);


-- Competencias
INSERT INTO `competencias` (`id`, `nombre`, `descripcion`, `imagen`, `corporativo_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(NULL, 'Busco la Excelencia', 'Vestibulum sed euismod turpis. Nunc ac venenatis elit, ut fermentum turpis. Etiam et pulvinar nisl.', 'img', '1', date(now()), date(now()), NULL),
(NULL, 'Tengo Inteligencia Emocional', 'Vestibulum sed euismod turpis. Nunc ac venenatis elit, ut fermentum turpis. Etiam et pulvinar nisl.', 'img', '1', date(now()), date(now()), NULL),
(NULL, 'Estoy Orientado al Servicio', 'Vestibulum sed euismod turpis. Nunc ac venenatis elit, ut fermentum turpis. Etiam et pulvinar nisl.', 'img', '1', date(now()), date(now()), NULL),
(NULL, 'Soy Proactivo', 'Vestibulum sed euismod turpis. Nunc ac venenatis elit, ut fermentum turpis. Etiam et pulvinar nisl.', 'img', '1', date(now()), date(now()), NULL),
(NULL, 'Comunico Asertivamente', 'Vestibulum sed euismod turpis. Nunc ac venenatis elit, ut fermentum turpis. Etiam et pulvinar nisl.', 'img', '1', date(now()), date(now()), NULL),
(NULL, 'Soy Organizado y Planifico', 'Vestibulum sed euismod turpis. Nunc ac venenatis elit, ut fermentum turpis. Etiam et pulvinar nisl.', 'img', '1', date(now()), date(now()), NULL);


INSERT INTO `areas` (`id`, `nombre`, `descripcion`, `slug`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Finanzas', 'Finanzas', NULL, '2022-06-16 21:51:14', '2022-06-16 21:51:14', NULL),
(2, 'Staff', 'Área de Staff', NULL, '2022-06-17 14:26:23', '2022-06-17 14:26:23', NULL);

INSERT INTO `departamentos` (`id`, `nombre`, `descripcion`, `lider_id`, `slug`, `area_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Titulación', 'Test3', 0, 'titulacion', 1, '2022-06-22 16:39:18', '2022-06-22 17:00:27', NULL),
(2, 'Innovación y Calidad', 'Test Especial', 0, 'innovacion-y-calidad', 2, '2022-06-27 14:35:18', '2022-06-27 14:35:18', NULL);


INSERT INTO `puestos` (`id`, `nombre`, `descripcion`, `slug`, `estatus_id`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Desarrollador Web', 'Test', 'desarrollador-web', 1, '2022-06-22 16:16:13', '2022-06-22 16:16:13', NULL),
(2, 'Trainee1', 'Noobe1', 'trainee', 1, '2022-06-22 16:38:06', '2022-06-22 17:05:06', NULL),
(3, 'Gerente de Innovación y Calidad', 'Test Especial', 'gerente-de-innovacion-y-calidad', 1, '2022-06-27 14:34:23', '2022-06-27 14:34:23', NULL);


INSERT INTO `users` (`id`, `name`, `lastName`, `secondLastName`, `email`, `short_name`, `password`, `active`, `birth_date`, `admission_date`, `phone`, `slug`, `rol_id`, `position_id`, `department_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Abraham', 'Alvarado', 'Guevara', 'abrahamalvarado@devarana.mx', 'AAG', '123', 1,  NOW(),  NOW(), '123456798', 'abraham_alvarado_abcde', 1, 1, 2, NOW(), NOW());

ALTER TABLE `bd_productividad`.`users` CHANGE `town_id` `town_id` int NULL COMMENT '';