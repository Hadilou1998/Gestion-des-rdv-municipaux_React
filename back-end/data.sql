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

INSERT INTO users (first_name, last_name, email, password, role) VALUES
('Alice', 'Dupont', 'alice.dupont@example.com', 'password123', 'citizen'),
('Bob', 'Martin', 'bob.martin@example.com', 'password123', 'citizen'),
('Charlie', 'Durand', 'charlie.durand@example.com', 'admin123', 'admin'),
('David', 'Lemoine', 'david.lemoine@example.com', 'agent123', 'agent');

INSERT INTO services (name, description, duration, department, is_active) VALUES
('État civil - Carte d\'identité', 'Renouvellement ou création de carte d\'identité.', 30, 'État civil', true),
('Urbanisme - Permis de construire', 'Consultation pour la demande de permis de construire.', 60, 'Urbanisme', true),
('Services sociaux - Aides sociales', 'Consultation pour les aides sociales.', 45, 'Services sociaux', true),
('Autres - Demandes générales', 'Prise de rendez-vous pour diverses demandes administratives.', 20, 'Administration générale', true);

INSERT INTO appointments (user_id, service_id, appointment_date, status, notes) VALUES
(1, 1, '2025-10-25 10:00:00', 'scheduled', 'Première demande de carte d\'identité.'),
(2, 2, '2025-10-26 14:00:00', 'scheduled', 'Consultation pour un permis de construire.'),
(3, 3, '2025-10-27 09:30:00', 'completed', 'Rendez-vous pour une aide sociale.'),
(1, 4, '2025-11-01 16:00:00', 'cancelled', 'Demande annulée par l\'utilisateur.');

INSERT INTO time_slots (service_id, start_time, end_time, is_available) VALUES
(1, '2025-10-25 09:00:00', '2025-10-25 09:30:00', true),
(1, '2025-10-25 10:00:00', '2025-10-25 10:30:00', false),
(2, '2025-10-26 14:00:00', '2025-10-26 15:00:00', false),
(3, '2025-10-27 09:30:00', '2025-10-27 10:15:00', false),
(4, '2025-11-01 16:00:00', '2025-11-01 16:20:00', false); 