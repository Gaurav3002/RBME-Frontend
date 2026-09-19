import api from "./axios";

export const getRoles = () => {
    return api.get("/admin/roles");
};

export const getRoleById = (id) => {
    return api.get(`/admin/roles/${id}`);
};

export const createRole = (payload) => {
    return api.post("/admin/roles", payload);
};

export const updateRole = (id, payload) => {
    return api.put(`/admin/roles/${id}`, payload);
};

export const deleteRole = (id) => {
    return api.delete(`/admin/roles/${id}`);
};

export const assignPermission = (roleId, permissionId) => {
    return api.post(
        `/admin/roles/${roleId}/permissions/${permissionId}`
    );
};

export const removePermission = (roleId, permissionId) => {
    return api.delete(
        `/admin/roles/${roleId}/permissions/${permissionId}`
    );
};
