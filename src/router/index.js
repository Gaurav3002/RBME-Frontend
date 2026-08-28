 import { createRouter, createWebHistory } from "vue-router";

import PublicLayout from "@/layouts/PublicLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

import Login from "@/views/admin/auth/Login.vue";

import Dashboard from "@/views/admin/dashboard/Dashboard.vue";
import Company from "@/views/admin/company/Company.vue";
import Category from "@/views/admin/category/Category.vue";
import ProductType from "@/views/admin/productType/ProductType.vue";
import Product from "@/views/admin/product/Product.vue";
import ProductSpecification from "@/views/admin/product/ProductSpecification.vue";

// Public Views
import Home from "@/views/public/Home.vue";
import PCategory from "@/views/public/Category.vue";
import Projects from "@/views/public/Project.vue";
import About from "@/views/public/About.vue";
import Contact from "@/views/public/Contacts.vue";
import PProduct from "@/views/public/Products.vue";



const routes = [


    {
        path: "/",
        component: PublicLayout,

        children:[
            {   path: "",
                name: "Home",
                component: Home,
            },
            {
                path: "companies",
                name: "Companies",
                component: PCategory,
            },
            {
                path: "projects",
                name: "Projects",
                component: Projects,
            },
            {
                path: "about",
                name: "About",
                component: About,
            },
            { 
                path: "contact",
                name: "Contact",
                component: Contact,
                        
            },
            {
            path: "companies/:companyId",
            name: "CompanyProducts",
            component: PProduct
            },
     ],
    },


    {
        path: "/admin",
        component: AuthLayout,

        children: [

            {
                path: "",
                redirect: "/admin/login",
            },

            {
                path: "login",
                name: "AdminLogin",
                component: Login,
            },

        ],
    },


    {
        path: "/admin",
        component: AdminLayout,

        meta: {
            requiresAuth: true,
        },

        children: [

            {
                path: "dashboard",
                name: "AdminDashboard",
                component: Dashboard,
            },

            {
                path: "company",
                name: "Company",
                component: Company,
            },

            {
                path: "category",
                name: "Category",
                component: Category,
            },

            {
                path: "productType",
                name: "ProductType",
                component: ProductType,
            },

            {
                path: "product",
                name: "Product",
                component: Product,
            },

            {
                path: "product-specification",
                name: "ProductSpecification",
                component: ProductSpecification,
            },

        ],
    },


    {
        path: "/:pathMatch(.*)*",
        redirect: "/",
    },

];


const router = createRouter({

    history: createWebHistory(),

    routes,

    scrollBehavior() {
        return {
            top: 0,
        };
    },

});



router.beforeEach((to, from, next) => {

    const token = sessionStorage.getItem("adminToken");


    if (to.meta.requiresAuth && !token) {

        next("/admin/login");

        return;
    }

    if (to.path === "/admin/login" && token) {

        next("/admin/dashboard");

        return;
    }


    next();

});


export default router;