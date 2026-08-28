import api from "./axios";

export const getSpecifications = () => {
    return api.get("/admin/product-specifications");
};

export const getSpecificationById = (id) => {
    return api.get(`/admin/product-specifications/${id}`);
};

export const createSpecification = (payload) => {
    return api.post("/admin/product-specifications", payload);
};

export const updateSpecification = (id, payload) => {
    return api.put(`/admin/product-specifications/${id}`, payload);
};

export const deleteSpecification = (id) => {
    return api.delete(`/admin/product-specifications/${id}`);
};

export const getSpecificationsByProduct = (productId) => {
    return api.get(`/admin/product-specifications/product/${productId}`);
};