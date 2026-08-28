import api from "./axios";

export const getProducts = () => {
    return api.get("/admin/products");
}
export const getProductById = (id) => {
    return api.get(`/admin/products/${id}`);
}
export const createProduct = (formData) => {
    return api.post("/admin/products",formData);
};
export const updateProduct = (id, formData) => {
    return api.put(`/admin/products/${id}`, formData);
};
export const deleteProduct = (id) => {
    return api.delete(`/admin/products/${id}`);
}

export const getProductByCompanyId = (companyId) => {
    return api.get(`/admin/products/company/${companyId}`);
}
export const getProductByCategoryId = (categoryId) => {
    return api.get(`/admin/products/category/${categoryId}`);
}
export const getProductByProductTypeId = (productTypeId) => {
    return api.get(`/admin/products/productType/${productTypeId}`);
}
export const getActiveProducts = () => {
    return api.get("/admin/products/active");
}
export const getFeaturedProducts = () => {
    return api.get("/admin/products/featured");
}