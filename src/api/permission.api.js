import api from "./axios";

export const getPermissions = () => {
    return api.get("/admin/permissions");
};

export const getPermissionById = (id) => {
    return api.get(`/admin/permissions/${id}`);
};      

export const createPermission = (payload) => {
    return api.post("/admin/permissions", payload); 
};

export const updatePermission = (id, payload) => {
    return api.put(`/admin/permissions/${id}`, payload);
};

export const deletePermission = (id) => {
    return api.delete(`/admin/permissions/${id}`);
};

