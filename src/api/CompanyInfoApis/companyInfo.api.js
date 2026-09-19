import api from "../axios";

export const getCompanyInfo = () => {
    return api.get("/admin/companyinfo");       
}

export const getCompanyInfoById = (id) => {
    return api.get(`/admin/companyinfo/${id}`);
};      

export const createCompanyInfo = (payload) => {
    return api.post("/admin/companyinfo", payload);
}

export const updateCompanyInfo = (id, payload) => {
    return api.put(`/admin/companyinfo/${id}`, payload);
}

export const deleteCompanyInfo = (id) => {
    return api.delete(`/admin/companyinfo/${id}`);
}