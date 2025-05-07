# 📱 Application Mobile de Gestion d'Événements

Application mobile React Native permettant aux utilisateurs de :

- Voir la liste des événements
- Participer à un événement (sans compte)
- Recevoir un ticket par email après inscription

## ⚙️ Installation

```bash
npm install
npx expo start
```

> Utilise Expo pour faciliter les tests sur Android/iOS

## 📚 Fonctionnalités

### 🎉 Utilisateur

- Parcourir tous les événements disponibles
- Formulaire de participation (nom, prénom, email)
- Reçoit un email avec son ticket

### 🔐 Admin

- Écran de connexion (`/Login`)
- Accès protégé au dashboard (`/AdminEventsList`)
- Authentification via token JWT stocké localement

## 📦 Structure

```
/screens
  Welcome.tsx
  EventDetails.tsx
  ParticipationScreen.js
  Login.tsx
  AdminEventsList.tsx
  ...
/utils
  helpers.ts
...
```

## 🔐 Authentification Admin

- Le token JWT est stocké via `AsyncStorage`
- Redirection automatique si non connecté

## 🔪 Tests

- Utiliser l’écran admin pour se connecter avec :
  - email : `admin@example.com`
  - mot de passe : `admin123`

## ✅ À venir

- Intégration QR Code
