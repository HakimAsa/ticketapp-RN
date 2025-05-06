const routes = {
  // use value in lowercase for translations match
  EVENTADMINLIST: "Liste des événements d'administration",
  EVENTEDIT: "Modifier l'événements",
  HOME: 'home',
  LANGUAGE: 'language',
  LOGIN: 'login',
  PARTICIPANTSLIST: 'Liste des Participants',
  PROFILE: 'profile',
  REGISTER: 'register',
  SETTINGS: 'settings',
  TICKETCONFIRMATION: 'Confirmation de Ticket',

  WELCOME: 'welcome',
} as const

export default routes

export type RouteNames = (typeof routes)[keyof typeof routes]
