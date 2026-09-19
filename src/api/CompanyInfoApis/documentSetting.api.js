import api from "../axios";

export const getDocumentSettings = () => {
    return api.get("/admin/document-settings");
};

export const getDocumentSettingsById = (id) => {
    return api.get(`/admin/document-settings/${id}`);
};

export const createDocumentSettings = (payload) => {
    return api.post("/admin/document-settings", payload);
};

export const updateDocumentSettings = (id, payload) => {
    return api.put(`/admin/document-settings/${id}`, payload);
};

export const deleteDocumentSettings = (id) => {
    return api.delete(`/admin/document-settings/${id}`);
};