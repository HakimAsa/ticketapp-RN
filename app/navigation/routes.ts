const routes = {
  // use value in lowercase for translations match
  HOME: 'home',
  LANGUAGE: 'language',
  LOGIN: 'login',
  PROFILE: 'profile',
  REGISTER: 'register',
  SETTINGS: 'settings',
  TICKETCONFIRMATION: 'Confirmation de Ticket',
  WELCOME: 'welcome',
} as const

export default routes

export type RouteNames = (typeof routes)[keyof typeof routes]
