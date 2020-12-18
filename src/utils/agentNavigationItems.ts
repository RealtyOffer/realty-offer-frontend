export const agentAccountNavigationitems = [
  { name: 'Profile', path: '/agent/account/profile', primary: false, icon: 'user' },
  { name: 'Billing', path: '/agent/account/billing', primary: false, icon: 'credit-card' },
  { name: 'Notifications', path: '/agent/account/notifications', primary: false, icon: 'bell-o' },
];

export const agentNavigationItems = [
  { name: 'New', path: '/agent/listings/new', primary: true, icon: undefined },
  { name: 'Pending', path: '/agent/listings/pending', primary: true, icon: undefined },
  { name: 'Awarded', path: '/agent/listings/awarded', primary: true, icon: undefined },
  { name: 'History', path: '/agent/listings/history', primary: true, icon: undefined },
  ...agentAccountNavigationitems,
];
