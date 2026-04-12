export const COMPLAINT_CATEGORIES = ['Electrical', 'Network', 'Maintenance', 'Others'];

export const COMPLAINT_PRIORITIES = ['Low', 'Medium', 'High'];

export const COMPLAINT_STATUSES = ['Pending', 'In Progress', 'Resolved'];

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SUBMIT: '/submit',
  MY_COMPLAINTS: '/my-complaints',
  COMPLAINT_DETAIL: '/complaints/:id',
  PROFILE: '/profile',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_COMPLAINTS: '/admin/complaints',
  ADMIN_COMPLAINT_DETAIL: '/admin/complaints/:id',
  ADMIN_ANALYTICS: '/admin/analytics',
  ABOUT: '/about',
  CONTACT: '/contact'
};
