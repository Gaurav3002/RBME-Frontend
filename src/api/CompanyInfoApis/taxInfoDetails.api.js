import api from "../axios";

export const getTaxInfo = () => {
    return api.get("/admin/taxinfoDetails");
};

export const getTaxInfoById = (id) => {
    return api.get(`/admin/taxinfoDetails/${id}`);
};

export const createTaxInfo = (payload) => {
    return api.post("/admin/taxinfoDetails", payload);
};

export const updateTaxInfo = (id, payload) => {
    return api.put(`/admin/taxinfoDetails/${id}`, payload);
};

export const deleteTaxInfo = (id) => {
    return api.delete(`/admin/taxinfoDetails/${id}`);
};