<template>
    <div class="container-fluid product-type-page">

        <!-- =====================================================
             HEADER
        ====================================================== -->
        <div class="page-header d-flex justify-content-between align-items-center mb-4">

            <div>

                <div class="page-eyebrow">
                    PRODUCT CONFIGURATION
                </div>

                <h3 class="page-title mb-1">
                    Product Type Management
                </h3>

                <p class="page-subtitle mb-0">
                    Manage product types by company and category.
                </p>

            </div>


            <button
                type="button"
                class="btn btn-primary add-button"
                @click="openCreateModal"
            >
                <i class="bi bi-plus-circle me-1"></i>
                Add Product Type
            </button>

        </div>


        <!-- =====================================================
             FILTER PANEL
        ====================================================== -->
        <div class="card admin-card filter-card shadow-sm mb-4">

            <div class="card-body">

                <!-- FILTER HEADER -->
                <div class="filter-header">

                    <div class="filter-title-wrapper">

                        <div class="filter-icon">
                            <i class="bi bi-funnel"></i>
                        </div>

                        <div>

                            <h6 class="filter-title mb-0">
                                Filter Product Types
                            </h6>

                            <small class="filter-description">
                                Select company, then category, then product type.
                            </small>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="btn reset-filter"
                        @click="resetFilters"
                        :disabled="!hasActiveFilters"
                    >
                        <i class="bi bi-arrow-counterclockwise me-1"></i>
                        Reset
                    </button>

                </div>


                <!-- =================================================
                     FILTERS
                ================================================== -->
                <div class="row g-3 mt-2">


                    <!-- =================================================
                         COMPANY
                    ================================================== -->
                    <div class="col-xl-3 col-lg-4 col-md-6">

                        <label class="filter-label">

                            <i class="bi bi-building me-1"></i>

                            Company

                        </label>


                        <select
                            class="form-select admin-form-control filter-select"
                            v-model="filterCompanyId"
                            @change="onFilterCompanyChange"
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


                    <!-- =================================================
                         CATEGORY
                    ================================================== -->
                    <div class="col-xl-3 col-lg-4 col-md-6">

                        <label class="filter-label">

                            <i class="bi bi-grid me-1"></i>

                            Category

                        </label>


                        <select
                            class="form-select admin-form-control filter-select"
                            v-model="filterCategoryId"
                            :disabled="!filterCompanyId"
                            @change="onFilterCategoryChange"
                        >

                            <option :value="null">

                                {{
                                    filterCompanyId
                                        ? "Select Category"
                                        : "Select Company First"
                                }}

                            </option>


                            <option
                                v-for="category in filterCategories"
                                :key="category.id"
                                :value="category.id"
                            >
                                {{ category.name }}
                            </option>

                        </select>

                    </div>


                    <!-- =================================================
                         PRODUCT TYPE
                    ================================================== -->
                    <div class="col-xl-3 col-lg-4 col-md-6">

                        <label class="filter-label">

                            <i class="bi bi-box-seam me-1"></i>

                            Product Type

                        </label>


                        <select
                            class="form-select admin-form-control filter-select"
                            v-model="filterProductTypeId"
                            :disabled="!filterCategoryId"
                        >

                            <option :value="null">

                                {{
                                    filterCategoryId
                                        ? "All Product Types"
                                        : "Select Category First"
                                }}

                            </option>


                            <option
                                v-for="productType in filterProductTypeOptions"
                                :key="productType.id"
                                :value="productType.id"
                            >

                                {{ productType.productTypeName }}

                            </option>

                        </select>

                    </div>


                    <!-- =================================================
                         SEARCH
                    ================================================== -->
                    <div class="col-xl-3 col-lg-12 col-md-6">

                        <label class="filter-label">

                            <i class="bi bi-search me-1"></i>

                            Search

                        </label>


                        <div class="search-wrapper">

                            <i class="bi bi-search search-icon"></i>


                            <input
                                type="text"
                                class="form-control admin-form-control search-input"
                                placeholder="Search product type..."
                                v-model="search"
                            />


                            <button
                                v-if="search"
                                type="button"
                                class="search-clear"
                                @click="search = ''"
                                title="Clear Search"
                            >

                                <i class="bi bi-x-circle"></i>

                            </button>

                        </div>

                    </div>

                </div>


                <!-- =================================================
                     FILTER SUMMARY
                ================================================== -->
                <div class="filter-summary mt-3">

                    <div class="result-count">

                        <span class="result-count-number">

                            {{ filteredProductTypes.length }}

                        </span>


                        <span>

                            Product Type{{
                                filteredProductTypes.length !== 1
                                    ? "s"
                                    : ""
                            }}
                            Found

                        </span>

                    </div>


                    <div class="active-filter-list">


                        <!-- COMPANY -->
                        <span
                            v-if="filterCompanyId"
                            class="active-filter"
                        >

                            Company:

                            <strong>
                                {{ getCompanyName(filterCompanyId) }}
                            </strong>

                        </span>


                        <!-- CATEGORY -->
                        <span
                            v-if="filterCategoryId"
                            class="active-filter"
                        >

                            Category:

                            <strong>
                                {{ getCategoryName(filterCategoryId) }}
                            </strong>

                        </span>


                        <!-- PRODUCT TYPE -->
                        <span
                            v-if="filterProductTypeId"
                            class="active-filter"
                        >

                            Type:

                            <strong>
                                {{ getProductTypeName(filterProductTypeId) }}
                            </strong>

                        </span>


                        <!-- SEARCH -->
                        <span
                            v-if="search"
                            class="active-filter"
                        >

                            Search:

                            <strong>
                                "{{ search }}"
                            </strong>

                        </span>

                    </div>

                </div>

            </div>

        </div>


        <!-- =====================================================
             PRODUCT TYPE TABLE
        ====================================================== -->
        <div class="card admin-card shadow-sm">


            <!-- TABLE HEADER -->
            <div class="table-card-header">

                <div>

                    <h5 class="table-title mb-1">
                        Product Types
                    </h5>

                    <p class="table-subtitle mb-0">
                        View and manage your product types.
                    </p>

                </div>


                <div class="table-total">

                    <span class="table-total-label">
                        Total
                    </span>


                    <span class="table-total-number">

                        {{ filteredProductTypes.length }}

                    </span>

                </div>

            </div>


            <!-- =================================================
                 TABLE
            ================================================== -->
            <div class="card-body table-responsive">

                <table class="table admin-table table-hover align-middle">

                    <thead>

                    <tr>

                        <th width="60">
                            #
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
                            Status
                        </th>

                        <th width="150">
                            Action
                        </th>

                    </tr>

                    </thead>


                    <tbody>


                    <!-- =================================================
                         PRODUCT TYPES
                    ================================================== -->
                    <tr
                        v-for="(productType, index) in filteredProductTypes"
                        :key="productType.id"
                    >


                        <!-- NUMBER -->
                        <td>

                            <span class="row-number">

                                {{ index + 1 }}

                            </span>

                        </td>


                        <!-- COMPANY -->
                        <td>

                            <div class="company-cell">

                                <div class="company-icon">

                                    <i class="bi bi-building"></i>

                                </div>


                                <span>

                                    {{ productType.companyName || "-" }}

                                </span>

                            </div>

                        </td>


                        <!-- CATEGORY -->
                        <td>

                            <span class="category-text">

                                <i class="bi bi-grid me-1"></i>

                                {{ productType.categoryName || "-" }}

                            </span>

                        </td>


                        <!-- PRODUCT TYPE -->
                        <td>

                            <span class="product-type-name">

                                {{ productType.productTypeName || "-" }}

                            </span>

                        </td>


                        <!-- STATUS -->
                        <td>

                            <span
                                class="status-badge"
                                :class="
                                    productType.active
                                        ? 'status-active'
                                        : 'status-inactive'
                                "
                            >

                                <span class="status-dot"></span>


                                {{
                                    productType.active
                                        ? "Active"
                                        : "Inactive"
                                }}

                            </span>

                        </td>


                        <!-- ACTION -->
                        <td>

                            <div class="action-buttons">


                                <!-- EDIT -->
                                <button
                                    type="button"
                                    class="btn admin-action-button edit-button"
                                    @click="editProductType(productType)"
                                    title="Edit Product Type"
                                >

                                    <i class="bi bi-pencil"></i>

                                </button>


                                <!-- DELETE -->
                                <button
                                    type="button"
                                    class="btn admin-action-button delete-button"
                                    @click="
                                        deleteProductTypeById(
                                            productType.id
                                        )
                                    "
                                    title="Delete Product Type"
                                >

                                    <i class="bi bi-trash"></i>

                                </button>

                            </div>

                        </td>

                    </tr>


                    <!-- =================================================
                         EMPTY STATE
                    ================================================== -->
                    <tr
                        v-if="filteredProductTypes.length === 0"
                    >

                        <td
                            colspan="6"
                            class="empty-state"
                        >

                            <div class="empty-icon">

                                <i class="bi bi-box-seam"></i>

                            </div>


                            <h6>
                                No Product Type Found
                            </h6>


                            <p>
                                Try changing your filters or search keyword.
                            </p>


                            <button
                                type="button"
                                class="btn btn-outline-primary btn-sm"
                                @click="resetFilters"
                            >

                                <i
                                    class="bi bi-arrow-counterclockwise me-1"
                                ></i>

                                Clear Filters

                            </button>

                        </td>

                    </tr>

                    </tbody>

                </table>

            </div>

        </div>


        <!-- =====================================================
             PRODUCT TYPE MODAL
        ====================================================== -->
        <BaseModal
            ref="modalRef"
            id="productTypeModal"
            :title="
                editMode
                    ? 'Edit Product Type'
                    : 'Add Product Type'
            "
            size="md"
            :draggable="true"
        >

            <div class="row">


                <!-- =================================================
                     COMPANY
                ================================================== -->
                <div class="col-md-6 mb-3">

                    <label class="form-label">

                        Company

                        <span class="text-danger">
                            *
                        </span>

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


                <!-- =================================================
                     CATEGORY
                ================================================== -->
                <div class="col-md-6 mb-3">

                    <label class="form-label">

                        Category

                        <span class="text-danger">
                            *
                        </span>

                    </label>


                    <select
                        class="form-select"
                        v-model="form.categoryId"
                        :disabled="!form.companyId"
                    >

                        <option :value="null">

                            {{
                                form.companyId
                                    ? "Select Category"
                                    : "Select Company First"
                            }}

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


                <!-- =================================================
                     PRODUCT TYPE NAME
                ================================================== -->
                <div class="col-md-6 mb-3">

                    <label class="form-label">

                        Product Type

                        <span class="text-danger">
                            *
                        </span>

                    </label>


                    <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Product Type"
                        v-model="form.name"
                    >

                </div>


                <!-- =================================================
                     STATUS
                ================================================== -->
                <div
                    class="col-md-6 d-flex align-items-center mb-3"
                >

                    <div class="form-check">

                        <input
                            class="form-check-input"
                            type="checkbox"
                            id="productTypeActive"
                            v-model="form.active"
                        >


                        <label
                            class="form-check-label"
                            for="productTypeActive"
                        >

                            Active

                        </label>

                    </div>

                </div>

            </div>


            <!-- =================================================
                 MODAL FOOTER
            ================================================== -->
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
                    @click="saveProductType"
                    :disabled="saving"
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
                                ? "Update Product Type"
                                : "Save Product Type"
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


import BaseModal
    from "@/components/admin/common/BaseModal.vue";


import {
    createProductType,
    updateProductType,
    getProductTypes,
    deleteProductType
} from "@/api/productType.api";


import {
    getCompanies
} from "@/api/company.api";


import {
    getCategoriesByCompany
} from "@/api/category.api";


// ============================================================
// MASTER DATA
// ============================================================

const companies = ref([]);

const categories = ref([]);

const productTypes = ref([]);

const filterCategories = ref([]);

const search = ref("");


// ============================================================
// FILTER VALUES
// ============================================================

const filterCompanyId = ref(null);

const filterCategoryId = ref(null);

const filterProductTypeId = ref(null);


// ============================================================
// MODAL
// ============================================================

const editMode = ref(false);

const saving = ref(false);

const modalRef = ref(null);


// ============================================================
// FORM
// ============================================================

function getEmptyForm() {

    return {

        id: null,

        companyId: null,

        categoryId: null,

        name: "",

        active: true

    };

}


const form = ref(
    getEmptyForm()
);


// ============================================================
// FILTER PRODUCT TYPE OPTIONS
//
// IMPORTANT:
//
// Product Type dropdown only gets populated after:
//
// Company selected
//       ↓
// Category selected
//       ↓
// Product Types loaded
//
// ============================================================

const filterProductTypeOptions = computed(() => {

    // No company
    if (!filterCompanyId.value) {

        return [];

    }


    // No category
    if (!filterCategoryId.value) {

        return [];

    }


    // Filter by company + category
    const result =
        productTypes.value.filter(
            productType => {

                return (

                    String(productType.companyId) ===
                    String(filterCompanyId.value)

                    &&

                    String(productType.categoryId) ===
                    String(filterCategoryId.value)

                );

            }
        );


    // Remove duplicate IDs
    const unique =
        new Map();


    result.forEach(productType => {

        const key =
            String(productType.id);


        if (!unique.has(key)) {

            unique.set(
                key,
                productType
            );

        }

    });


    return Array.from(
        unique.values()
    );

});


// ============================================================
// FILTERED PRODUCT TYPES
// ============================================================

const filteredProductTypes = computed(() => {

    const keyword =
        search.value
            .toLowerCase()
            .trim();


    return productTypes.value.filter(
        productType => {


            // ------------------------------------------------
            // COMPANY
            // ------------------------------------------------

            if (
                filterCompanyId.value &&

                String(productType.companyId) !==
                String(filterCompanyId.value)
            ) {

                return false;

            }


            // ------------------------------------------------
            // CATEGORY
            // ------------------------------------------------

            if (
                filterCategoryId.value &&

                String(productType.categoryId) !==
                String(filterCategoryId.value)
            ) {

                return false;

            }


            // ------------------------------------------------
            // PRODUCT TYPE
            // ------------------------------------------------

            if (
                filterProductTypeId.value &&

                String(productType.id) !==
                String(filterProductTypeId.value)
            ) {

                return false;

            }


            // ------------------------------------------------
            // SEARCH
            // ------------------------------------------------

            if (!keyword) {

                return true;

            }


            return (

                (productType.productTypeName || "")
                    .toLowerCase()
                    .includes(keyword)

                ||

                (productType.companyName || "")
                    .toLowerCase()
                    .includes(keyword)

                ||

                (productType.categoryName || "")
                    .toLowerCase()
                    .includes(keyword)

            );

        }
    );

});


// ============================================================
// ACTIVE FILTER CHECK
// ============================================================

const hasActiveFilters = computed(() => {

    return (

        filterCompanyId.value !== null

        ||

        filterCategoryId.value !== null

        ||

        filterProductTypeId.value !== null

        ||

        search.value.trim() !== ""

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

    }
    catch (error) {

        console.error(
            "LOAD COMPANIES ERROR:",
            error
        );

        companies.value = [];

    }

}


// ============================================================
// LOAD PRODUCT TYPES
// ============================================================

async function loadProductTypes() {

    try {

        const response =
            await getProductTypes();


        productTypes.value =
            response.data || [];

    }
    catch (error) {

        console.error(
            "LOAD PRODUCT TYPES ERROR:",
            error
        );

        productTypes.value = [];

    }

}


// ============================================================
// FILTER COMPANY CHANGE
//
// Company
//   ↓
// Category API
//   ↓
// Product Type reset
// ============================================================

async function onFilterCompanyChange() {

    // Reset category
    filterCategoryId.value = null;


    // Reset product type
    filterProductTypeId.value = null;


    // Clear previous categories
    filterCategories.value = [];


    // No company selected
    if (!filterCompanyId.value) {

        return;

    }


    try {

        const response =
            await getCategoriesByCompany(
                filterCompanyId.value
            );


        filterCategories.value =
            response.data || [];

    }
    catch (error) {

        console.error(
            "LOAD FILTER CATEGORIES ERROR:",
            error
        );

        filterCategories.value = [];

    }

}


// ============================================================
// FILTER CATEGORY CHANGE
//
// Category
//    ↓
// Product Type options computed automatically
// ============================================================

function onFilterCategoryChange() {

    // Always reset previously selected product type
    filterProductTypeId.value = null;

}


// ============================================================
// RESET FILTERS
// ============================================================

function resetFilters() {

    search.value = "";

    filterCompanyId.value = null;

    filterCategoryId.value = null;

    filterProductTypeId.value = null;

    filterCategories.value = [];

}


// ============================================================
// GET COMPANY NAME
// ============================================================

function getCompanyName(id) {

    const company =
        companies.value.find(
            company =>

                String(company.id) ===
                String(id)
        );


    return company?.name || "-";

}


// ============================================================
// GET CATEGORY NAME
// ============================================================

function getCategoryName(id) {

    const category =
        filterCategories.value.find(
            category =>

                String(category.id) ===
                String(id)
        );


    if (category) {

        return category.name;

    }


    const productType =
        productTypes.value.find(
            productType =>

                String(productType.categoryId) ===
                String(id)
        );


    return productType?.categoryName || "-";

}


// ============================================================
// GET PRODUCT TYPE NAME
// ============================================================

function getProductTypeName(id) {

    const productType =
        productTypes.value.find(
            productType =>

                String(productType.id) ===
                String(id)
        );


    return productType?.productTypeName || "-";

}


// ============================================================
// MODAL COMPANY CHANGE
// ============================================================

async function onCompanyChange() {

    // Reset category
    form.value.categoryId = null;


    // Clear categories
    categories.value = [];


    // No company
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

    }
    catch (error) {

        console.error(
            "LOAD CATEGORIES ERROR:",
            error
        );

        categories.value = [];

    }

}


// ============================================================
// OPEN CREATE MODAL
// ============================================================

function openCreateModal() {

    editMode.value = false;


    form.value =
        getEmptyForm();


    categories.value = [];


    modalRef.value?.show();

}


// ============================================================
// EDIT PRODUCT TYPE
// ============================================================

async function editProductType(productType) {

    try {

        editMode.value = true;


        form.value = {

            id:
                productType.id,

            companyId:
                productType.companyId,

            categoryId:
                null,

            name:
                productType.productTypeName || "",

            active:
                productType.active ?? true

        };


        // Load categories for company
        const response =
            await getCategoriesByCompany(
                productType.companyId
            );


        categories.value =
            response.data || [];


        // Set category after categories load
        form.value.categoryId =
            productType.categoryId;


        modalRef.value?.show();

    }
    catch (error) {

        console.error(
            "EDIT PRODUCT TYPE ERROR:",
            error
        );


        alert(
            error.response?.data?.message ||
            "Failed to load product type."
        );

    }

}


// ============================================================
// SAVE PRODUCT TYPE
// ============================================================

async function saveProductType() {

    if (saving.value) {

        return;

    }


    try {

        // ----------------------------------------------------
        // COMPANY VALIDATION
        // ----------------------------------------------------

        if (!form.value.companyId) {

            alert(
                "Please select company."
            );

            return;

        }


        // ----------------------------------------------------
        // CATEGORY VALIDATION
        // ----------------------------------------------------

        if (!form.value.categoryId) {

            alert(
                "Please select category."
            );

            return;

        }


        // ----------------------------------------------------
        // PRODUCT TYPE VALIDATION
        // ----------------------------------------------------

        if (
            !form.value.name ||
            !form.value.name.trim()
        ) {

            alert(
                "Product Type name is required."
            );

            return;

        }


        saving.value = true;


        // ----------------------------------------------------
        // UPDATE
        // ----------------------------------------------------

        if (editMode.value) {

            await updateProductType(
                form.value.id,
                form.value
            );


            alert(
                "Product Type updated successfully."
            );

        }


        // ----------------------------------------------------
        // CREATE
        // ----------------------------------------------------

        else {

            await createProductType(
                form.value
            );


            alert(
                "Product Type created successfully."
            );

        }


        // Reload table
        await loadProductTypes();


        // Close modal
        modalRef.value?.hide();


        // Reset form
        resetForm();

    }
    catch (error) {

        console.error(
            "SAVE PRODUCT TYPE ERROR:",
            error
        );


        alert(
            error.response?.data?.message ||
            "Failed to save Product Type."
        );

    }
    finally {

        saving.value = false;

    }

}


// ============================================================
// DELETE PRODUCT TYPE
// ============================================================

async function deleteProductTypeById(id) {

    if (
        !confirm(
            "Delete this Product Type?"
        )
    ) {

        return;

    }


    try {

        await deleteProductType(id);


        alert(
            "Product Type deleted successfully."
        );


        await loadProductTypes();

    }
    catch (error) {

        console.error(
            "DELETE PRODUCT TYPE ERROR:",
            error
        );


        alert(
            error.response?.data?.message ||
            "Failed to delete Product Type."
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

    form.value =
        getEmptyForm();


    categories.value = [];


    editMode.value = false;

}


// ============================================================
// MOUNT
// ============================================================

onMounted(async () => {

    await loadCompanies();

    await loadProductTypes();

});

</script>


<style scoped>

/* ============================================================
   PAGE
============================================================ */

.product-type-page {

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


    color: var(--color-text);

}


/* ============================================================
   HEADER
============================================================ */

.page-header {

    padding-top: 4px;

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

    font-size: 26px;

    font-weight: 700;

    letter-spacing: -0.3px;

}


.page-subtitle {

    color: var(--color-text-light);

    font-size: 14px;

}


/* ============================================================
   ADD BUTTON
============================================================ */

.add-button {

    background: var(--color-primary);

    border-color: var(--color-primary);

    padding: 10px 18px;

    border-radius: 8px;

    font-size: 14px;

    font-weight: 600;

    transition: all 0.2s ease;

}


.add-button:hover {

    background: var(--color-dark);

    border-color: var(--color-dark);

    transform: translateY(-1px);

}


/* ============================================================
   CARD
============================================================ */

.admin-card {

    border: 1px solid var(--color-border);

    border-radius: 12px;

    background: var(--color-white);

    overflow: hidden;

}


/* ============================================================
   FILTER CARD
============================================================ */

.filter-card {

    background: var(--color-white);

}


.filter-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 15px;

}


.filter-title-wrapper {

    display: flex;

    align-items: center;

    gap: 12px;

}


.filter-icon {

    width: 38px;

    height: 38px;

    border-radius: 9px;

    background: var(--color-primary-light);

    color: var(--color-primary);

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 17px;

}


.filter-title {

    color: var(--color-heading);

    font-size: 15px;

    font-weight: 700;

}


.filter-description {

    color: var(--color-text-light);

    font-size: 12px;

}


/* ============================================================
   RESET
============================================================ */

.reset-filter {

    border: 1px solid var(--color-border);

    color: var(--color-text);

    background: var(--color-white);

    font-size: 12px;

    font-weight: 600;

    padding: 7px 12px;

    border-radius: 7px;

    transition: all 0.2s ease;

}


.reset-filter:hover:not(:disabled) {

    color: var(--color-primary);

    border-color: var(--color-primary);

    background: var(--color-primary-light);

}


.reset-filter:disabled {

    opacity: 0.45;

    cursor: not-allowed;

}


/* ============================================================
   FILTER LABEL
============================================================ */

.filter-label {

    display: block;

    color: var(--color-heading);

    font-size: 12px;

    font-weight: 700;

    margin-bottom: 6px;

}


.filter-label i {

    color: var(--color-primary);

}


/* ============================================================
   FORM CONTROL
============================================================ */

.admin-form-control,
.filter-select {

    min-height: 42px;

    border: 1px solid var(--color-border);

    border-radius: 7px;

    color: var(--color-heading);

    background-color: var(--color-white);

    font-size: 13px;

    transition: all 0.2s ease;

}


.admin-form-control:focus,
.filter-select:focus {

    border-color: var(--color-primary);

    box-shadow:
        0 0 0 3px
        rgba(27, 94, 140, 0.08);

}


.filter-select {

    cursor: pointer;

}


/* ============================================================
   DISABLED FILTER
============================================================ */

.filter-select:disabled {

    background-color: var(--color-surface-soft);

    color: var(--color-text-light);

    cursor: not-allowed;

    opacity: 0.75;

}


/* ============================================================
   SEARCH
============================================================ */

.search-wrapper {

    position: relative;

}


.search-icon {

    position: absolute;

    left: 13px;

    top: 50%;

    transform: translateY(-50%);

    color: var(--color-text-light);

    font-size: 13px;

    z-index: 2;

}


.search-input {

    padding-left: 37px;

    padding-right: 38px;

}


.search-clear {

    position: absolute;

    right: 10px;

    top: 50%;

    transform: translateY(-50%);

    border: 0;

    background: transparent;

    color: var(--color-text-light);

    padding: 3px;

    cursor: pointer;

}


.search-clear:hover {

    color: var(--color-primary);

}


/* ============================================================
   FILTER SUMMARY
============================================================ */

.filter-summary {

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 15px;

    padding-top: 13px;

    border-top: 1px solid var(--color-border);

}


.result-count {

    display: flex;

    align-items: center;

    gap: 7px;

    color: var(--color-text-light);

    font-size: 12px;

}


.result-count-number {

    min-width: 26px;

    height: 26px;

    padding: 0 7px;

    border-radius: 6px;

    background: var(--color-primary-light);

    color: var(--color-primary);

    display: inline-flex;

    align-items: center;

    justify-content: center;

    font-weight: 700;

}


.active-filter-list {

    display: flex;

    align-items: center;

    justify-content: flex-end;

    gap: 7px;

    flex-wrap: wrap;

}


.active-filter {

    padding: 5px 9px;

    background: var(--color-surface-soft);

    border: 1px solid var(--color-border);

    border-radius: 6px;

    color: var(--color-text-light);

    font-size: 11px;

}


.active-filter strong {

    color: var(--color-heading);

}


/* ============================================================
   TABLE HEADER
============================================================ */

.table-card-header {

    padding: 18px 20px;

    display: flex;

    justify-content: space-between;

    align-items: center;

    border-bottom: 1px solid var(--color-border);

    background: var(--color-white);

}


.table-title {

    color: var(--color-heading);

    font-size: 16px;

    font-weight: 700;

}


.table-subtitle {

    color: var(--color-text-light);

    font-size: 12px;

}


.table-total {

    display: flex;

    align-items: center;

    gap: 8px;

}


.table-total-label {

    color: var(--color-text-light);

    font-size: 12px;

}


.table-total-number {

    min-width: 30px;

    height: 28px;

    padding: 0 8px;

    border-radius: 6px;

    background: var(--color-primary-light);

    color: var(--color-primary);

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 12px;

    font-weight: 700;

}


/* ============================================================
   TABLE
============================================================ */

.table-responsive {

    min-height: 300px;

}


.admin-table {

    margin-bottom: 0;

}


.admin-table thead th {

    background: var(--color-dark);

    color: var(--color-white);

    border: 0;

    padding: 13px 12px;

    font-size: 11px;

    font-weight: 700;

    letter-spacing: 0.3px;

    white-space: nowrap;

}


.admin-table tbody td {

    padding: 12px;

    border-color: var(--color-border);

    color: var(--color-text);

    font-size: 13px;

}


.admin-table tbody tr {

    transition: background 0.18s ease;

}


.admin-table tbody tr:hover {

    background: var(--color-primary-light);

}


/* ============================================================
   ROW NUMBER
============================================================ */

.row-number {

    width: 27px;

    height: 27px;

    border-radius: 6px;

    background: var(--color-surface-soft);

    color: var(--color-text-light);

    display: inline-flex;

    align-items: center;

    justify-content: center;

    font-size: 11px;

    font-weight: 600;

}


/* ============================================================
   COMPANY CELL
============================================================ */

.company-cell {

    display: flex;

    align-items: center;

    gap: 9px;

    color: var(--color-heading);

    font-weight: 600;

}


.company-icon {

    width: 30px;

    height: 30px;

    flex-shrink: 0;

    border-radius: 7px;

    background: var(--color-primary-light);

    color: var(--color-primary);

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 13px;

}


/* ============================================================
   CATEGORY
============================================================ */

.category-text {

    color: var(--color-text);

    font-size: 13px;

}


.category-text i {

    color: var(--color-primary);

}


/* ============================================================
   PRODUCT TYPE
============================================================ */

.product-type-name {

    color: var(--color-heading);

    font-weight: 600;

}


/* ============================================================
   STATUS
============================================================ */

.status-badge {

    display: inline-flex;

    align-items: center;

    gap: 6px;

    padding: 6px 10px;

    border-radius: 20px;

    font-size: 11px;

    font-weight: 600;

}


.status-dot {

    width: 6px;

    height: 6px;

    border-radius: 50%;

    display: inline-block;

}


.status-active {

    color: #237a45;

    background: #eef8f1;

}


.status-active .status-dot {

    background: #2f9e5b;

}


.status-inactive {

    color: #b23a3a;

    background: #fff0f0;

}


.status-inactive .status-dot {

    background: #dc4c4c;

}


/* ============================================================
   ACTION BUTTONS
============================================================ */

.action-buttons {

    display: flex;

    align-items: center;

    gap: 7px;

}


.admin-action-button {

    width: 34px;

    height: 34px;

    padding: 0;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    border-radius: 7px;

    border: 1px solid transparent;

    transition: all 0.2s ease;

}


.edit-button {

    color: var(--color-accent);

    background: #fff8eb;

    border-color: #f2dfb7;

}


.edit-button:hover {

    color: var(--color-white);

    background: var(--color-accent);

    border-color: var(--color-accent);

    transform: translateY(-1px);

}


.delete-button {

    color: #c43d3d;

    background: #fff1f1;

    border-color: #f1cccc;

}


.delete-button:hover {

    color: var(--color-white);

    background: #c43d3d;

    border-color: #c43d3d;

    transform: translateY(-1px);

}


/* ============================================================
   EMPTY STATE
============================================================ */

.empty-state {

    padding: 55px 20px !important;

    text-align: center;

}


.empty-icon {

    width: 58px;

    height: 58px;

    margin: 0 auto 13px;

    border-radius: 12px;

    background: var(--color-primary-light);

    color: var(--color-primary);

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 24px;

}


.empty-state h6 {

    color: var(--color-heading);

    font-weight: 700;

    margin-bottom: 5px;

}


.empty-state p {

    color: var(--color-text-light);

    font-size: 12px;

    margin-bottom: 15px;

}


/* ============================================================
   FORM LABEL
============================================================ */

.form-label {

    color: var(--color-heading);

    font-size: 13px;

    font-weight: 600;

    margin-bottom: 6px;

}


.text-danger {

    font-size: 12px;

}


/* ============================================================
   MODAL FORM
============================================================ */

.form-control,
.form-select {

    border-color: var(--color-border);

    color: var(--color-heading);

}


.form-control:focus,
.form-select:focus {

    border-color: var(--color-primary);

    box-shadow:
        0 0 0 3px
        rgba(27, 94, 140, 0.08);

}


.form-check-input:checked {

    background-color: var(--color-primary);

    border-color: var(--color-primary);

}


.form-check-label {

    color: var(--color-text);

    font-size: 13px;

    font-weight: 500;

}


/* ============================================================
   MODAL DISABLED CATEGORY
============================================================ */

.form-select:disabled {

    background-color: var(--color-surface-soft);

    color: var(--color-text-light);

    cursor: not-allowed;

}


/* ============================================================
   RESPONSIVE
============================================================ */

@media (max-width: 991px) {

    .filter-summary {

        align-items: flex-start;

        flex-direction: column;

    }


    .active-filter-list {

        justify-content: flex-start;

    }

}


@media (max-width: 768px) {

    .page-header {

        flex-direction: column;

        align-items: flex-start !important;

        gap: 15px;

    }


    .add-button {

        width: 100%;

    }


    .filter-header {

        align-items: flex-start;

    }


    .filter-description {

        display: block;

        max-width: 260px;

    }


    .table-card-header {

        padding: 15px;

    }


    .admin-table thead th,
    .admin-table tbody td {

        white-space: nowrap;

    }

}


@media (max-width: 575px) {

    .page-title {

        font-size: 22px;

    }


    .filter-header {

        flex-direction: column;

        align-items: stretch;

    }


    .reset-filter {

        align-self: flex-start;

    }


    .filter-summary {

        gap: 10px;

    }


    .active-filter-list {

        width: 100%;

    }


    .table-card-header {

        align-items: flex-start;

        gap: 12px;

    }

}

</style>