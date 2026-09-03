import axios from "axios";


// ============================================================
// AXIOS INSTANCE
// ============================================================

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


// ============================================================
// REQUEST INTERCEPTOR
// ============================================================

api.interceptors.request.use(
    (config) => {

        // Get admin JWT token from sessionStorage
        const token = sessionStorage.getItem("adminToken");

        // Attach token to request if available
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ============================================================
// RESPONSE INTERCEPTOR
// ============================================================

api.interceptors.response.use(

    // Successful response
    (response) => {
        return response;
    },

    // Error response
    (error) => {

        const status = error.response?.status;
        const currentPath = window.location.pathname;


        // ========================================================
        // ADMIN AUTHENTICATION ERROR
        // ========================================================

        if (
            status === 401 &&
            currentPath.startsWith("/admin") &&
            currentPath !== "/admin/login"
        ) {

            // Remove expired/invalid admin session
            sessionStorage.removeItem("adminToken");
            sessionStorage.removeItem("admin");


            // Redirect admin user to login page
            window.location.href = "/admin/login";
        }


        // ========================================================
        // PUBLIC WEBSITE
        // ========================================================
        //
        // If a public API returns 401:
        //
        // /           -> Stay on page
        // /about      -> Stay on page
        // /products   -> Stay on page
        // /projects   -> Stay on page
        // /contact    -> Stay on page
        //
        // No redirect is performed here.
        //
        // ========================================================


        return Promise.reject(error);
    }
);


// ============================================================
// EXPORT
// ============================================================

export default api;