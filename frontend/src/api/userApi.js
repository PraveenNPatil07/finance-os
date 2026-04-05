import api from './axios';

/**
 * User management API calls.
 */
export const userApi = {
  getAll: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/users', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  deactivate: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/users/${id}/hard`);
    return response.data;
  },
};

export default userApi;
