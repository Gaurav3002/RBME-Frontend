<template>
    <div class="container-fluid product-management-page">

        <!-- =====================================================
             HEADER
        ====================================================== -->
        <div class="page-header d-flex justify-content-between align-items-center mb-4">

            <div>
                <div class="page-eyebrow">
                    PRODUCT CATALOGUE
                </div>

                <h3 class="page-title mb-1">
                    Product Management
                </h3>

                <p class="page-subtitle mb-0">
                    Manage companies, categories, product types and products.
                </p>
            </div>

            <button
                type="button"
                class="btn btn-primary add-product-btn"
                @click="openCreateModal"
            >
                <i class="bi bi-plus-circle me-1"></i>
                Add Product
            </button>

        </div>


        <!-- =====================================================
             FILTER CARD
        ====================================================== -->
        <div class="card admin-card filter-card shadow-sm mb-4">

            <div class="card-body">

                <!-- FILTER HEADER -->
                <div class="filter-top">

                    <div class="filter-title-wrapper">

                        <div class="filter-icon">
                            <i class="bi bi-funnel-fill"></i>
                        </div>

                        <div>
                            <h5 class="filter-title mb-0">
                                Filter Products
                            </h5>

                            <p class="filter-description mb-0">
                                Narrow down products by company, category and product type.
                            </p>
                        </div>

                    </div>


                    <button
                        type="button"
                        class="btn reset-filter-btn"
                        @click="resetProductFilters"
                    >
                        <i class="bi bi-arrow-counterclockwise me-1"></i>
                        Reset Filters
                    </button>

                </div>


                <!-- FILTERS -->
                <div class="row g-3 mt-2">

                    <!-- COMPANY FILTER -->
                    <div class="col-xl-4 col-md-6">

                        <label class="filter-label">
                            <i class="bi bi-building me-1"></i>
                            Company
                        </label>

                        <select
                            class="form-select filter-select"
                            v-model="selectedCompanyId"
                            @change="onProductCompanyFilterChange"
                        >
                            <option :value="null">
                                All Companies
                            </option>

                            <option
                                v-for="company in companies"
                                :key="company.id"
                                :value="company.id"
                            >
                                {{ company.name }}
                            </option>
                        </select>

                    </div>


                    <!-- CATEGORY FILTER -->
                    <div class="col-xl-4 col-md-6">

                        <label class="filter-label">
                            <i class="bi bi-grid me-1"></i>
                            Category
                        </label>

                        <select
                            class="form-select filter-select"
                            v-model="selectedCategoryId"
                            @change="onProductCategoryFilterChange"
                            :disabled="!selectedCompanyId"
                        >
                            <option :value="null">
                                All Categories
                            </option>

                            <option
                                v-for="category in productFilterCategories"
                                :key="category.id"
                                :value="category.id"
                            >
                                {{ category.name }}
                            </option>
                        </select>

                    </div>


                    <!-- PRODUCT TYPE FILTER -->
                    <div class="col-xl-4 col-md-6">

                        <label class="filter-label">
                            <i class="bi bi-box-seam me-1"></i>
                            Product Type
                        </label>

                        <select
                            class="form-select filter-select"
                            v-model="selectedProductTypeId"
                            :disabled="!selectedCategoryId"
                        >
                            <option :value="null">
                                All Product Types
                            </option>

                            <option
                                v-for="productType in productFilterTypes"
                                :key="productType.id"
                                :value="productType.id"
                            >
                                {{ productType.productTypeName }}
                            </option>
                        </select>

                    </div>

                </div>


                <!-- ACTIVE FILTER SUMMARY -->
                <div class="filter-summary mt-3">

                    <div class="filter-summary-left">

                        <span class="filter-result-label">
                            Showing
                        </span>

                        <span class="filter-result-count">
                            {{ filteredProducts.length }}
                        </span>

                        <span class="filter-result-label">
                            of {{ products.length }} products
                        </span>

                    </div>


                    <div class="active-filter-tags">

                        <span
                            v-if="selectedCompanyId"
                            class="filter-tag"
                        >
                            Company:
                            {{ getCompanyName(selectedCompanyId) }}

                            <button
                                type="button"
                                @click="clearCompanyFilter"
                            >
                                <i class="bi bi-x"></i>
                            </button>
                        </span>


                        <span
                            v-if="selectedCategoryId"
                            class="filter-tag"
                        >
                            Category:
                            {{ getCategoryName(selectedCategoryId) }}

                            <button
                                type="button"
                                @click="clearCategoryFilter"
                            >
                                <i class="bi bi-x"></i>
                            </button>
                        </span>


                        <span
                            v-if="selectedProductTypeId"
                            class="filter-tag"
                        >
                            Type:
                            {{ getProductTypeName(selectedProductTypeId) }}

                            <button
                                type="button"
                                @click="selectedProductTypeId = null"
                            >
                                <i class="bi bi-x"></i>
                            </button>
                        </span>

                    </div>

                </div>

            </div>

        </div>


        <!-- =====================================================
             SEARCH
        ====================================================== -->
        <div class="card admin-card search-card shadow-sm mb-3">

            <div class="card-body">

                <div class="search-wrapper">

                    <i class="bi bi-search search-icon"></i>

                    <input
                        type="text"
                        class="form-control admin-form-control search-input"
                        placeholder="Search by product title, model no, company, category or product type..."
                        v-model="search"
                    />

                    <button
                        v-if="search"
                        type="button"
                        class="search-clear"
                        @click="search = ''"
                        title="Clear Search"
                    >
                        <i class="bi bi-x-circle-fill"></i>
                    </button>

                </div>

            </div>

        </div>


        <!-- =====================================================
             PRODUCT TABLE CARD
        ====================================================== -->
        <div class="card admin-card shadow-sm">

            <!-- TABLE HEADER -->
            <div class="product-table-header">

                <div>

                    <h5 class="table-title mb-1">
                        Products
                    </h5>

                    <p class="table-subtitle mb-0">
                        {{ filteredProducts.length }} product{{
                            filteredProducts.length !== 1 ? "s" : ""
                        }} found
                    </p>

                </div>


                <div class="table-filter-indicator">

                    <i class="bi bi-funnel"></i>

                    <span v-if="hasActiveFilters">
                        Filters Applied
                    </span>

                    <span v-else>
                        All Products
                    </span>

                </div>

            </div>


            <div class="card-body p-0">

                <div class="table-responsive product-table-responsive">

                    <table class="table admin-table table-hover align-middle mb-0">

                        <thead>

                            <tr>

                                <th class="image-column">
                                    Image
                                </th>

                                <th>
                                    Company
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Product Type
                                </th>

                                <th>
                                    Model No
                                </th>

                                <th>
                                    Title
                                </th>

                                <th>
                                    Featured
                                </th>

                                <th>
                                    Status
                                </th>

                                <th class="action-column">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <!-- =================================================
                                 PRODUCTS
                            ================================================== -->
                            <tr
                                v-for="product in filteredProducts"
                                :key="product.id"
                                class="product-table-row"
                            >

                                <!-- IMAGE -->
                                <td>

                                    <img
                                        v-if="getProductImage(product)"
                                        :src="getImageUrl(getProductImage(product))"
                                        class="product-table-image"
                                        alt="Product"
                                        @error="handleImageError"
                                    />

                                    <div
                                        v-else
                                        class="no-product-image"
                                    >
                                        <i class="bi bi-image"></i>
                                    </div>

                                </td>


                                <!-- COMPANY -->
                                <td>
                                    <div class="company-cell">
                                        {{ product.companyName || "-" }}
                                    </div>
                                </td>


                                <!-- CATEGORY -->
                                <td>
                                    <div class="category-cell">
                                        {{ product.categoryName || "-" }}
                                    </div>
                                </td>


                                <!-- PRODUCT TYPE -->
                                <td>

                                    <span class="product-type-badge">
                                        {{ product.productTypeName || "-" }}
                                    </span>

                                </td>


                                <!-- MODEL -->
                                <td>

                                    <span class="model-number">
                                        {{ product.modelNo || "-" }}
                                    </span>

                                </td>


                                <!-- TITLE -->
                                <td>

                                    <div class="product-title-cell">
                                        {{ product.title || "-" }}
                                    </div>

                                </td>


                                <!-- FEATURED -->
                                <td>

                                    <span
                                        class="status-badge"
                                        :class="
                                            product.featured
                                                ? 'status-featured'
                                                : 'status-not-featured'
                                        "
                                    >
                                        <i
                                            class="bi"
                                            :class="
                                                product.featured
                                                    ? 'bi-star-fill'
                                                    : 'bi-star'
                                            "
                                        ></i>

                                        {{ product.featured ? "Yes" : "No" }}
                                    </span>

                                </td>


                                <!-- STATUS -->
                                <td>

                                    <span
                                        class="status-badge"
                                        :class="
                                            product.active
                                                ? 'status-active'
                                                : 'status-inactive'
                                        "
                                    >
                                        <span class="status-dot"></span>

                                        {{ product.active ? "Active" : "Inactive" }}

                                    </span>

                                </td>


                                <!-- ACTIONS -->
                                <td>

                                    <div class="action-buttons">

                                        <button
                                            type="button"
                                            class="btn admin-action-button edit-button"
                                            @click="editProduct(product)"
                                            title="Edit Product"
                                        >
                                            <i class="bi bi-pencil"></i>
                                        </button>


                                        <button
                                            type="button"
                                            class="btn admin-action-button delete-button"
                                            @click="deleteProductById(product.id)"
                                            title="Delete Product"
                                        >
                                            <i class="bi bi-trash"></i>
                                        </button>

                                    </div>

                                </td>

                            </tr>


                            <!-- =================================================
                                 EMPTY
                            ================================================== -->
                            <tr v-if="filteredProducts.length === 0">

                                <td
                                    colspan="9"
                                    class="empty-table-cell"
                                >

                                    <div class="empty-container">

                                        <div class="empty-icon">
                                            <i class="bi bi-box-seam"></i>
                                        </div>

                                        <h5>
                                            No Products Found
                                        </h5>

                                        <p>
                                            No products match your current filters or search.
                                        </p>

                                        <button
                                            v-if="hasActiveFilters || search"
                                            type="button"
                                            class="btn reset-empty-btn"
                                            @click="resetProductFilters"
                                        >
                                            <i class="bi bi-arrow-counterclockwise me-1"></i>
                                            Clear Filters
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>


        <!-- =====================================================
             PRODUCT MODAL
        ====================================================== -->
        <BaseModal
            ref="modalRef"
            id="productModal"
            :title="editMode ? 'Edit Product' : 'Add Product'"
            size="lg"
            :draggable="true"
        >

            <div class="row">

                <!-- COMPANY -->
                <div class="col-md-4 mb-3">

                    <label class="form-label">
                        Company
                        <span class="text-danger">*</span>
                    </label>

                    <select
                        class="form-select"
                        v-model="form.companyId"
                        @change="onCompanyChange"
                    >

                        <option :value="null">
                            Select Company
                        </option>

                        <option
                            v-for="company in companies"
                            :key="company.id"
                            :value="company.id"
                        >
                            {{ company.name }}
                        </option>

                    </select>

                </div>


                <!-- CATEGORY -->
                <div class="col-md-4 mb-3">

                    <label class="form-label">
                        Category
                        <span class="text-danger">*</span>
                    </label>

                    <select
                        class="form-select"
                        v-model="form.categoryId"
                        @change="onCategoryChange"
                    >

                        <option :value="null">
                            Select Category
                        </option>

                        <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                        >
                            {{ category.name }}
                        </option>

                    </select>

                </div>


                <!-- PRODUCT TYPE -->
                <div class="col-md-4 mb-3">

                    <label class="form-label">
                        Product Type
                        <span class="text-danger">*</span>
                    </label>

                    <select
                        class="form-select"
                        v-model="form.productTypeId"
                    >

                        <option :value="null">
                            Select Product Type
                        </option>

                        <option
                            v-for="productType in productTypes"
                            :key="productType.id"
                            :value="productType.id"
                        >
                            {{ productType.productTypeName }}
                        </option>

                    </select>

                </div>


                <!-- MODEL NUMBER -->
                <div class="col-md-6 mb-3">

                    <label class="form-label">
                        Model No
                        <span class="text-danger">*</span>
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Model No"
                        v-model="form.modelNo"
                    />

                </div>


                <!-- PRODUCT TITLE -->
                <div class="col-md-6 mb-3">

                    <label class="form-label">
                        Product Title
                        <span class="text-danger">*</span>
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Product Title"
                        v-model="form.title"
                    />

                </div>


                <!-- DESCRIPTION -->
                <div class="col-12 mb-3">

                    <label class="form-label">
                        Description
                    </label>

                    <textarea
                        class="form-control"
                        rows="4"
                        placeholder="Enter Product Description"
                        v-model="form.description"
                    ></textarea>

                </div>


                <!-- THUMBNAIL -->
                <div class="col-md-6 mb-3">

                    <label class="form-label">
                        Thumbnail URL
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Thumbnail URL"
                        v-model="form.thumbnail"
                    />

                </div>


                <!-- YOUTUBE -->
                <div class="col-md-6 mb-3">

                    <label class="form-label">
                        YouTube URL
                    </label>

                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter YouTube URL"
                        v-model="form.youtubeUrl"
                    />

                </div>


                <!-- =================================================
                     EXISTING IMAGES
                ================================================== -->
                <div
                    v-if="editMode && existingImages.length > 0"
                    class="col-12 mb-3"
                >

                    <label class="form-label">
                        Existing Product Images
                    </label>

                    <div class="row">

                        <div
                            v-for="(image, index) in existingImages"
                            :key="image.id"
                            class="col-md-3 col-sm-4 col-6 mb-3"
                        >

                            <div class="existing-image-card">

                                <img
                                    :src="getImageUrl(image.imageUrl)"
                                    class="existing-product-image"
                                    alt="Product Image"
                                    @error="handleImageError"
                                />

                                <div class="existing-image-order">
                                    Image {{ (image.sortOrder ?? 0) + 1 }}
                                </div>

                                <button
                                    type="button"
                                    class="btn admin-action-button btn-danger remove-existing-image-btn"
                                    @click="removeExistingImage(index)"
                                    title="Delete Image"
                                >
                                    <i class="bi bi-x"></i>
                                </button>

                            </div>

                        </div>

                    </div>
                </div>


                <!-- =================================================
                     PRODUCT IMAGES
                ================================================== -->
                <div class="col-12 mb-3">

                    <label class="form-label">
                        Product Images
                    </label>

                    <input
                        ref="imageInputRef"
                        type="file"
                        class="form-control"
                        multiple
                        accept="image/*"
                        @change="handleImageChange"
                    />

                    


                    <!-- IMAGE PREVIEWS -->
                    <div
                        v-if="imagePreviews.length > 0"
                        class="row mt-3"
                    >

                        <div
                            v-for="(image, index) in imagePreviews"
                            :key="index"
                            class="col-md-3 col-sm-4 col-6 mb-3"
                        >

                            <div class="image-preview-card">

                                <img
                                    :src="image.url"
                                    class="product-preview-image"
                                    alt="Product Image"
                                />

                                <button
                                    type="button"
                                    class="btn admin-action-button btn-danger remove-image-btn"
                                    @click="removeSelectedImage(index)"
                                    title="Remove Image"
                                >
                                    <i class="bi bi-x"></i>
                                </button>

                                <div class="preview-image-name">
                                    {{ image.file.name }}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                <!-- FEATURED -->
                <div class="col-md-6 d-flex align-items-center mb-3">

                    <div class="form-check">

                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="featured"
                            v-model="form.featured"
                        />

                        <label
                            class="form-check-label"
                            for="featured"
                        >
                            Featured
                        </label>

                    </div>

                </div>


                <!-- ACTIVE -->
                <div class="col-md-6 d-flex align-items-center mb-3">

                    <div class="form-check">

                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="active"
                            v-model="form.active"
                        />

                        <label
                            class="form-check-label"
                            for="active"
                        >
                            Active
                        </label>

                    </div>

                </div>

            </div>


            <!-- =====================================================
                 MODAL FOOTER
            ====================================================== -->
            <template #footer>

                <button
                    type="button"
                    class="btn btn-secondary"
                    @click="closeModal"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="btn btn-primary"
                    :disabled="saving"
                    @click="saveProduct"
                >

                    <span
                        v-if="saving"
                        class="spinner-border spinner-border-sm me-1"
                    ></span>

                    <i
                        v-else
                        class="bi bi-check-circle me-1"
                    ></i>

                    {{
                        saving
                            ? "Saving..."
                            : editMode
                                ? "Update Product"
                                : "Save Product"
                    }}

                </button>

            </template>

        </BaseModal>

    </div>
</template>


<script setup>

import {
    ref,
    computed,
    onMounted
} from "vue";

import BaseModal from "@/components/admin/common/BaseModal.vue";

import {
    createProduct,
    updateProduct,
    getProducts,
    deleteProduct
} from "@/api/product.api";

import {
    getCompanies
} from "@/api/company.api";

import {
    getCategoriesByCompany
} from "@/api/category.api";

import {
    getProductTypesByCategory
} from "@/api/productType.api";


// ============================================================
// STATE
// ============================================================

const companies = ref([]);
const categories = ref([]);
const productTypes = ref([]);
const products = ref([]);

const search = ref("");

const editMode = ref(false);
const saving = ref(false);

const modalRef = ref(null);
const imageInputRef = ref(null);

const imagePreviews = ref([]);
const existingImages = ref([]);
const deletedImageIds = ref([]);


// ============================================================
// PRODUCT LIST FILTERS
// ============================================================

const selectedCompanyId = ref(null);
const selectedCategoryId = ref(null);
const selectedProductTypeId = ref(null);


// ============================================================
// IMAGE BASE URL
// ============================================================

const API_BASE_URL = (
    import.meta.env.VITE_IMAGE_URL ||
    ""
).replace(/\/+$/, "");


// ============================================================
// FORM
// ============================================================

const form = ref(getEmptyForm());


// ============================================================
// FILTER CATEGORIES FROM PRODUCTS
//
// This is separate from the modal categories.
// It does NOT call the API every time you filter.
// ============================================================

const productFilterCategories = computed(() => {

    if (!selectedCompanyId.value) {
        return [];
    }

    const categoryMap = new Map();

    products.value
        .filter(product =>
            Number(product.companyId) ===
            Number(selectedCompanyId.value)
        )
        .forEach(product => {

            if (
                product.categoryId !== null &&
                product.categoryId !== undefined
            ) {

                if (!categoryMap.has(product.categoryId)) {

                    categoryMap.set(
                        product.categoryId,
                        {
                            id: product.categoryId,
                            name:
                                product.categoryName ||
                                "Unnamed Category"
                        }
                    );

                }

            }

        });

    return Array.from(categoryMap.values())
        .sort((a, b) =>
            String(a.name).localeCompare(
                String(b.name)
            )
        );
});


// ============================================================
// FILTER PRODUCT TYPES FROM PRODUCTS
// ============================================================

const productFilterTypes = computed(() => {

    if (!selectedCategoryId.value) {
        return [];
    }

    const typeMap = new Map();

    products.value
        .filter(product =>
            Number(product.companyId) ===
            Number(selectedCompanyId.value) &&

            Number(product.categoryId) ===
            Number(selectedCategoryId.value)
        )
        .forEach(product => {

            if (
                product.productTypeId !== null &&
                product.productTypeId !== undefined
            ) {

                if (!typeMap.has(product.productTypeId)) {

                    typeMap.set(
                        product.productTypeId,
                        {
                            id: product.productTypeId,
                            productTypeName:
                                product.productTypeName ||
                                "Unnamed Product Type"
                        }
                    );

                }

            }

        });

    return Array.from(typeMap.values())
        .sort((a, b) =>
            String(
                a.productTypeName
            ).localeCompare(
                String(
                    b.productTypeName
                )
            )
        );
});


// ============================================================
// FINAL FILTERED PRODUCTS
// ============================================================

const filteredProducts = computed(() => {

    const keyword = search.value
        .toLowerCase()
        .trim();

    return products.value.filter(product => {

        // ----------------------------------------------------
        // COMPANY
        // ----------------------------------------------------

        const companyMatch =
            !selectedCompanyId.value ||
            Number(product.companyId) ===
            Number(selectedCompanyId.value);


        // ----------------------------------------------------
        // CATEGORY
        // ----------------------------------------------------

        const categoryMatch =
            !selectedCategoryId.value ||
            Number(product.categoryId) ===
            Number(selectedCategoryId.value);


        // ----------------------------------------------------
        // PRODUCT TYPE
        // ----------------------------------------------------

        const productTypeMatch =
            !selectedProductTypeId.value ||
            Number(product.productTypeId) ===
            Number(selectedProductTypeId.value);


        // ----------------------------------------------------
        // SEARCH
        // ----------------------------------------------------

        const searchMatch =
            !keyword ||

            String(product.title || "")
                .toLowerCase()
                .includes(keyword) ||

            String(product.modelNo || "")
                .toLowerCase()
                .includes(keyword) ||

            String(product.companyName || "")
                .toLowerCase()
                .includes(keyword) ||

            String(product.categoryName || "")
                .toLowerCase()
                .includes(keyword) ||

            String(product.productTypeName || "")
                .toLowerCase()
                .includes(keyword);


        return (
            companyMatch &&
            categoryMatch &&
            productTypeMatch &&
            searchMatch
        );

    });

});


// ============================================================
// ACTIVE FILTER CHECK
// ============================================================

const hasActiveFilters = computed(() => {

    return (
        selectedCompanyId.value !== null ||
        selectedCategoryId.value !== null ||
        selectedProductTypeId.value !== null
    );

});


// ============================================================
// LOAD COMPANIES
// ============================================================

async function loadCompanies() {

    try {

        const response =
            await getCompanies();

        companies.value =
            response.data || [];

    } catch (error) {

        console.error(
            "LOAD COMPANIES ERROR:",
            error
        );

    }

}


// ============================================================
// LOAD PRODUCTS
// ============================================================

async function loadProducts() {

    try {

        const response =
            await getProducts();

        products.value =
            response.data || [];

    } catch (error) {

        console.error(
            "LOAD PRODUCTS ERROR:",
            error
        );

    }

}


// ============================================================
// COMPANY FILTER CHANGE
// ============================================================

function onProductCompanyFilterChange() {

    selectedCategoryId.value = null;

    selectedProductTypeId.value = null;

}


// ============================================================
// CATEGORY FILTER CHANGE
// ============================================================

function onProductCategoryFilterChange() {

    selectedProductTypeId.value = null;

}


// ============================================================
// RESET PRODUCT FILTERS
// ============================================================

function resetProductFilters() {

    selectedCompanyId.value = null;

    selectedCategoryId.value = null;

    selectedProductTypeId.value = null;

    search.value = "";

}


// ============================================================
// CLEAR COMPANY FILTER
// ============================================================

function clearCompanyFilter() {

    selectedCompanyId.value = null;

    selectedCategoryId.value = null;

    selectedProductTypeId.value = null;

}


// ============================================================
// CLEAR CATEGORY FILTER
// ============================================================

function clearCategoryFilter() {

    selectedCategoryId.value = null;

    selectedProductTypeId.value = null;

}


// ============================================================
// GET COMPANY NAME
// ============================================================

function getCompanyName(id) {

    const company =
        companies.value.find(
            item =>
                Number(item.id) ===
                Number(id)
        );

    return company?.name || "-";

}


// ============================================================
// GET CATEGORY NAME
// ============================================================

function getCategoryName(id) {

    const category =
        productFilterCategories.value.find(
            item =>
                Number(item.id) ===
                Number(id)
        );

    return category?.name || "-";

}


// ============================================================
// GET PRODUCT TYPE NAME
// ============================================================

function getProductTypeName(id) {

    const type =
        productFilterTypes.value.find(
            item =>
                Number(item.id) ===
                Number(id)
        );

    return (
        type?.productTypeName ||
        "-"
    );

}


// ============================================================
// COMPANY CHANGE - MODAL
// ============================================================

async function onCompanyChange() {

    form.value.categoryId = null;

    form.value.productTypeId = null;

    categories.value = [];

    productTypes.value = [];

    if (!form.value.companyId) {
        return;
    }

    try {

        const response =
            await getCategoriesByCompany(
                form.value.companyId
            );

        categories.value =
            response.data || [];

    } catch (error) {

        console.error(
            "LOAD CATEGORIES ERROR:",
            error
        );

    }

}


// ============================================================
// CATEGORY CHANGE - MODAL
// ============================================================

async function onCategoryChange() {

    form.value.productTypeId = null;

    productTypes.value = [];

    if (!form.value.categoryId) {
        return;
    }

    try {

        const response =
            await getProductTypesByCategory(
                form.value.categoryId
            );

        productTypes.value =
            response.data || [];

    } catch (error) {

        console.error(
            "LOAD PRODUCT TYPES ERROR:",
            error
        );

    }

}


// ============================================================
// EMPTY FORM
// ============================================================

function getEmptyForm() {

    return {

        id: null,

        companyId: null,

        categoryId: null,

        productTypeId: null,

        modelNo: "",

        title: "",

        description: "",

        thumbnail: "",

        youtubeUrl: "",

        featured: false,

        active: true,

        images: []

    };

}


// ============================================================
// OPEN CREATE MODAL
// ============================================================

function openCreateModal() {

    clearPreviewUrls();

    editMode.value = false;

    existingImages.value = [];

    deletedImageIds.value = [];

    categories.value = [];

    productTypes.value = [];

    form.value =
        getEmptyForm();

    if (imageInputRef.value) {

        imageInputRef.value.value = "";

    }

    modalRef.value?.show();

}


// ============================================================
// EDIT PRODUCT
// ============================================================

async function editProduct(product) {

    try {

        clearPreviewUrls();

        editMode.value = true;

        imagePreviews.value = [];

        existingImages.value =
            product.images
                ? [...product.images].sort(
                    (a, b) =>
                        (a.sortOrder ?? 0) -
                        (b.sortOrder ?? 0)
                )
                : [];

        deletedImageIds.value = [];

        form.value = {

            id: product.id,

            companyId:
                product.companyId,

            categoryId: null,

            productTypeId: null,

            modelNo:
                product.modelNo || "",

            title:
                product.title || "",

            description:
                product.description || "",

            thumbnail:
                product.thumbnail || "",

            youtubeUrl:
                product.youtubeUrl || "",

            featured:
                product.featured ?? false,

            active:
                product.active ?? true,

            images: []

        };


        // --------------------------------------------------------
        // LOAD CATEGORIES
        // --------------------------------------------------------

        const categoryResponse =
            await getCategoriesByCompany(
                product.companyId
            );

        categories.value =
            categoryResponse.data || [];

        form.value.categoryId =
            product.categoryId;


        // --------------------------------------------------------
        // LOAD PRODUCT TYPES
        // --------------------------------------------------------

        if (product.categoryId) {

            const typeResponse =
                await getProductTypesByCategory(
                    product.categoryId
                );

            productTypes.value =
                typeResponse.data || [];

        }

        form.value.productTypeId =
            product.productTypeId;


        // --------------------------------------------------------
        // CLEAR FILE INPUT
        // --------------------------------------------------------

        if (imageInputRef.value) {

            imageInputRef.value.value = "";

        }


        // --------------------------------------------------------
        // OPEN MODAL
        // --------------------------------------------------------

        modalRef.value?.show();

    } catch (error) {

        console.error(
            "EDIT PRODUCT ERROR:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Failed to load product."
        );

    }

}


// ============================================================
// IMAGE CHANGE
// ============================================================

function handleImageChange(event) {

    const files =
        Array.from(
            event.target.files || []
        );

    clearPreviewUrls();

    form.value.images =
        files;

    imagePreviews.value =
        files.map(file => ({

            file: file,

            url:
                URL.createObjectURL(file)

        }));

}


// ============================================================
// REMOVE SELECTED IMAGE
// ============================================================

function removeSelectedImage(index) {

    const image =
        imagePreviews.value[index];

    if (image?.url) {

        URL.revokeObjectURL(
            image.url
        );

    }

    form.value.images.splice(
        index,
        1
    );

    imagePreviews.value.splice(
        index,
        1
    );


    // --------------------------------------------------------
    // REBUILD FILE INPUT
    // --------------------------------------------------------

    if (imageInputRef.value) {

        const dataTransfer =
            new DataTransfer();

        form.value.images.forEach(
            file => {
                dataTransfer.items.add(
                    file
                );
            }
        );

        imageInputRef.value.files =
            dataTransfer.files;

    }

}


// ============================================================
// CLEAR PREVIEW URLS
// ============================================================

function clearPreviewUrls() {

    imagePreviews.value.forEach(
        image => {

            if (image?.url) {

                URL.revokeObjectURL(
                    image.url
                );

            }

        }
    );

    imagePreviews.value = [];

}


// ============================================================
// REMOVE EXISTING IMAGE
// ============================================================

function removeExistingImage(index) {

    const image =
        existingImages.value[index];

    if (!image || !image.id) {
        return;
    }

    deletedImageIds.value.push(
        image.id
    );

    existingImages.value.splice(
        index,
        1
    );

    console.log(
        "Deleted image IDs:",
        deletedImageIds.value
    );

}


// ============================================================
// GET PRODUCT FIRST IMAGE
// ============================================================

function getProductImage(product) {

    if (
        !product ||
        !Array.isArray(product.images) ||
        product.images.length === 0
    ) {

        return null;

    }

    const sortedImages =
        [...product.images].sort(
            (a, b) =>
                (a.sortOrder ?? 0) -
                (b.sortOrder ?? 0)
        );

    return (
        sortedImages[0]?.imageUrl ||
        null
    );

}


// ============================================================
// GET IMAGE URL
// ============================================================

function getImageUrl(imagePath) {

    if (!imagePath) {
        return "";
    }

    // Already complete URL
    if (
        imagePath.startsWith("http://") ||
        imagePath.startsWith("https://") ||
        imagePath.startsWith("data:")
    ) {

        return imagePath;

    }

    // Remove leading slash
    const cleanPath =
        String(imagePath)
            .replace(/^\/+/, "");

    // If VITE_IMAGE_URL is not configured
    if (!API_BASE_URL) {

        console.warn(
            "VITE_IMAGE_URL is not configured."
        );

        return `/${cleanPath}`;

    }

    return `${API_BASE_URL}/${cleanPath}`;

}


// ============================================================
// IMAGE ERROR
// ============================================================

function handleImageError(event) {

    event.target.style.display =
        "none";

}


// ============================================================
// SAVE PRODUCT
// ============================================================

async function saveProduct() {

    if (saving.value) {
        return;
    }

    try {

        // --------------------------------------------------------
        // VALIDATION
        // --------------------------------------------------------

        if (!form.value.companyId) {

            alert(
                "Please select company."
            );

            return;

        }


        if (!form.value.categoryId) {

            alert(
                "Please select category."
            );

            return;

        }


        if (!form.value.productTypeId) {

            alert(
                "Please select product type."
            );

            return;

        }


        if (
            !form.value.modelNo ||
            !form.value.modelNo.trim()
        ) {

            alert(
                "Model No is required."
            );

            return;

        }


        if (
            !form.value.title ||
            !form.value.title.trim()
        ) {

            alert(
                "Product title is required."
            );

            return;

        }


        saving.value = true;


        // --------------------------------------------------------
        // CREATE FORM DATA
        // --------------------------------------------------------

        const formData =
            new FormData();


        // --------------------------------------------------------
        // PRODUCT DATA
        // --------------------------------------------------------

        formData.append(
            "companyId",
            String(
                form.value.companyId
            )
        );

        formData.append(
            "categoryId",
            String(
                form.value.categoryId
            )
        );

        formData.append(
            "productTypeId",
            String(
                form.value.productTypeId
            )
        );

        formData.append(
            "modelNo",
            form.value.modelNo.trim()
        );

        formData.append(
            "title",
            form.value.title.trim()
        );

        formData.append(
            "description",
            form.value.description || ""
        );

        formData.append(
            "thumbnail",
            form.value.thumbnail || ""
        );

        formData.append(
            "youtubeUrl",
            form.value.youtubeUrl || ""
        );

        formData.append(
            "featured",
            String(
                form.value.featured
            )
        );

        formData.append(
            "active",
            String(
                form.value.active
            )
        );


        // --------------------------------------------------------
        // DELETED IMAGE IDS
        // --------------------------------------------------------

        if (
            editMode.value &&
            deletedImageIds.value.length > 0
        ) {

            deletedImageIds.value.forEach(
                imageId => {

                    formData.append(
                        "deletedImageIds",
                        imageId
                    );

                }
            );

        }


        // --------------------------------------------------------
        // PRODUCT IMAGES
        // --------------------------------------------------------

        if (
            form.value.images &&
            form.value.images.length > 0
        ) {

            form.value.images.forEach(
                file => {

                    formData.append(
                        "images",
                        file
                    );

                }
            );

        }


        // --------------------------------------------------------
        // DEBUG
        // --------------------------------------------------------

        for (
            const [key, value]
            of formData.entries()
        ) {

            console.log(
                key,
                value instanceof File
                    ? value.name
                    : value
            );

        }


        // --------------------------------------------------------
        // CREATE / UPDATE
        // --------------------------------------------------------

        if (!editMode.value) {

            await createProduct(
                formData
            );

            alert(
                "Product created successfully."
            );

        } else {

            await updateProduct(
                form.value.id,
                formData
            );

            alert(
                "Product updated successfully."
            );

        }


        // --------------------------------------------------------
        // RELOAD PRODUCTS
        // --------------------------------------------------------

        await loadProducts();


        // --------------------------------------------------------
        // CLOSE MODAL
        // --------------------------------------------------------

        modalRef.value?.hide();

        resetForm();

    } catch (error) {

        console.error(
            "PRODUCT SAVE ERROR:",
            error
        );

        console.error(
            "SERVER RESPONSE:",
            error.response?.data
        );

        alert(
            error.response?.data?.message ||
            "Failed to save Product."
        );

    } finally {

        saving.value = false;

    }

}


// ============================================================
// DELETE PRODUCT
// ============================================================

async function deleteProductById(id) {

    const confirmed =
        confirm(
            "Delete this Product?"
        );

    if (!confirmed) {
        return;
    }

    try {

        await deleteProduct(id);

        alert(
            "Product deleted successfully."
        );

        await loadProducts();

    } catch (error) {

        console.error(
            "DELETE PRODUCT ERROR:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Failed to delete Product."
        );

    }

}


// ============================================================
// CLOSE MODAL
// ============================================================

function closeModal() {

    modalRef.value?.hide();

    resetForm();

}


// ============================================================
// RESET FORM
// ============================================================

function resetForm() {

    clearPreviewUrls();

    existingImages.value = [];

    if (imageInputRef.value) {

        imageInputRef.value.value = "";

    }

    form.value =
        getEmptyForm();

    categories.value = [];

    productTypes.value = [];

    editMode.value = false;

}


// ============================================================
// COMPONENT MOUNT
// ============================================================

onMounted(async () => {

    await loadCompanies();

    await loadProducts();

});

</script>


<style scoped>

/* ============================================================
   COLOR SYSTEM
   Same design language as Project.vue
============================================================ */

.product-management-page {

    --color-white: #ffffff;
    --color-light-bg: #f7f9fb;
    --color-heading: #162536;
    --color-text: #4e5d69;
    --color-text-light: #687786;

    --color-primary: #1b5e8c;
    --color-primary-light: #edf5fc;

    --color-accent: #c58a24;

    --color-dark: #0b1726;

    --color-border: #e1e7ed;

    --color-surface-soft: #f3f6f9;

    --color-shadow:
        0 4px 18px rgba(15, 23, 42, 0.06);

    --color-shadow-heavy:
        0 12px 35px rgba(15, 23, 42, 0.12);

    color: var(--color-text);

}


/* ============================================================
   PAGE HEADER
============================================================ */

.page-header {

    padding-top: 5px;

}


.page-eyebrow {

    color: var(--color-accent);

    font-size: 11px;

    font-weight: 700;

    letter-spacing: 1.5px;

    margin-bottom: 5px;

}


.page-title {

    color: var(--color-heading);

    font-size: 27px;

    font-weight: 700;

    letter-spacing: -0.3px;

}


.page-subtitle {

    color: var(--color-text-light);

    font-size: 14px;

}


/* ============================================================
   ADD PRODUCT BUTTON
============================================================ */

.add-product-btn {

    background:
        var(--color-primary);

    border-color:
        var(--color-primary);

    border-radius: 8px;

    padding: 10px 18px;

    font-size: 14px;

    font-weight: 600;

    box-shadow:
        0 4px 12px rgba(27, 94, 140, 0.18);

    transition:
        all 0.25s ease;

}


.add-product-btn:hover {

    background:
        var(--color-heading);

    border-color:
        var(--color-heading);

    transform:
        translateY(-2px);

    box-shadow:
        0 7px 18px rgba(22, 37, 54, 0.18);

}


/* ============================================================
   COMMON CARD
============================================================ */

.admin-card {

    border:
        1px solid var(--color-border);

    border-radius: 12px;

    background:
        var(--color-white);

    overflow: hidden;

}


/* ============================================================
   FILTER CARD
============================================================ */

.filter-card {

    background:
        var(--color-white);

}


.filter-top {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

}


.filter-title-wrapper {

    display: flex;

    align-items: center;

    gap: 13px;

}


.filter-icon {

    width: 42px;

    height: 42px;

    border-radius: 9px;

    display: flex;

    align-items: center;

    justify-content: center;

    background:
        var(--color-primary-light);

    color:
        var(--color-primary);

    font-size: 17px;

}


.filter-title {

    color:
        var(--color-heading);

    font-size: 16px;

    font-weight: 700;

}


.filter-description {

    color:
        var(--color-text-light);

    font-size: 12px;

    margin-top: 3px;

}


/* ============================================================
   RESET FILTER
============================================================ */

.reset-filter-btn {

    color:
        var(--color-primary);

    background:
        var(--color-primary-light);

    border:
        1px solid transparent;

    border-radius: 7px;

    font-size: 12px;

    font-weight: 600;

    padding: 7px 11px;

    transition:
        all 0.2s ease;

}


.reset-filter-btn:hover {

    color:
        var(--color-accent);

    background:
        rgba(197, 138, 36, 0.09);

    border-color:
        rgba(197, 138, 36, 0.25);

}


/* ============================================================
   FILTER LABEL
============================================================ */

.filter-label {

    display: block;

    color:
        var(--color-heading);

    font-size: 12px;

    font-weight: 650;

    margin-bottom: 6px;

}


.filter-label i {

    color:
        var(--color-primary);

}


/* ============================================================
   FILTER SELECT
============================================================ */

.filter-select {

    height: 44px;

    border:
        1px solid var(--color-border);

    border-radius: 8px;

    color:
        var(--color-heading);

    font-size: 13px;

    background-color:
        var(--color-white);

    cursor: pointer;

    transition:
        all 0.2s ease;

}


.filter-select:hover {

    border-color:
        #cbd6df;

}


.filter-select:focus {

    border-color:
        var(--color-primary);

    box-shadow:
        0 0 0 3px
        rgba(27, 94, 140, 0.09);

}


.filter-select:disabled {

    background-color:
        var(--color-surface-soft);

    color:
        #9aa5ae;

    cursor:
        not-allowed;

}


/* ============================================================
   FILTER SUMMARY
============================================================ */

.filter-summary {

    min-height: 38px;

    padding-top: 12px;

    border-top:
        1px solid var(--color-border);

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 15px;

    flex-wrap: wrap;

}


.filter-summary-left {

    display: flex;

    align-items: center;

    gap: 6px;

}


.filter-result-label {

    color:
        var(--color-text-light);

    font-size: 12px;

}


.filter-result-count {

    color:
        var(--color-primary);

    font-size: 14px;

    font-weight: 700;

}


/* ============================================================
   FILTER TAGS
============================================================ */

.active-filter-tags {

    display: flex;

    align-items: center;

    gap: 7px;

    flex-wrap: wrap;

}


.filter-tag {

    display: inline-flex;

    align-items: center;

    gap: 5px;

    background:
        var(--color-primary-light);

    color:
        var(--color-primary);

    border:
        1px solid #dcecf8;

    border-radius: 20px;

    padding: 5px 8px 5px 10px;

    font-size: 11px;

    font-weight: 600;

}


.filter-tag button {

    border: 0;

    background: transparent;

    color:
        var(--color-primary);

    padding: 0;

    width: 16px;

    height: 16px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 50%;

    cursor: pointer;

}


.filter-tag button:hover {

    color:
        var(--color-accent);

    background:
        rgba(197, 138, 36, 0.12);

}


/* ============================================================
   SEARCH CARD
============================================================ */

.search-card {

    background:
        var(--color-light-bg);

}


.search-card .card-body {

    padding: 13px 15px;

}


.search-wrapper {

    position: relative;

}


.search-icon {

    position: absolute;

    left: 14px;

    top: 50%;

    transform:
        translateY(-50%);

    color:
        var(--color-primary);

    z-index: 2;

}


.search-input {

    padding-left: 40px;

    padding-right: 40px;

    height: 42px;

    border:
        1px solid var(--color-border);

    border-radius: 8px;

    font-size: 13px;

}


.search-input:focus {

    border-color:
        var(--color-primary);

    box-shadow:
        0 0 0 3px
        rgba(27, 94, 140, 0.08);

}


.search-clear {

    position: absolute;

    right: 12px;

    top: 50%;

    transform:
        translateY(-50%);

    border: 0;

    background: transparent;

    color:
        #9aa5ae;

    cursor: pointer;

}


.search-clear:hover {

    color:
        var(--color-accent);

}


/* ============================================================
   PRODUCT TABLE HEADER
============================================================ */

.product-table-header {

    padding: 16px 18px;

    display: flex;

    justify-content: space-between;

    align-items: center;

    border-bottom:
        1px solid var(--color-border);

}


.table-title {

    color:
        var(--color-heading);

    font-size: 16px;

    font-weight: 700;

}


.table-subtitle {

    color:
        var(--color-text-light);

    font-size: 12px;

}


.table-filter-indicator {

    display: flex;

    align-items: center;

    gap: 6px;

    color:
        var(--color-primary);

    background:
        var(--color-primary-light);

    padding: 6px 10px;

    border-radius: 20px;

    font-size: 11px;

    font-weight: 600;

}


/* ============================================================
   TABLE
============================================================ */

.product-table-responsive {

    min-height: 300px;

}


.admin-table {

    margin: 0;

    color:
        var(--color-text);

}


.admin-table thead th {

    background:
        var(--color-dark);

    color:
        var(--color-white);

    border: 0;

    padding: 13px 12px;

    font-size: 11px;

    font-weight: 650;

    letter-spacing: 0.2px;

    white-space: nowrap;

}


.admin-table tbody td {

    padding: 10px 12px;

    border-color:
        var(--color-border);

    font-size: 12px;

    vertical-align: middle;

}


.product-table-row {

    transition:
        background 0.2s ease;

}


.product-table-row:hover {

    background:
        var(--color-primary-light);

}


.image-column {

    width: 82px;

}


.action-column {

    width: 105px;

}


/* ============================================================
   PRODUCT IMAGE
============================================================ */

.product-table-image {

    width: 58px;

    height: 58px;

    object-fit: cover;

    border-radius: 8px;

    border:
        1px solid var(--color-border);

    background:
        var(--color-surface-soft);

    display: block;

}


.product-table-row:hover
.product-table-image {

    border-color:
        rgba(27, 94, 140, 0.35);

}


/* ============================================================
   NO IMAGE
============================================================ */

.no-product-image {

    width: 58px;

    height: 58px;

    border-radius: 8px;

    background:
        var(--color-surface-soft);

    border:
        1px solid var(--color-border);

    display: flex;

    align-items: center;

    justify-content: center;

    color:
        #9aa5ae;

    font-size: 20px;

}


/* ============================================================
   COMPANY / CATEGORY
============================================================ */

.company-cell {

    color:
        var(--color-heading);

    font-weight: 600;

    min-width: 120px;

}


.category-cell {

    color:
        var(--color-text);

    min-width: 120px;

}


/* ============================================================
   PRODUCT TYPE
============================================================ */

.product-type-badge {

    display: inline-block;

    background:
        var(--color-primary-light);

    color:
        var(--color-primary);

    border:
        1px solid #dcecf8;

    border-radius: 5px;

    padding: 5px 8px;

    font-size: 11px;

    font-weight: 600;

    white-space: nowrap;

}


/* ============================================================
   MODEL NUMBER
============================================================ */

.model-number {

    color:
        var(--color-heading);

    background:
        var(--color-surface-soft);

    border-radius: 5px;

    padding: 5px 7px;

    font-size: 11px;

    font-weight: 600;

    white-space: nowrap;

}


/* ============================================================
   PRODUCT TITLE
============================================================ */

.product-title-cell {

    color:
        var(--color-heading);

    font-weight: 600;

    min-width: 160px;

    max-width: 260px;

}


/* ============================================================
   STATUS BADGES
============================================================ */

.status-badge {

    display: inline-flex;

    align-items: center;

    gap: 5px;

    border-radius: 20px;

    padding: 5px 9px;

    font-size: 10px;

    font-weight: 650;

    white-space: nowrap;

}


.status-active {

    color:
        #257a4a;

    background:
        #edf8f1;

}


.status-inactive {

    color:
        #b23a3a;

    background:
        #fdf0f0;

}


.status-featured {

    color:
        #9a6814;

    background:
        #fff8e8;

}


.status-not-featured {

    color:
        var(--color-text-light);

    background:
        var(--color-surface-soft);

}


.status-dot {

    width: 6px;

    height: 6px;

    border-radius: 50%;

    background:
        currentColor;

}


/* ============================================================
   ACTION BUTTONS
============================================================ */

.action-buttons {

    display: flex;

    align-items: center;

    gap: 6px;

}


.admin-action-button {

    width: 34px;

    height: 34px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    border-radius: 7px;

    padding: 0;

    transition:
        all 0.2s ease;

}


.edit-button {

    background:
        #fff8e8;

    color:
        var(--color-accent);

    border:
        1px solid #f2dfb4;

}


.edit-button:hover {

    background:
        var(--color-accent);

    color:
        var(--color-white);

    border-color:
        var(--color-accent);

    transform:
        translateY(-1px);

}


.delete-button {

    background:
        #fdf0f0;

    color:
        #b23a3a;

    border:
        1px solid #f2d5d5;

}


.delete-button:hover {

    background:
        #b23a3a;

    color:
        var(--color-white);

    border-color:
        #b23a3a;

    transform:
        translateY(-1px);

}


/* ============================================================
   EMPTY
============================================================ */

.empty-table-cell {

    height: 330px;

}


.empty-container {

    display: flex;

    align-items: center;

    justify-content: center;

    flex-direction: column;

    padding: 40px 20px;

}


.empty-icon {

    width: 58px;

    height: 58px;

    border-radius: 12px;

    display: flex;

    align-items: center;

    justify-content: center;

    background:
        var(--color-primary-light);

    color:
        var(--color-primary);

    font-size: 25px;

    margin-bottom: 12px;

}


.empty-container h5 {

    color:
        var(--color-heading);

    font-size: 16px;

    font-weight: 700;

    margin-bottom: 5px;

}


.empty-container p {

    color:
        var(--color-text-light);

    font-size: 12px;

    margin-bottom: 15px;

}


.reset-empty-btn {

    color:
        var(--color-primary);

    border:
        1px solid var(--color-primary);

    background:
        var(--color-white);

    border-radius: 7px;

    font-size: 12px;

    font-weight: 600;

}


.reset-empty-btn:hover {

    background:
        var(--color-primary);

    color:
        var(--color-white);

}


/* ============================================================
   FORM
============================================================ */

.form-label {

    color:
        var(--color-heading);

    font-weight: 600;

    font-size: 13px;

    margin-bottom: 6px;

}


.form-control,
.form-select {

    border-color:
        var(--color-border);

    border-radius: 7px;

    font-size: 13px;

}


.form-control:focus,
.form-select:focus {

    border-color:
        var(--color-primary);

    box-shadow:
        0 0 0 3px
        rgba(27, 94, 140, 0.08);

}


.form-check-input {

    border-color:
        #b8c4ce;

}


.form-check-input:checked {

    background-color:
        var(--color-primary);

    border-color:
        var(--color-primary);

}


.form-check-label {

    color:
        var(--color-heading);

    font-size: 13px;

    font-weight: 600;

}


.text-danger {

    color:
        #c03939 !important;

    font-size: 13px;

}


/* ============================================================
   IMAGE PREVIEW CARD
============================================================ */

.image-preview-card {

    position: relative;

    border:
        1px solid var(--color-border);

    border-radius: 10px;

    overflow: hidden;

    background:
        var(--color-white);

    padding: 6px;

    transition:
        all 0.2s ease;

}


.image-preview-card:hover {

    border-color:
        rgba(27, 94, 140, 0.35);

    box-shadow:
        var(--color-shadow);

}


/* ============================================================
   PRODUCT PREVIEW
============================================================ */

.product-preview-image {

    width: 100%;

    height: 130px;

    object-fit: cover;

    border-radius: 7px;

    display: block;

}


/* ============================================================
   REMOVE IMAGE BUTTON
============================================================ */

.remove-image-btn {

    position: absolute;

    top: 10px;

    right: 10px;

    width: 30px;

    height: 30px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 50%;

    padding: 0;

}


/* ============================================================
   PREVIEW IMAGE NAME
============================================================ */

.preview-image-name {

    font-size: 11px;

    color:
        var(--color-text-light);

    margin-top: 6px;

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;

}


/* ============================================================
   EXISTING IMAGE CARD
============================================================ */

.existing-image-card {

    position: relative;

    border:
        1px solid var(--color-border);

    border-radius: 10px;

    overflow: hidden;

    background:
        var(--color-white);

    padding: 6px;

    transition:
        all 0.2s ease;

}


.existing-image-card:hover {

    border-color:
        rgba(27, 94, 140, 0.35);

    box-shadow:
        var(--color-shadow);

}


/* ============================================================
   EXISTING PRODUCT IMAGE
============================================================ */

.existing-product-image {

    width: 100%;

    height: 130px;

    object-fit: cover;

    border-radius: 7px;

    display: block;

}


/* ============================================================
   EXISTING IMAGE ORDER
============================================================ */

.existing-image-order {

    font-size: 11px;

    color:
        var(--color-text-light);

    padding-top: 5px;

    text-align: center;

}


/* ============================================================
   EXISTING IMAGE DELETE
============================================================ */

.remove-existing-image-btn {

    position: absolute;

    top: 10px;

    right: 10px;

    width: 30px;

    height: 30px;

    display: flex;

    align-items: center;

    justify-content: center;

    border-radius: 50%;

    padding: 0;

}


/* ============================================================
   BUTTONS
============================================================ */

.btn-primary {

    background:
        var(--color-primary);

    border-color:
        var(--color-primary);

}


.btn-primary:hover {

    background:
        var(--color-heading);

    border-color:
        var(--color-heading);

}


.btn-secondary {

    border-radius: 7px;

}


/* ============================================================
   MOBILE
============================================================ */

@media (max-width: 991px) {

    .filter-top {

        align-items: flex-start;

    }

    .product-table-header {

        padding:
            14px;

    }

}


@media (max-width: 768px) {

    .page-header {

        flex-direction: column;

        align-items: flex-start !important;

        gap: 15px;

    }


    .add-product-btn {

        width: 100%;

    }


    .filter-top {

        flex-direction: column;

        align-items: flex-start;

    }


    .reset-filter-btn {

        width: 100%;

    }


    .filter-summary {

        align-items: flex-start;

        flex-direction: column;

    }


    .product-table-header {

        flex-direction: column;

        align-items: flex-start;

        gap: 10px;

    }


    .product-table-image,
    .no-product-image {

        width: 50px;

        height: 50px;

    }


    .product-preview-image,
    .existing-product-image {

        height: 110px;

    }

}


@media (max-width: 480px) {

    .page-title {

        font-size: 23px;

    }


    .filter-title {

        font-size: 15px;

    }


    .filter-description {

        font-size: 11px;

    }


    .active-filter-tags {

        width: 100%;

    }


    .filter-tag {

        font-size: 10px;

    }


    .search-input {

        font-size: 12px;

    }

}

</style>