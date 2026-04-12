export const validators = {
  required: (value) => {
    return value?.trim() ? null : 'This field is required';
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Invalid email address';
  },

  minLength: (min) => (value) => {
    return value?.length >= min ? null : `Minimum ${min} characters required`;
  },

  maxLength: (max) => (value) => {
    return value?.length <= max ? null : `Maximum ${max} characters allowed`;
  },

  password: (value) => {
    if (!value || value.length < 4) {
      return 'Password must be at least 4 characters';
    }
    return null;
  },

  passwordMatch: (original) => (value) => {
    return value === original ? null : 'Passwords do not match';
  }
};

export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]];
    
    for (const rule of fieldRules) {
      const error = rule(values[field]);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });
  
  return errors;
};
