import api from "./axios";

// Get All Companies
export const getCompanies = () => {
    return api.get("/admin/companies");
};

// Get Company By Id
export const getCompanyById = (id) => {
    return api.get(`/admin/companies/${id}`);
};

// Create Company
export const createCompany = (formData) => {
    return api.post("/admin/companies", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Update Company
export const updateCompany = (id, formData) => {
    return api.put(`/admin/companies/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Delete Company
export const deleteCompany = (id) => {
    return api.delete(`/admin/companies/${id}`);
};

// Update Status
export const updateCompanyStatus = (id, active) => {
    return api.patch(
        `/admin/companies/${id}/status`,
        null,
        {
            params: {
                active,
            },
        }
    );
};