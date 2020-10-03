export const agentAccountNavigationitems = [
  { name: 'Profile', path: '/agent/account/profile', primary: false },
  // { name: 'Sales Area', path: '/agent/account/sales-area', primary: false },
  { name: 'Billing', path: '/agent/account/billing', primary: false },
  { name: 'Notifications', path: '/agent/account/notifications', primary: false },
];

export const agentNavigationItems = [
  { name: 'New', path: '/agent/listings/new', primary: true },
  { name: 'Pending', path: '/agent/listings/pending', primary: true },
  { name: 'Awarded', path: '/agent/listings/awarded', primary: true },
  { name: 'History', path: '/agent/listings/history', primary: true },
  ...agentAccountNavigationitems,
];
