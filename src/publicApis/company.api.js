import api from "../api/axios";

export const getAllCompany = () => {
    return api.get("/companies");
}

export const getCompanyById = (id) => {
    return api.get(`/companies/${id}`);
}

export const createProjectEnquiry = (data) => {
    return api.post("/project-enquiries", data);
};

/* =========================================================
   GET ALL ENQUIRIES
========================================================= */

export const getAllEnquiries = () => {
    return api.get("/project-enquiries");
};

/* =========================================================
   GET ENQUIRY BY ID
========================================================= */

export const getEnquiryById = (id) => {
    return api.get(`/project-enquiries/${id}`);
};

/* =========================================================
   GET ENQUIRIES BY COMPANY
========================================================= */

export const getEnquiriesByCompany = (companyId) => {
    return api.get(`/project-enquiries/company/${companyId}`);
};

/* =========================================================
   GET ENQUIRIES BY STATUS
========================================================= */

export const getEnquiriesByStatus = (status) => {
    return api.get(`/project-enquiries/status/${status}`);
};

/* =========================================================
   UPDATE ENQUIRY STATUS
========================================================= */

export const updateEnquiryStatus = (id, status) => {
    return api.patch(`/project-enquiries/${id}/status`, null, {
        params: { status }
    });
};