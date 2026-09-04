 import { createRouter, createWebHistory } from "vue-router";

import PublicLayout from "@/layouts/PublicLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const Login = () => import("@/views/admin/auth/Login.vue");
const Dashboard = () => import("@/views/admin/dashboard/Dashboard.vue");
const Company = () => import("@/views/admin/company/Company.vue");
const Category = () => import("@/views/admin/category/Category.vue");
const ProductType = () => import("@/views/admin/productType/ProductType.vue");
const Product = () => import("@/views/admin/product/Product.vue");
const ProductSpecification = () => import("@/views/admin/product/ProductSpecification.vue");

const Home = () => import("@/views/public/Home.vue");
const Projects = () => import("@/views/public/Project.vue");
const About = () => import("@/views/public/About.vue");
const Contact = () => import("@/views/public/Contacts.vue");
const PProduct = () => import("@/views/public/Products.vue");



const routes = [


    {
        path: "/",
        component: PublicLayout,

        children:[
            {   path: "",
                name: "Home",
                component: Home,
            },
            // {
            //     path: "companies",
            //     name: "Companies",
            //     component: PCategory,
            // },
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

    scrollBehavior(to, from, savedPosition) {
         if (to.hash) {
            return {
                el: to.hash,
                behavior: "smooth",
            };
        }
        if (savedPosition) {
            return savedPosition;
        }

        return {
            top: 0,
        };
    },

});


router.beforeEach((to) => {

    const token = sessionStorage.getItem("adminToken");

    if (to.meta.requiresAuth && !token) {

        return "/admin/login";

    }

    if (to.path === "/admin/login" && token) {

        return "/admin/dashboard";

    }

    return true;

});

export default router;