import api from "./axios";

export const getUsers = () => {
    return api.get("/admin/users");
};

export const getUserById = (id) => {    
    return api.get(`/admin/users/${id}`);
};

export const createUser = (payload) => {
    return api.post("/admin/users", payload);
};

export const updateUser = (id, payload) => {
    return api.put(`/admin/users/${id}`, payload);
};

export const deleteUser = (id) => {
    return api.delete(`/admin/users/${id}`);
};