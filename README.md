# MyContacts

**MyContacts** est une application web permettant aux utilisateurs de gérer leurs contacts personnels de manière simple et rapide.

- **Frontend :** React + Vite  
- **Backend :** Node.js + Express  
- **Base de données :** MongoDB

---

## ✨ Fonctionnalités principales

- 🔐 Authentification (inscription / connexion)  
- 👥 Chaque utilisateur possède **sa propre liste de contacts**
- 📋 Gestion des contacts :
  - Lister les contacts
  - Ajouter un contact
  - Modifier un contact
  - Supprimer un contact

---

## 📂 Structure du projet

```
MyContacts/
│
├── client/                  # Frontend React + Vite
└── server/                  # Backend Node/Express
```

---

## ⚙️ Prérequis

- Node.js v22.12+  
- npm (fourni avec Node.js)  
- MongoDB (local ou MongoDB Atlas)

---

## 🚀 Installation & démarrage

### 1. Cloner le dépôt
```bash
git clone https://github.com/rboudia/MyContacts.git
cd MyContacts
```

### 2. Backend
```bash
cd server
npm install
```

Créer un fichier `.env` dans `server/config/` :
```env
MONGO_URI=
PORT=
JWT_SECRET=
CORS_ORIGIN= // URL du front
```

Lancer le backend :
```bash
npm start
```

Le backend sera disponible sur : http://localhost:3000 (remplacer 3000 par la valeur de PORT si différente)

### 3. Frontend
```bash
cd ../client
npm install
```

Créer un fichier `.env` dans `client/` :
```env
VITE_API_URL=http://localhost:3000 (assurez-vous que ça correspond au PORT du backend)
```

Lancer le frontend :
```bash
npm run dev
```

Le frontend sera disponible sur : `http://localhost:5173`

> ⚠️ Assure-toi que le backend est lancé avant le frontend afin d'éviter des erreurs d’API.

---

## 🧰 Scripts disponibles

### Frontend (`client`)
| Script | Description |
|--------|-------------|
| `npm run dev` | Démarre le serveur de développement |
| `npm run build` | Construit le projet pour la production |

### Backend (`server`)
| Script | Description |
|--------|-------------|
| `npm start` | Démarre le serveur (nodemon / configuration) |
| `npm test` | Lance les tests (Jest) |

---

## 🔗 Endpoints de l'API

### 🧾 Auth
| Méthode | Route | Corps (JSON) | Description |
|--------:|-------|--------------|-------------|
| POST | `/auth/register` | `{ firstName, email, password }` | Crée un nouvel utilisateur |
| POST | `/auth/login` | `{ email, password }` | Authentifie et retourne un token JWT |

### 👤 Utilisateurs
| Méthode | Route | Sécurité | Description |
|--------:|-------|----------|-------------|
| GET | `/users` | JWT requis | Retourne la liste de tous les utilisateurs |

### 📇 Contacts (JWT requis)
| Méthode | Route | Corps (JSON) | Description |
|--------:|-------|--------------|-------------|
| GET | `/contacts` | — | Récupère tous les contacts de l’utilisateur connecté |
| POST | `/contacts` | `{ firstName, lastName, phone }` | Crée un nouveau contact |
| PATCH | `/contacts/{id}` | `{ ...champs }` | Modifie un contact existant |
| DELETE | `/contacts/{id}` | — | Supprime un contact existant |

---

## 📝 Documentation API (Swagger)

La documentation complète de l’API est accessible via **Swagger** : https://mycontacts-ehbu.onrender.com/api-docs


Cette interface interactive permet de :  
- Explorer tous les endpoints disponibles  
- Tester les requêtes directement depuis le navigateur  
- Consulter les schémas des données et les paramètres requis  

---


## ☁️ Déploiement

- URL de déploiement du back : https://mycontacts-ehbu.onrender.com
- URL de déploiement du front : https://mycontacts-front-e1un.onrender.com

---

## 🔑 Identifiants de test

Ces identifiants peuvent être utilisés pour tester l’application sur le **site déployé** :  

| Champ          | Valeur                 |
|---------------|------------------------|
| **Email**      | test@example.com       |
| **Mot de passe** | password123          |

