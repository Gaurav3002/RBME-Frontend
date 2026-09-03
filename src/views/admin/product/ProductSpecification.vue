<template>

    <div class="container-fluid product-specification-page">


        <!-- =====================================================
             HEADER
        ====================================================== -->

        <div class="page-header d-flex justify-content-between align-items-center mb-4">

            <div>

                <div class="page-eyebrow">
                    PRODUCT CONFIGURATION
                </div>

                <h3 class="page-title mb-1">
                    Product Specification Management
                </h3>

                <p class="page-subtitle mb-0">
                    Manage specifications for your products.
                </p>

            </div>


            <button
                type="button"
                class="btn btn-primary add-button"
                @click="openCreateModal"
            >

                <i class="bi bi-plus-circle me-1"></i>

                Add Specification

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
                                Filter Specifications
                            </h6>

                            <small class="filter-description">
                                Select company, category, product type and product.
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
                     FILTER ROW
                ================================================== -->

                <div class="row g-3 mt-2">


                    <!-- =================================================
                         COMPANY
                    ================================================== -->

                    <div class="col-xl-3 col-lg-3 col-md-6">

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

                    <div class="col-xl-3 col-lg-3 col-md-6">

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

                    <div class="col-xl-3 col-lg-3 col-md-6">

                        <label class="filter-label">

                            <i class="bi bi-box-seam me-1"></i>

                            Product Type

                        </label>


                        <select
                            class="form-select admin-form-control filter-select"
                            v-model="filterProductTypeId"
                            :disabled="!filterCategoryId"
                            @change="onFilterProductTypeChange"
                        >

                            <option :value="null">

                                {{
                                    filterCategoryId
                                        ? "Select Product Type"
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
                         PRODUCT
                    ================================================== -->

                    <div class="col-xl-3 col-lg-3 col-md-6">

                        <label class="filter-label">

                            <i class="bi bi-box me-1"></i>

                            Product

                        </label>


                        <select
                            class="form-select admin-form-control filter-select"
                            v-model="filterProductId"
                            :disabled="!filterProductTypeId"
                            @change="onFilterProductChange"
                        >

                            <option :value="null">

                                {{
                                    filterProductTypeId
                                        ? "All Products"
                                        : "Select Product Type First"
                                }}

                            </option>


                            <option
                                v-for="product in filterProductOptions"
                                :key="product.id"
                                :value="product.id"
                            >

                                {{ product.modelNo || "-" }}
                                -
                                {{ product.title || "-" }}

                            </option>

                        </select>

                    </div>


                    <!-- =================================================
                         SEARCH
                    ================================================== -->

                    <div class="col-xl-6 col-lg-6 col-md-6">

                        <label class="filter-label">

                            <i class="bi bi-search me-1"></i>

                            Search

                        </label>


                        <div class="search-wrapper">

                            <i class="bi bi-search search-icon"></i>


                            <input
                                type="text"
                                class="form-control admin-form-control search-input"
                                placeholder="Search product, specification name or value..."
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

                            {{ filteredSpecifications.length }}

                        </span>


                        <span>

                            Specification{{
                                filteredSpecifications.length !== 1
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


                        <!-- PRODUCT -->

                        <span
                            v-if="filterProductId"
                            class="active-filter"
                        >

                            Product:

                            <strong>
                                {{ getProductName(filterProductId) }}
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
             SPECIFICATION TABLE
        ====================================================== -->

        <div class="card admin-card shadow-sm">


            <!-- TABLE HEADER -->

            <div class="table-card-header">

                <div>

                    <h5 class="table-title mb-1">
                        Product Specifications
                    </h5>

                    <p class="table-subtitle mb-0">
                        View and manage your product specifications.
                    </p>

                </div>


                <div class="table-total">

                    <span class="table-total-label">
                        Total
                    </span>


                    <span class="table-total-number">

                        {{ filteredSpecifications.length }}

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
                            Product
                        </th>

                        <th>
                            Specification Name
                        </th>

                        <th>
                            Specification Value
                        </th>

                        <th width="150">
                            Action
                        </th>

                    </tr>

                    </thead>


                    <tbody>


                    <!-- =================================================
                         DATA
                    ================================================== -->

                    <tr
                        v-for="(specification, index) in filteredSpecifications"
                        :key="specification.id"
                    >


                        <!-- NUMBER -->

                        <td>

                            <span class="row-number">

                                {{ index + 1 }}

                            </span>

                        </td>


                        <!-- PRODUCT -->

                        <td>

                            <div class="product-cell">

                                <div class="product-icon">

                                    <i class="bi bi-box-seam"></i>

                                </div>


                                <div>

                                    <strong class="product-name">

                                        {{
                                            specification.productName ||
                                            getProductName(specification.productId)
                                        }}

                                    </strong>


                                    <small
                                        v-if="
                                            getProductModelNo(
                                                specification.productId
                                            )
                                        "
                                        class="product-model"
                                    >

                                        {{
                                            getProductModelNo(
                                                specification.productId
                                            )
                                        }}

                                    </small>

                                </div>

                            </div>

                        </td>


                        <!-- SPECIFICATION NAME -->

                        <td>

                            <span class="specification-name">

                                {{
                                    specification.specificationName || "-"
                                }}

                            </span>

                        </td>


                        <!-- SPECIFICATION VALUE -->

                        <td>

                            <span class="specification-value">

                                {{
                                    specification.specificationValue || "-"
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
                                    title="Edit Specification"
                                    @click="
                                        editSpecification(
                                            specification
                                        )
                                    "
                                >

                                    <i class="bi bi-pencil"></i>

                                </button>


                                <!-- DELETE -->

                                <button
                                    type="button"
                                    class="btn admin-action-button delete-button"
                                    title="Delete Specification"
                                    @click="
                                        deleteSpecificationById(
                                            specification.id
                                        )
                                    "
                                >

                                    <i class="bi bi-trash"></i>

                                </button>

                            </div>

                        </td>

                    </tr>


                    <!-- =================================================
                         EMPTY
                    ================================================== -->

                    <tr
                        v-if="
                            filteredSpecifications.length === 0
                        "
                    >

                        <td
                            colspan="5"
                            class="empty-state"
                        >

                            <div class="empty-icon">

                                <i class="bi bi-file-earmark-text"></i>

                            </div>


                            <h6>
                                No Specification Found
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
             ADD / EDIT MODAL
        ====================================================== -->

        <BaseModal
            ref="modalRef"
            id="specificationModal"
            :title="
                editMode
                    ? 'Edit Product Specification'
                    : 'Add Product Specification'
            "
            size="lg"
            :draggable="true"
        >

            <div class="row">


                <!-- =================================================
                     PRODUCT SELECTION HEADER
                ================================================== -->

                <div class="col-12">

                    <div class="modal-section-title">

                        <i class="bi bi-diagram-3"></i>

                        <span>
                            Select Product
                        </span>

                    </div>

                </div>


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
                        @change="onFormCompanyChange"
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
                        @change="onFormCategoryChange"
                    >

                        <option :value="null">

                            {{
                                form.companyId
                                    ? "Select Category"
                                    : "Select Company First"
                            }}

                        </option>


                        <option
                            v-for="category in formCategories"
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

                <div class="col-md-6 mb-3">

                    <label class="form-label">

                        Product Type

                        <span class="text-danger">
                            *
                        </span>

                    </label>


                    <select
                        class="form-select"
                        v-model="form.productTypeId"
                        :disabled="!form.categoryId"
                        @change="onFormProductTypeChange"
                    >

                        <option :value="null">

                            {{
                                form.categoryId
                                    ? "Select Product Type"
                                    : "Select Category First"
                            }}

                        </option>


                        <option
                            v-for="productType in formProductTypeOptions"
                            :key="productType.id"
                            :value="productType.id"
                        >

                            {{ productType.productTypeName }}

                        </option>

                    </select>

                </div>


                <!-- =================================================
                     PRODUCT
                ================================================== -->

                <div class="col-md-6 mb-3">

                    <label class="form-label">

                        Product

                        <span class="text-danger">
                            *
                        </span>

                    </label>


                    <select
                        class="form-select"
                        v-model="form.productId"
                        :disabled="!form.productTypeId"
                        @change="onProductChange"
                    >

                        <option value="">

                            {{
                                form.productTypeId
                                    ? "Select Product"
                                    : "Select Product Type First"
                            }}

                        </option>


                        <option
                            v-for="product in formProductOptions"
                            :key="product.id"
                            :value="product.id"
                        >

                            {{ product.modelNo || "-" }}

                            -

                            {{ product.title || "-" }}

                        </option>

                    </select>


                    <small
                        v-if="form.productTypeId"
                        class="product-count-hint"
                    >

                        {{ formProductOptions.length }}

                        product{{
                            formProductOptions.length !== 1
                                ? "s"
                                : ""
                        }}

                        available

                    </small>

                </div>


                <!-- =================================================
                     PRODUCT INFO
                ================================================== -->

                <div
                    v-if="selectedProduct"
                    class="col-12 mb-4"
                >

                    <div class="product-info-card">


                        <!-- CARD HEADER -->

                        <div class="product-info-header">

                            <div class="product-info-icon">

                                <i class="bi bi-box-seam"></i>

                            </div>


                            <div>

                                <div class="product-info-title">

                                    Product Information

                                </div>


                                <div class="product-info-subtitle">

                                    Selected product details

                                </div>

                            </div>

                        </div>


                        <!-- ROW 1 -->

                        <div class="row mt-3">


                            <!-- COMPANY -->

                            <div class="col-md-4">

                                <div class="info-label">
                                    Company
                                </div>


                                <div class="info-value">

                                    {{
                                        selectedProduct.companyName || "-"
                                    }}

                                </div>

                            </div>


                            <!-- CATEGORY -->

                            <div class="col-md-4">

                                <div class="info-label">
                                    Category
                                </div>


                                <div class="info-value">

                                    {{
                                        selectedProduct.categoryName || "-"
                                    }}

                                </div>

                            </div>


                            <!-- PRODUCT TYPE -->

                            <div class="col-md-4">

                                <div class="info-label">
                                    Product Type
                                </div>


                                <div class="info-value">

                                    {{
                                        selectedProduct.productTypeName || "-"
                                    }}

                                </div>

                            </div>

                        </div>


                        <!-- ROW 2 -->

                        <div class="row mt-3">


                            <!-- MODEL -->

                            <div class="col-md-4">

                                <div class="info-label">
                                    Model No
                                </div>


                                <div class="info-value">

                                    {{
                                        selectedProduct.modelNo || "-"
                                    }}

                                </div>

                            </div>


                            <!-- TITLE -->

                            <div class="col-md-4">

                                <div class="info-label">
                                    Product
                                </div>


                                <div class="info-value">

                                    {{
                                        selectedProduct.title || "-"
                                    }}

                                </div>

                            </div>


                            <!-- STATUS -->

                            <div class="col-md-4">

                                <div class="info-label">
                                    Status
                                </div>


                                <div class="info-value">

                                    <span
                                        class="status-badge"
                                        :class="
                                            selectedProduct.active
                                                ? 'status-active'
                                                : 'status-inactive'
                                        "
                                    >

                                        <span class="status-dot"></span>

                                        {{
                                            selectedProduct.active
                                                ? "Active"
                                                : "Inactive"
                                        }}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                <!-- =================================================
                     SPECIFICATION NAME
                ================================================== -->

                <div class="col-12 mb-3">

                    <label class="form-label">

                        Specification Name

                        <span class="text-danger">
                            *
                        </span>

                    </label>


                    <input
                        type="text"
                        class="form-control"
                        placeholder="Example: Capacity"
                        v-model="form.specificationName"
                    >

                </div>


                <!-- =================================================
                     SPECIFICATION VALUE
                ================================================== -->

                <div class="col-12 mb-3">

                    <label class="form-label">

                        Specification Value

                        <span class="text-danger">
                            *
                        </span>

                    </label>


                    <textarea
                        class="form-control"
                        rows="3"
                        placeholder="Example: 10 Litres"
                        v-model="form.specificationValue"
                    ></textarea>

                </div>

            </div>


            <!-- =====================================================
                 FOOTER
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
                    @click="saveSpecification"
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
                                ? "Update Specification"
                                : "Save Specification"
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
    getSpecifications,
    createSpecification,
    updateSpecification,
    deleteSpecification
} from "@/api/specification.api";


import {
    getProducts
} from "@/api/product.api";


import {
    getCompanies
} from "@/api/company.api";


import {
    getCategoriesByCompany
} from "@/api/category.api";


/* =========================================================
   MASTER DATA
========================================================= */

const specifications = ref([]);

const products = ref([]);

const companies = ref([]);

const filterCategories = ref([]);

const formCategories = ref([]);

const selectedProduct = ref(null);


/* =========================================================
   SEARCH
========================================================= */

const search = ref("");


/* =========================================================
   FILTERS
========================================================= */

const filterCompanyId = ref(null);

const filterCategoryId = ref(null);

const filterProductTypeId = ref(null);

const filterProductId = ref(null);


/* =========================================================
   MODAL
========================================================= */

const editMode = ref(false);

const saving = ref(false);

const modalRef = ref(null);


/* =========================================================
   FORM
========================================================= */

const form = ref({

    id: null,

    companyId: null,

    categoryId: null,

    productTypeId: null,

    productId: "",

    specificationName: "",

    specificationValue: ""

});


/* =========================================================
   FILTER PRODUCT TYPE OPTIONS
========================================================= */

const filterProductTypeOptions = computed(() => {

    if (!filterCompanyId.value) {
        return [];
    }


    if (!filterCategoryId.value) {
        return [];
    }


    const result =
        products.value.filter(product => {

            return (

                String(product.companyId) ===
                String(filterCompanyId.value)

                &&

                String(product.categoryId) ===
                String(filterCategoryId.value)

                &&

                product.productTypeId != null

            );

        });


    const unique =
        new Map();


    result.forEach(product => {

        const typeId =
            String(product.productTypeId);


        if (!unique.has(typeId)) {

            unique.set(
                typeId,
                {

                    id:
                        product.productTypeId,

                    productTypeName:
                        product.productTypeName || "-"

                }
            );

        }

    });


    return Array.from(
        unique.values()
    );

});


/* =========================================================
   FILTER PRODUCT OPTIONS
========================================================= */

const filterProductOptions = computed(() => {

    if (!filterCompanyId.value) {
        return [];
    }


    if (!filterCategoryId.value) {
        return [];
    }


    if (!filterProductTypeId.value) {
        return [];
    }


    return products.value.filter(product => {

        return (

            String(product.companyId) ===
            String(filterCompanyId.value)

            &&

            String(product.categoryId) ===
            String(filterCategoryId.value)

            &&

            String(product.productTypeId) ===
            String(filterProductTypeId.value)

        );

    });

});


/* =========================================================
   FORM PRODUCT TYPE OPTIONS
========================================================= */

const formProductTypeOptions = computed(() => {

    if (!form.value.companyId) {
        return [];
    }


    if (!form.value.categoryId) {
        return [];
    }


    const result =
        products.value.filter(product => {

            return (

                String(product.companyId) ===
                String(form.value.companyId)

                &&

                String(product.categoryId) ===
                String(form.value.categoryId)

                &&

                product.productTypeId != null

            );

        });


    const unique =
        new Map();


    result.forEach(product => {

        const typeId =
            String(product.productTypeId);


        if (!unique.has(typeId)) {

            unique.set(
                typeId,
                {

                    id:
                        product.productTypeId,

                    productTypeName:
                        product.productTypeName || "-"

                }
            );

        }

    });


    return Array.from(
        unique.values()
    );

});


/* =========================================================
   FORM PRODUCT OPTIONS
========================================================= */

const formProductOptions = computed(() => {

    if (!form.value.companyId) {
        return [];
    }


    if (!form.value.categoryId) {
        return [];
    }


    if (!form.value.productTypeId) {
        return [];
    }


    return products.value.filter(product => {

        return (

            String(product.companyId) ===
            String(form.value.companyId)

            &&

            String(product.categoryId) ===
            String(form.value.categoryId)

            &&

            String(product.productTypeId) ===
            String(form.value.productTypeId)

            &&

            product.active !== false

        );

    });

});


/* =========================================================
   FILTERED SPECIFICATIONS
========================================================= */

const filteredSpecifications = computed(() => {

    const keyword =
        search.value
            .toLowerCase()
            .trim();


    return specifications.value.filter(
        specification => {


            const product =
                products.value.find(
                    item =>
                        String(item.id) ===
                        String(specification.productId)
                );


            /* =================================================
               COMPANY
            ================================================== */

            if (
                filterCompanyId.value &&

                String(product?.companyId) !==
                String(filterCompanyId.value)
            ) {

                return false;

            }


            /* =================================================
               CATEGORY
            ================================================== */

            if (
                filterCategoryId.value &&

                String(product?.categoryId) !==
                String(filterCategoryId.value)
            ) {

                return false;

            }


            /* =================================================
               PRODUCT TYPE
            ================================================== */

            if (
                filterProductTypeId.value &&

                String(product?.productTypeId) !==
                String(filterProductTypeId.value)
            ) {

                return false;

            }


            /* =================================================
               PRODUCT
            ================================================== */

            if (
                filterProductId.value &&

                String(specification.productId) !==
                String(filterProductId.value)
            ) {

                return false;

            }


            /* =================================================
               SEARCH
            ================================================== */

            if (!keyword) {

                return true;

            }


            const productName =
                (
                    specification.productName ||
                    product?.title ||
                    ""
                ).toLowerCase();


            const modelNo =
                (
                    product?.modelNo ||
                    ""
                ).toLowerCase();


            const specificationName =
                (
                    specification.specificationName ||
                    ""
                ).toLowerCase();


            const specificationValue =
                (
                    specification.specificationValue ||
                    ""
                ).toLowerCase();


            const companyName =
                (
                    specification.companyName ||
                    product?.companyName ||
                    ""
                ).toLowerCase();


            const categoryName =
                (
                    specification.categoryName ||
                    product?.categoryName ||
                    ""
                ).toLowerCase();


            const productTypeName =
                (
                    specification.productTypeName ||
                    product?.productTypeName ||
                    ""
                ).toLowerCase();


            return (

                productName.includes(keyword)

                ||

                modelNo.includes(keyword)

                ||

                specificationName.includes(keyword)

                ||

                specificationValue.includes(keyword)

                ||

                companyName.includes(keyword)

                ||

                categoryName.includes(keyword)

                ||

                productTypeName.includes(keyword)

            );

        }
    );

});


/* =========================================================
   ACTIVE FILTER CHECK
========================================================= */

const hasActiveFilters = computed(() => {

    return (

        filterCompanyId.value !== null

        ||

        filterCategoryId.value !== null

        ||

        filterProductTypeId.value !== null

        ||

        filterProductId.value !== null

        ||

        search.value.trim() !== ""

    );

});


/* =========================================================
   LOAD COMPANIES
========================================================= */

async function loadCompanies() {

    try {

        const response =
            await getCompanies();


        companies.value =
            Array.isArray(response.data)
                ? response.data
                : [];

    }
    catch (error) {

        console.error(
            "LOAD COMPANIES ERROR:",
            error
        );

        companies.value = [];

    }

}


/* =========================================================
   LOAD PRODUCTS
========================================================= */

async function loadProducts() {

    try {

        const response =
            await getProducts();


        products.value =
            Array.isArray(response.data)
                ? response.data
                : [];

    }
    catch (error) {

        console.error(
            "LOAD PRODUCTS ERROR:",
            error
        );

        products.value = [];

        alert(
            error.response?.data?.message ||
            "Failed to load products."
        );

    }

}


/* =========================================================
   LOAD SPECIFICATIONS
========================================================= */

async function loadSpecifications() {

    try {

        const response =
            await getSpecifications();


        specifications.value =
            Array.isArray(response.data)
                ? response.data
                : [];

    }
    catch (error) {

        console.error(
            "LOAD SPECIFICATIONS ERROR:",
            error
        );

        specifications.value = [];

        alert(
            error.response?.data?.message ||
            "Failed to load specifications."
        );

    }

}


/* =========================================================
   FILTER COMPANY CHANGE
========================================================= */

async function onFilterCompanyChange() {

    filterCategoryId.value = null;

    filterProductTypeId.value = null;

    filterProductId.value = null;

    filterCategories.value = [];


    if (!filterCompanyId.value) {

        return;

    }


    try {

        const response =
            await getCategoriesByCompany(
                filterCompanyId.value
            );


        filterCategories.value =
            Array.isArray(response.data)
                ? response.data
                : [];

    }
    catch (error) {

        console.error(
            "LOAD FILTER CATEGORIES ERROR:",
            error
        );

        filterCategories.value = [];

    }

}


/* =========================================================
   FILTER CATEGORY CHANGE
========================================================= */

function onFilterCategoryChange() {

    filterProductTypeId.value = null;

    filterProductId.value = null;

}


/* =========================================================
   FILTER PRODUCT TYPE CHANGE
========================================================= */

function onFilterProductTypeChange() {

    filterProductId.value = null;

}


/* =========================================================
   FILTER PRODUCT CHANGE
========================================================= */

function onFilterProductChange() {

    // Computed filter handles the table.

}


/* =========================================================
   RESET FILTERS
========================================================= */

function resetFilters() {

    search.value = "";

    filterCompanyId.value = null;

    filterCategoryId.value = null;

    filterProductTypeId.value = null;

    filterProductId.value = null;

    filterCategories.value = [];

}


/* =========================================================
   GET COMPANY NAME
========================================================= */

function getCompanyName(id) {

    const company =
        companies.value.find(
            company =>
                String(company.id) ===
                String(id)
        );


    return company?.name || "-";

}


/* =========================================================
   GET CATEGORY NAME
========================================================= */

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


    const product =
        products.value.find(
            product =>
                String(product.categoryId) ===
                String(id)
        );


    return product?.categoryName || "-";

}


/* =========================================================
   GET PRODUCT TYPE NAME
========================================================= */

function getProductTypeName(id) {

    const product =
        products.value.find(
            product =>
                String(product.productTypeId) ===
                String(id)
        );


    return product?.productTypeName || "-";

}


/* =========================================================
   GET PRODUCT NAME
========================================================= */

function getProductName(id) {

    const product =
        products.value.find(
            product =>
                String(product.id) ===
                String(id)
        );


    if (!product) {

        return "-";

    }


    if (product.modelNo) {

        return `${product.modelNo} - ${product.title || ""}`;

    }


    return product.title || "-";

}


/* =========================================================
   GET PRODUCT MODEL
========================================================= */

function getProductModelNo(id) {

    const product =
        products.value.find(
            product =>
                String(product.id) ===
                String(id)
        );


    return product?.modelNo || "";

}


/* =========================================================
   FORM COMPANY CHANGE
========================================================= */

async function onFormCompanyChange() {

    form.value.categoryId = null;

    form.value.productTypeId = null;

    form.value.productId = "";

    selectedProduct.value = null;

    formCategories.value = [];


    if (!form.value.companyId) {

        return;

    }


    try {

        const response =
            await getCategoriesByCompany(
                form.value.companyId
            );


        formCategories.value =
            Array.isArray(response.data)
                ? response.data
                : [];

    }
    catch (error) {

        console.error(
            "LOAD FORM CATEGORIES ERROR:",
            error
        );

        formCategories.value = [];

    }

}


/* =========================================================
   FORM CATEGORY CHANGE
========================================================= */

function onFormCategoryChange() {

    form.value.productTypeId = null;

    form.value.productId = "";

    selectedProduct.value = null;

}


/* =========================================================
   FORM PRODUCT TYPE CHANGE
========================================================= */

function onFormProductTypeChange() {

    form.value.productId = "";

    selectedProduct.value = null;

}


/* =========================================================
   PRODUCT CHANGE
========================================================= */

function onProductChange() {

    const selectedId =
        Number(form.value.productId);


    if (
        !form.value.productId ||
        Number.isNaN(selectedId)
    ) {

        selectedProduct.value = null;

        return;

    }


    const foundProduct =
        products.value.find(
            product =>
                Number(product.id) ===
                selectedId
        );


    selectedProduct.value =
        foundProduct || null;

}


/* =========================================================
   RESET FORM
========================================================= */

function resetForm() {

    form.value = {

        id: null,

        companyId: null,

        categoryId: null,

        productTypeId: null,

        productId: "",

        specificationName: "",

        specificationValue: ""

    };


    formCategories.value = [];

    selectedProduct.value = null;

}


/* =========================================================
   OPEN CREATE MODAL
========================================================= */

function openCreateModal() {

    editMode.value = false;

    resetForm();


    if (!products.value.length) {

        alert(
            "No products available. Please create a product first."
        );

        return;

    }


    modalRef.value?.show();

}


/* =========================================================
   EDIT SPECIFICATION
========================================================= */

async function editSpecification(specification) {

    editMode.value = true;


    const productId =
        Number(specification.productId);


    const product =
        products.value.find(
            item =>
                Number(item.id) ===
                productId
        );


    if (!product) {

        alert(
            "Product information could not be found."
        );

        return;

    }


    /* =================================================
       SET FORM
    ================================================== */

    form.value = {

        id:
            specification.id,

        companyId:
            product.companyId ?? null,

        categoryId:
            product.categoryId ?? null,

        productTypeId:
            product.productTypeId ?? null,

        productId:
            specification.productId
                ? Number(specification.productId)
                : "",

        specificationName:
            specification.specificationName || "",

        specificationValue:
            specification.specificationValue || ""

    };


    /* =================================================
       LOAD CATEGORIES
    ================================================== */

    formCategories.value = [];


    if (form.value.companyId) {

        try {

            const response =
                await getCategoriesByCompany(
                    form.value.companyId
                );


            formCategories.value =
                Array.isArray(response.data)
                    ? response.data
                    : [];

        }
        catch (error) {

            console.error(
                "LOAD EDIT CATEGORIES ERROR:",
                error
            );

        }

    }


    /* =================================================
       SELECT PRODUCT
    ================================================== */

    selectedProduct.value =
        product;


    /* =================================================
       OPEN
    ================================================== */

    modalRef.value?.show();

}


/* =========================================================
   SAVE SPECIFICATION
========================================================= */

async function saveSpecification() {

    if (saving.value) {

        return;

    }


    try {


        /* =================================================
           COMPANY
        ================================================== */

        if (!form.value.companyId) {

            alert(
                "Please select a company."
            );

            return;

        }


        /* =================================================
           CATEGORY
        ================================================== */

        if (!form.value.categoryId) {

            alert(
                "Please select a category."
            );

            return;

        }


        /* =================================================
           PRODUCT TYPE
        ================================================== */

        if (!form.value.productTypeId) {

            alert(
                "Please select a product type."
            );

            return;

        }


        /* =================================================
           PRODUCT
        ================================================== */

        if (!form.value.productId) {

            alert(
                "Please select a product."
            );

            return;

        }


        /* =================================================
           SPECIFICATION NAME
        ================================================== */

        if (
            !form.value.specificationName ||
            !form.value.specificationName.trim()
        ) {

            alert(
                "Specification name is required."
            );

            return;

        }


        /* =================================================
           SPECIFICATION VALUE
        ================================================== */

        if (
            !form.value.specificationValue ||
            !form.value.specificationValue.trim()
        ) {

            alert(
                "Specification value is required."
            );

            return;

        }


        /* =================================================
           PAYLOAD
        ================================================== */

        const payload = {

            productId:
                Number(form.value.productId),

            specificationName:
                form.value.specificationName.trim(),

            specificationValue:
                form.value.specificationValue.trim()

        };


        saving.value = true;


        /* =================================================
           UPDATE
        ================================================== */

        if (editMode.value) {

            await updateSpecification(
                form.value.id,
                payload
            );


            alert(
                "Specification updated successfully."
            );

        }


        /* =================================================
           CREATE
        ================================================== */

        else {

            await createSpecification(
                payload
            );


            alert(
                "Specification created successfully."
            );

        }


        /* =================================================
           RELOAD
        ================================================== */

        await loadSpecifications();


        /* =================================================
           CLOSE
        ================================================== */

        closeModal();

    }
    catch (error) {

        console.error(
            "SAVE SPECIFICATION ERROR:",
            error
        );


        alert(
            error.response?.data?.message ||
            "Failed to save specification."
        );

    }
    finally {

        saving.value = false;

    }

}


/* =========================================================
   DELETE
========================================================= */

async function deleteSpecificationById(id) {

    if (!id) {

        alert(
            "Specification ID is missing."
        );

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this specification?"
        );


    if (!confirmed) {

        return;

    }


    try {

        await deleteSpecification(id);


        alert(
            "Specification deleted successfully."
        );


        await loadSpecifications();

    }
    catch (error) {

        console.error(
            "DELETE SPECIFICATION ERROR:",
            error
        );


        alert(
            error.response?.data?.message ||
            "Failed to delete specification."
        );

    }

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal() {

    modalRef.value?.hide();

    resetForm();

    editMode.value = false;

}


/* =========================================================
   INITIAL LOAD
========================================================= */

onMounted(async () => {

    await Promise.all([

        loadCompanies(),

        loadProducts(),

        loadSpecifications()

    ]);

});

</script>


<style scoped>

/* ============================================================
   PAGE
============================================================ */

.product-specification-page {

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
   RESET FILTER
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
   PRODUCT CELL
============================================================ */

.product-cell {

    display: flex;

    align-items: center;

    gap: 9px;

}


.product-icon {

    width: 32px;

    height: 32px;

    flex-shrink: 0;

    border-radius: 7px;

    background: var(--color-primary-light);

    color: var(--color-primary);

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 13px;

}


.product-name {

    display: block;

    color: var(--color-heading);

    font-size: 13px;

    font-weight: 600;

}


.product-model {

    display: block;

    color: var(--color-text-light);

    font-size: 10px;

    margin-top: 2px;

}


/* ============================================================
   SPECIFICATION
============================================================ */

.specification-name {

    color: var(--color-heading);

    font-weight: 600;

}


.specification-value {

    color: var(--color-text);

    line-height: 1.5;

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
   MODAL SECTION
============================================================ */

.modal-section-title {

    display: flex;

    align-items: center;

    gap: 8px;

    color: var(--color-heading);

    font-size: 14px;

    font-weight: 700;

    margin-bottom: 14px;

    padding-bottom: 10px;

    border-bottom: 1px solid var(--color-border);

}


.modal-section-title i {

    color: var(--color-primary);

    font-size: 16px;

}


/* ============================================================
   FORM
============================================================ */

.form-label {

    color: var(--color-heading);

    font-size: 13px;

    font-weight: 600;

    margin-bottom: 6px;

}


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


.form-select:disabled {

    background-color: var(--color-surface-soft);

    color: var(--color-text-light);

    cursor: not-allowed;

}


textarea.form-control {

    resize: vertical;

}


.text-danger {

    font-size: 12px;

}


/* ============================================================
   PRODUCT COUNT
============================================================ */

.product-count-hint {

    display: block;

    margin-top: 5px;

    color: var(--color-text-light);

    font-size: 11px;

}


.product-count-hint::before {

    content: "•";

    color: var(--color-primary);

    margin-right: 5px;

}


/* ============================================================
   PRODUCT INFO CARD
============================================================ */

.product-info-card {

    background: var(--color-surface-soft);

    border: 1px solid var(--color-border);

    border-radius: 10px;

    padding: 18px;

}


.product-info-header {

    display: flex;

    align-items: center;

    gap: 10px;

    padding-bottom: 12px;

    border-bottom: 1px solid var(--color-border);

}


.product-info-icon {

    width: 34px;

    height: 34px;

    border-radius: 8px;

    background: var(--color-primary-light);

    color: var(--color-primary);

    display: flex;

    align-items: center;

    justify-content: center;

}


.product-info-title {

    color: var(--color-heading);

    font-size: 13px;

    font-weight: 700;

}


.product-info-subtitle {

    color: var(--color-text-light);

    font-size: 10px;

    margin-top: 2px;

}


/* ============================================================
   INFO LABEL
============================================================ */

.info-label {

    color: var(--color-text-light);

    font-size: 11px;

    font-weight: 500;

    margin-bottom: 4px;

}


/* ============================================================
   INFO VALUE
============================================================ */

.info-value {

    color: var(--color-heading);

    font-size: 13px;

    font-weight: 600;

    word-break: break-word;

}


/* ============================================================
   RESPONSIVE
============================================================ */

@media (max-width: 1199px) {

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


    .admin-table thead th,
    .admin-table tbody td {

        white-space: nowrap;

    }


    .product-info-card {

        padding: 13px;

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


    .active-filter-list {

        width: 100%;

    }
    

    .table-card-header {

        align-items: flex-start;

        gap: 12px;

    }

}

</style>