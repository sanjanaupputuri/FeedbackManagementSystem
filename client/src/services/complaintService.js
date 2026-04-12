import api from './api';

export const complaintService = {
  // User endpoints
  submit: async (formData) => {
    const response = await api.post('/complaints', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  getMine: async (params) => {
    const response = await api.get('/complaints/my', { params });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/complaints/stats');
    return response.data;
  },

  getRecent: async (limit = 5) => {
    const response = await api.get('/complaints/recent', { params: { limit } });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/complaints/${id}`);
    return response.data;
  },

  addComment: async (id, comment) => {
    const response = await api.post(`/complaints/${id}/comments`, { comment });
    return response.data;
  },

  getComments: async (id) => {
    const response = await api.get(`/complaints/${id}/comments`);
    return response.data;
  },

  getHistory: async (id) => {
    const response = await api.get(`/complaints/${id}/history`);
    return response.data;
  }
};

export const adminService = {
  getAll: async (params) => {
    const response = await api.get('/admin/complaints', { params });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/admin/complaints/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/admin/complaints/${id}`);
    return response.data;
  }
};
