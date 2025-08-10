--  -----------------------
--  BDD base_mairie
--  -----------------------

DROP DATABASE IF EXISTS base_mairie;
CREATE DATABASE base_mairie CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE base_mairie CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

--  -----------------------
--  CREATION DES TABLES
--  -----------------------

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('citizen', 'admin', 'agent') DEFAULT 'citizen',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration INT NOT NULL COMMENT 'durée en minutes',
    department VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    service_id INT,
    appointment_date DATETIME NOT NULL,
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS time_slots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_id INT,
    appointment_id INT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

--  -----------------------
--  INSERTION DE DONNEES
--  -----------------------

INSERT INTO users (first_name, last_name, email, password, role) VALUES
('Alice', 'Dupont', 'alice.dupont@example.com', 'password123', 'citizen'),
('Bob', 'Martin', 'bob.martin@example.com', 'password123', 'citizen'),
('Charlie', 'Durand', 'charlie.durand@example.com', 'password123', 'citizen'),
('David', 'Lemoine', 'david.lemoine@example.com', 'agent123', 'agent'),
('Eve', 'Rousseau', 'eve.rousseau@example.com', 'agent123', 'agent'),
('Frédéric', 'Pierre', 'frederic.pierre@example.com', 'agent123', 'agent'),
('Gabrielle', 'Garcia', 'gabrielle.garcia@example.com', 'password123', 'citizen'),
('Hélène', 'Thomas', 'helene.thomas@example.com', 'password123', 'citizen'),
('Isabelle', 'Lambert', 'isabelle.lambert@example.com', 'admin123', 'admin'),
('Jean-Pierre', 'Dubois', 'jeanpierre.dubois@example.com', 'admin123', 'admin'),
('Karen', 'Moreau', 'karen.moreau@example.com', 'agent123', 'agent'),
('Laurent', 'Lefebvre', 'laurent.lefebvre@example.com', 'agent123', 'agent'),
('Marie', 'Roux', 'marie.roux@example.com', 'password123', 'citizen'),
('Nicolas', 'Lefèvre', 'nicolas.lefevre@example.com', 'password123', 'citizen');


INSERT INTO services (name, description, duration, department, is_active) VALUES
('État civil - Carte d\'identité', 'Renouvellement ou création de carte d\'identité.', 30, 'État civil', true),
('Urbanisme - Permis de construire', 'Consultation pour la demande de permis de construire.', 60, 'Urbanisme', true),
('Services sociaux - Aides sociales', 'Consultation pour les aides sociales.', 45, 'Services sociaux', true),
('Autres - Demandes générales', 'Prise de rendez-vous pour diverses demandes administratives.', 20, 'Administration générale', true),
('Santé - Consultation pour une déclaration', 'Consultation pour une déclaration de santé.', 60, 'Santé', true),
('Éducation - Inscription dans une école', 'Inscription dans une école.', 45, 'Éducation', true),
('Environnement - Déclaration de pollution', 'Déclaration de pollution.', 30, 'Environnement', true),
('Justice - Consultation pour un procès', 'Consultation pour un procès.', 60, 'Justice', true),
('Travail - Demande d\'emploi', 'Demande d\'emploi.', 30, 'Travail', true),
('Transport - Demande de permis de conduire', 'Demande de permis de conduire.', 45, 'Transport', true),
('Tourisme - Demande de visa', 'Demande de visa pour un voyage international.', 60, 'Tourisme', true),
('Agriculture - Déclaration de propriété agricole', 'Déclaration de propriété agricole.', 30, 'Agriculture', true),
('Immigration - Demande de résidence permanente', 'Demande de résidence permanente.', 45, 'Immigration', true),
('Finances - Déclaration d\'impôts', 'Déclaration d\'impôts.', 60, 'Finances', true);


INSERT INTO appointments (user_id, service_id, appointment_date, status, notes) VALUES
(1, 1, '2025-10-25 10:00:00', 'scheduled', 'Première demande de carte d\'identité.'),
(2, 2, '2025-10-26 14:00:00', 'scheduled', 'Consultation pour un permis de construire.'),
(3, 3, '2025-10-27 09:30:00', 'completed', 'Rendez-vous pour une aide sociale.'),
(7, 4, '2025-11-01 16:00:00', 'cancelled', 'Demande annulée par l\'utilisateur.'),
(2, 5, '2025-11-02 10:00:00', 'scheduled', 'Première demande de déclaration de santé.'),
(1, 6, '2025-11-03 14:30:00', 'scheduled', 'Inscription dans une école.'),
(3, 7, '2025-11-04 11:00:00', 'completed', 'Déclaration de pollution.'),
(8, 8, '2025-11-05 15:30:00', 'scheduled', 'Consultation pour un procès.'),
(13, 9, '2025-11-06 10:30:00', 'scheduled', 'Demande d\'emploi.'),
(7, 10, '2025-11-07 16:30:00', 'scheduled', 'Demande de permis de conduire.'),
(8, 11, '2025-11-08 11:30:00', 'scheduled', 'Demande de visa pour un voyage international.'),
(14, 12, '2025-11-09 15:00:00', 'scheduled', 'Déclaration de propriété agricole.'),
(13, 13, '2025-11-10 10:30:00', 'scheduled', 'Demande de résidence permanente.'),
(14, 14, '2025-11-11 14:00:00', 'scheduled', 'Déclaration d\'impôts.');

INSERT INTO time_slots (service_id, appointment_id, start_time, end_time, is_available) VALUES
(1,  1, '2025-10-25 09:00:00', '2025-10-25 09:30:00', true),
(2,  1, '2025-10-25 10:00:00', '2025-10-25 10:30:00', false),
(3,  2, '2025-10-26 14:00:00', '2025-10-26 15:00:00', true),
(4,  2, '2025-10-27 09:30:00', '2025-10-27 10:15:00', false),
(5,  3, '2025-11-02 16:00:00', '2025-11-02 16:20:00', true),
(6,  3, '2025-11-03 10:00:00', '2025-11-03 10:30:00', false),
(7,  4, '2025-11-04 14:30:00', '2025-11-04 15:15:00', true),
(8,  4, '2025-11-05 11:00:00', '2025-11-05 11:30:00', false),
(9,  5, '2025-11-06 15:30:00', '2025-11-06 16:00:00', true),
(10, 5, '2025-11-07 10:30:00', '2025-11-07 11:00:00', false),
(11, 6, '2025-11-08 16:30:00', '2025-11-08 17:00:00', true),
(12, 6, '2025-11-09 11:30:00', '2025-11-09 12:00:00', false),
(13, 7, '2025-11-10 15:00:00', '2025-11-10 15:30:00', true),
(14, 7, '2025-11-12 10:30:00', '2025-11-12 11:00:00', false);