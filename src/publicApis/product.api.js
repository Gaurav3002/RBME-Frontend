import api from "../api/axios";


export const getPublicProducts = () => {
    return api.get("/products");
};



export const getPublicProductById = (id) => {
    return api.get(`/products/${id}`);
};


export const getPublicProductsByCompany = (companyId) => {
    return api.get(
        `/products/company/${companyId}`
    );
};

export const getPublicProductsByCategory = (categoryId) => {
    return api.get(
        `/products/category/${categoryId}`
    );
};



export const getPublicProductsByProductType = (typeId) => {
    return api.get(
        `/products/type/${typeId}`
    );
};


export const getPublicFeaturedProducts = () => {
    return api.get(
        "/products/featured"
    );
};