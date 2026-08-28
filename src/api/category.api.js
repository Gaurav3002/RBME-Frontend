import api from "./axios";

export const getCategories = () => {
    return api.get("/admin/categories");
};

export const getCategoriesByCompany = (companyId) => {
    return api.get(`/admin/categories/company/${companyId}`);
};

export const createCategory = (payload) => {
    return api.post("/admin/categories", payload);
};

export const updateCategory = (id, payload) => {
    return api.put(`/admin/categories/${id}`, payload);
};

export const deleteCategory = (id) => {
    return api.delete(`/admin/categories/${id}`);
};

export const updateCategoryStatus = (id, active) => {
    return api.patch(`/admin/categories/${id}/status?active=${active}`);
};