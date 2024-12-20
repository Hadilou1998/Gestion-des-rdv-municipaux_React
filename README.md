# Cahier des charges : Application de gestion des rendez-vous municipaux

## 1. Présentation du projet 

### 1.1 Contexte
Application web permettant aux citoyens de prendre rendez-vous en ligne pour différentes démarches administratives auprès des services municipaux.

### 1.2 Objectifs
- Simplifier la prise de rendez-vous pour les citoyens
- Optimiser la gestion du temps des agents municipaux
- Réduire les temps d'attente
- Digitaliser le processus de gestion des rendez-vous

## 2. Spécifications fonctionnelles

### 2.1 Interface utilisateur citoyens
- Création de compte utilisateur (inscription/connexion)
- Consultation des créneaux disponibles
- Prise de rendez-vous
- Modification/annulation de rendez-vous
- Historique des rendez-vous
- Notifications par email

### 2.2 Interface administration (agents municipaux)
- Gestion des créneaux disponibles
- Consultation du planning
- Gestion des rendez-vous
- Statistiques d'utilisation
- Gestion des services proposés

### 2.3 Types de rendez-vous gérés
- État civil (carte d'identité, passeport)
- Urbanisme
- Services sociaux
- Autres services municipaux

## 3. Spécifications techniques

### 3.1 Architecture technique
- Frontend : React.js
- Backend : Node.js avec Express
- Base de données : MySQL 8.0
- API REST
- Authentication : JWT

### 3.2 Structure de la base de données MySQL

#### Table `users`
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('citizen', 'admin', 'agent') DEFAULT 'citizen',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);
```

#### Table `services`
```sql
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    duration INT NOT NULL COMMENT 'durée en minutes',
    department VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_department (department)
);
```

#### Table `appointments`
```sql
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    appointment_date DATETIME NOT NULL,
    status ENUM('scheduled', 'completed', 'cancelled') DEFAULT 'scheduled',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT,
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_user_service (user_id, service_id)
);
```

#### Table `time_slots`
```sql
CREATE TABLE time_slots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
    INDEX idx_availability (service_id, start_time, is_available)
);
```

### 3.3 Configuration Sequelize

```javascript
// config/database.js
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: '+01:00'
  },
  // Configurations pour staging et production...
}
```

### 3.4 Modèles Sequelize

```javascript
// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('citizen', 'admin', 'agent'),
      defaultValue: 'citizen'
    }
  }, {
    timestamps: true,
    underscored: true
  });
  return User;
};
```

### 3.5 Points d'API

#### Authentification
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout

#### Rendez-vous
- GET /api/appointments
- POST /api/appointments
- GET /api/appointments/:id
- PUT /api/appointments/:id
- DELETE /api/appointments/:id

#### Services
- GET /api/services
- POST /api/services
- GET /api/services/:id
- PUT /api/services/:id
- DELETE /api/services/:id

#### Créneaux
- GET /api/slots
- POST /api/slots
- GET /api/slots/:id
- PUT /api/slots/:id
- DELETE /api/slots/:id

## 4. Optimisations MySQL spécifiques

### 4.1 Indexation
- Index composites pour les requêtes fréquentes
- Index couvrants pour les lectures intensives
- Utilisation d'EXPLAIN pour l'optimisation des requêtes

### 4.2 Partitionnement
```sql
ALTER TABLE appointments PARTITION BY RANGE (TO_DAYS(appointment_date)) (
    PARTITION p_old VALUES LESS THAN (TO_DAYS(CURRENT_DATE - INTERVAL 6 MONTH)),
    PARTITION p_current VALUES LESS THAN (TO_DAYS(CURRENT_DATE)),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

### 4.3 Procédures stockées
```sql
DELIMITER //
CREATE PROCEDURE sp_check_slot_availability(
    IN p_service_id INT,
    IN p_date DATE
)
BEGIN
    SELECT ts.*
    FROM time_slots ts
    WHERE ts.service_id = p_service_id
    AND DATE(ts.start_time) = p_date
    AND ts.is_available = true
    ORDER BY ts.start_time;
END //
DELIMITER ;
```

## 5. Sécurité

### 5.1 Sécurité MySQL
- Utilisation de comptes utilisateurs avec privilèges minimaux
- Échappement des entrées utilisateur
- Protection contre les injections SQL via Sequelize
- Chiffrement des données sensibles
- Auditing des modifications importantes

### 5.2 Sauvegardes
```sql
-- Configuration des sauvegardes
SET GLOBAL event_scheduler = ON;

CREATE EVENT backup_daily
ON SCHEDULE EVERY 1 DAY
DO
BEGIN
    -- Commande de sauvegarde
END;
```

## 6. Tests
- Tests unitaires avec Jest
- Tests d'intégration
- Tests E2E avec Cypress
- Tests de charge avec k6

## 7. Déploiement
- Conteneurisation avec Docker
- CI/CD avec GitHub Actions
- Environnements de développement, staging et production
- Monitoring et logging

## 8. Documentation
- Documentation API avec Swagger
- Documentation technique
- Guide d'utilisation
- Documentation de déploiement

## 9. Maintenance
- Sauvegarde quotidienne des données
- Monitoring des performances
- Gestion des mises à jour
- Support technique

## 10. Contraintes techniques
- Compatibilité navigateurs : Chrome, Firefox, Safari, Edge
- Responsive design
- Accessibilité WCAG 2.1
- RGPD compliant
- Temps de réponse < 3s