//////      ADMIN     //////
// User Management
export const userStatus = [
  { value: '1', label: 'Active' },
  { value: '0', label: 'Inactive' },
];

export const statusFiltersConfig = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];
export const userStatusFiltersConfig = [
  { value: '', label: 'All' },
  { value: '0', label: 'Blocked' },
  { value: '1', label: 'Active' },
  { value: '2', label: 'Inactive' },
];

export const userStatusFilters = [
  { value: '', label: 'All' },
  { value: '1', label: 'Active' },
  { value: '0', label: 'Inactive' },
];

export const notificationFilterOptions = [
  { value: '', label: 'All' },
  { value: '0', label: 'Read' },
  { value: '1', label: 'Unread' },
];

// Subscription Management
export const subscriptionStatusFilters = [
  { value: '', label: 'All' },
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
];

export const subscriptionTypeFilters = [
  { value: '', label: 'All' },
  { value: 'Basic', label: 'Basic' },
  { value: 'Premium', label: 'Premium' },
];

export const paymentStatusFilters = [
  { value: '', label: 'All' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Failed', label: 'Failed' },
];

//////      BUSINESS     //////
export const unlockRequestFilterOptions = [
  { value: '', label: 'All' },
  { value: '0', label: 'Approved' },
  { value: '1', label: 'Pending' },
  { value: '2', label: 'Rejected' },
];
