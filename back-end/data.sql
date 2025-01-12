--  -----------------------
--  BDD base_mairie
--  -----------------------

DROP DATABASE IF EXISTS base_mairie;
CREATE DATABASE base_mairie;

USE base_mairie;

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
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

--  -----------------------
--  INSERTION DE DONNEES
--  -----------------------

INSERT INTO users VALUES
(NULL, 'Alice', 'Dupont', 'alice.dupont@example.com', 'password123', 'citizen'),
(NULL, 'Bob', 'Martin', 'bob.martin@example.com', 'password123', 'citizen'),
(NULL, 'Charlie', 'Durand', 'charlie.durand@example.com', 'admin123', 'admin'),
(NULL, 'David', 'Lemoine', 'david.lemoine@example.com', 'agent123', 'agent'),
(NULL, 'Eve', 'Rousseau', 'eve.rousseau@example.com', 'agent123', 'agent'),
(NULL, 'Frédéric', 'Pierre', 'frederic.pierre@example.com', 'admin123', 'admin'),
(NULL, 'Gabrielle', 'Garcia', 'gabrielle.garcia@example.com', 'password123', 'citizen'),
(NULL, 'Hélène', 'Thomas', 'helene.thomas@example.com', 'password123', 'citizen'),
(NULL, 'Isabelle', 'Lambert', 'isabelle.lambert@example.com', 'admin123', 'admin'),
(NULL, 'Jean-Pierre', 'Dubois', 'jeanpierre.dubois@example.com', 'agent123', 'agent'),
(NULL, 'Karen', 'Moreau', 'karen.moreau@example.com', 'agent123', 'agent'),
(NULL, 'Laurent', 'Lefebvre', 'laurent.lefebvre@example.com', 'admin123', 'admin'),
(NULL, 'Marie', 'Roux', 'marie.roux@example.com', 'password123', 'citizen'),
(NULL, 'Nicolas', 'Lefèvre', 'nicolas.lefevre@example.com', 'agent123', 'agent');


INSERT INTO services VALUES
(NULL, 'État civil - Carte d\'identité', 'Renouvellement ou création de carte d\'identité.', 30, 'État civil', true),
(NULL, 'Urbanisme - Permis de construire', 'Consultation pour la demande de permis de construire.', 60, 'Urbanisme', true),
(NULL, 'Services sociaux - Aides sociales', 'Consultation pour les aides sociales.', 45, 'Services sociaux', true),
(NULL, 'Autres - Demandes générales', 'Prise de rendez-vous pour diverses demandes administratives.', 20, 'Administration générale', true),
(NULL, 'Santé - Consultation pour une déclaration', 'Consultation pour une déclaration de santé.', 60, 'Santé', true),
(NULL, 'Éducation - Inscription dans une école', 'Inscription dans une école.', 45, 'Éducation', true),
(NULL, 'Environnement - Déclaration de pollution', 'Déclaration de pollution.', 30, 'Environnement', true),
(NULL, 'Justice - Consultation pour un procès', 'Consultation pour un procès.', 60, 'Justice', true),
(NULL, 'Travail - Demande d\'emploi', 'Demande d\'emploi.', 30, 'Travail', true),
(NULL, 'Transport - Demande de permis de conduire', 'Demande de permis de conduire.', 45, 'Transport', true),
(NULL, 'Tourisme - Demande de visa', 'Demande de visa pour un voyage international.', 60, 'Tourisme', true),
(NULL, 'Agriculture - Déclaration de propriété agricole', 'Déclaration de propriété agricole.', 30, 'Agriculture', true),
(NULL, 'Immigration - Demande de résidence permanente', 'Demande de résidence permanente.', 45, 'Immigration', true),
(NULL, 'Finances - Déclaration d\'impôts', 'Déclaration d\'impôts.', 60, 'Finances', true);


INSERT INTO appointments (user_id, service_id, appointment_date, status, notes) VALUES
(NULL, 1, 1, '2025-10-25 10:00:00', 'scheduled', 'Première demande de carte d\'identité.'),
(NULL, 2, 2, '2025-10-26 14:00:00', 'scheduled', 'Consultation pour un permis de construire.'),
(NULL, 3, 3, '2025-10-27 09:30:00', 'completed', 'Rendez-vous pour une aide sociale.'),
(NULL, 1, 4, '2025-11-01 16:00:00', 'cancelled', 'Demande annulée par l\'utilisateur.'),
(NULL, 2, 5, '2025-11-02 10:00:00', 'scheduled', 'Première demande de déclaration de santé.'),
(NULL, 3, 6, '2025-11-03 14:30:00', 'scheduled', 'Inscription dans une école.'),
(NULL, 1, 7, '2025-11-04 11:00:00', 'completed', 'Déclaration de pollution.'),
(NULL, 2, 8, '2025-11-05 15:30:00', 'scheduled', 'Consultation pour un procès.'),
(NULL, 3, 9, '2025-11-06 10:30:00', 'scheduled', 'Demande d\'emploi.'),
(NULL, 1, 10, '2025-11-07 16:30:00', 'scheduled', 'Demande de permis de conduire.'),
(NULL, 2, 11, '2025-11-08 11:30:00', 'scheduled', 'Demande de visa pour un voyage international.'),
(NULL, 3, 12, '2025-11-09 15:00:00', 'scheduled', 'Déclaration de propriété agricole.'),
(NULL, 1, 13, '2025-11-10 10:30:00', 'scheduled', 'Demande de résidence permanente.'),
(NULL, 2, 14, '2025-11-11 14:00:00', 'scheduled', 'Déclaration d\'impôts.');

INSERT INTO time_slots VALUES
(NULL, 1, '2025-10-25 09:00:00', '2025-10-25 09:30:00', true),
(NULL, 1, '2025-10-25 10:00:00', '2025-10-25 10:30:00', false),
(NULL, 2, '2025-10-26 14:00:00', '2025-10-26 15:00:00', false),
(NULL, 3, '2025-10-27 09:30:00', '2025-10-27 10:15:00', false),
(NULL, 4, '2025-11-01 16:00:00', '2025-11-01 16:20:00', false),
(NULL, 5, '2025-11-02 10:00:00', '2025-11-02 10:30:00', true),
(NULL, 6, '2025-11-03 14:30:00', '2025-11-03 15:15:00', false),
(NULL, 7, '2025-11-04 11:00:00', '2025-11-04 11:30:00', false),
(NULL, 8, '2025-11-05 15:30:00', '2025-11-05 16:00:00', false),
(NULL, 9, '2025-11-06 10:30:00', '2025-11-06 11:00:00', false),
(NULL, 10, '2025-11-07 16:30:00', '2025-11-07 17:00:00', false),
(NULL, 11, '2025-11-08 11:30:00', '2025-11-08 12:00:00', false),
(NULL, 12, '2025-11-09 15:00:00', '2025-11-09 15:30:00', false),
(NULL, 13, '2025-11-10 10:30:00', '2025-11-10 11:00:00', false),
(NULL, 14, '2025-11-11 14:00:00', '2025-11-11 14:30:00', false);