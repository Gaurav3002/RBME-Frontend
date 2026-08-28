import api from "./axios";


export const getProductTypes = () => {
    return api.get("/admin/product-types");
};


export const getProductTypeById = (id) => {
    return api.get(`/admin/product-types/${id}`);
};


export const createProductType = (payload) => {
    return api.post("/admin/product-types", payload);
};


export const updateProductType = (id, payload) => {
    return api.put(`/admin/product-types/${id}`, payload);
};


export const deleteProductType = (id) => {
    return api.delete(`/admin/product-types/${id}`);
};


export const getProductTypesByCategory = (categoryId) => {
    return api.get(`/admin/product-types/category/${categoryId}`);
};