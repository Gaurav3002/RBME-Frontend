<template>
    <div class="container-fluid category-management-page">

        <!-- =========================================================
             PAGE HEADER
        ========================================================== -->
        <div class="page-header">
            <div class="page-header-content">

                <div class="page-title-wrap">

                    <div class="page-title-icon">
                        <i class="bi bi-tags"></i>
                    </div>

                    <div>
                        <h3 class="page-title">
                            Category Management
                        </h3>

                        <p class="page-subtitle">
                            Manage categories and their associated companies.
                        </p>
                    </div>

                </div>

                <button
                    type="button"
                    class="btn btn-primary add-category-btn"
                    @click="openCreateModal"
                >
                    <i class="bi bi-plus-circle me-2"></i>
                    Add Category
                </button>

            </div>
        </div>


        <!-- =========================================================
             SEARCH CARD
        ========================================================== -->
        <div class="card admin-card search-card">

            <div class="card-body">

                <div class="search-wrapper">

                    <div class="search-icon">
                        <i class="bi bi-search"></i>
                    </div>

                    <input
                        type="text"
                        class="form-control admin-search-input"
                        placeholder="Search category or company..."
                        v-model="search"
                    />

                    <button
                        v-if="search"
                        type="button"
                        class="search-clear"
                        @click="search = ''"
                        title="Clear search"
                    >
                        <i class="bi bi-x-circle"></i>
                    </button>

                </div>

            </div>

        </div>


        <!-- =========================================================
             TABLE CARD
        ========================================================== -->
        <div class="card admin-card category-table-card">

            <div class="card-header admin-card-header">

                <div>

                    <h5 class="admin-card-title">
                        Categories
                    </h5>

                    <span class="admin-card-count">
                        {{ filteredCategories.length }}
                        {{ filteredCategories.length === 1
                            ? 'category'
                            : 'categories'
                        }}
                    </span>

                </div>

            </div>


            <div class="card-body p-0">

                <div class="table-responsive">

                    <table class="table admin-table align-middle mb-0">

                        <!-- =================================================
                             TABLE HEADER
                        ================================================== -->
                        <thead>

                            <tr>

                                <th class="col-company">
                                    Company
                                </th>

                                <th class="col-category">
                                    Category
                                </th>

                                <th class="col-status">
                                    Status
                                </th>

                                <th class="col-action">
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <!-- =================================================
                             TABLE BODY
                        ================================================== -->
                        <tbody>

                            <tr
                                v-for="category in filteredCategories"
                                :key="category.id"
                                class="category-row"
                            >

                                <!-- COMPANY -->
                                <td>

                                    <div class="company-cell">

                                        <div class="company-icon">
                                            <i class="bi bi-building"></i>
                                        </div>

                                        <div class="company-info">

                                            <div class="company-name">
                                                {{ category.companyName || "-" }}
                                            </div>

                                        </div>

                                    </div>

                                </td>


                                <!-- CATEGORY -->
                                <td>

                                    <div class="category-cell">

                                        <div class="category-icon">
                                            <i class="bi bi-tag"></i>
                                        </div>

                                        <div class="category-name">
                                            {{ category.name || "-" }}
                                        </div>

                                    </div>

                                </td>


                                <!-- STATUS -->
                                <td>

                                    <span
                                        class="status-badge"
                                        :class="
                                            category.active
                                                ? 'status-active'
                                                : 'status-inactive'
                                        "
                                    >

                                        <span class="status-dot"></span>

                                        {{ category.active
                                            ? "Active"
                                            : "Inactive"
                                        }}

                                    </span>

                                </td>


                                <!-- ACTION -->
                                <td>

                                    <div class="action-buttons">

                                        <button
                                            type="button"
                                            class="action-btn edit-btn"
                                            @click="editCategory(category)"
                                            title="Edit Category"
                                        >
                                            <i class="bi bi-pencil"></i>
                                        </button>

                                        <button
                                            type="button"
                                            class="action-btn delete-btn"
                                            @click="
                                                deleteCategoryById(
                                                    category.id
                                                )
                                            "
                                            title="Delete Category"
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
                                v-if="
                                    !loading &&
                                    filteredCategories.length === 0
                                "
                            >

                                <td
                                    colspan="4"
                                    class="empty-table-cell"
                                >

                                    <div class="empty-state">

                                        <div class="empty-state-icon">
                                            <i class="bi bi-tags"></i>
                                        </div>

                                        <h5>
                                            No Category Found
                                        </h5>

                                        <p>
                                            {{
                                                search
                                                    ? "No categories match your search."
                                                    : "No categories have been added yet."
                                            }}
                                        </p>

                                        <button
                                            v-if="search"
                                            type="button"
                                            class="btn btn-outline-primary btn-sm"
                                            @click="search = ''"
                                        >
                                            Clear Search
                                        </button>

                                    </div>

                                </td>

                            </tr>


                            <!-- =================================================
                                 LOADING STATE
                            ================================================== -->
                            <tr v-if="loading">

                                <td
                                    colspan="4"
                                    class="empty-table-cell"
                                >

                                    <div class="loading-state">

                                        <div class="spinner-border"></div>

                                        <span>
                                            Loading categories...
                                        </span>

                                    </div>

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    </div>


    <!-- =============================================================
         ADD / EDIT CATEGORY MODAL
    ============================================================= -->
    <BaseModal
        ref="modalRef"
        id="categoryModal"
        :title="
            editMode
                ? 'Edit Category'
                : 'Add Category'
        "
        size="md"
        :draggable="true"
    >

        <div class="category-modal-content">

            <!-- =====================================================
                 CATEGORY INFORMATION
            ====================================================== -->
            <div class="form-section">

                <div class="form-section-header">

                    <div class="form-section-icon">
                        <i class="bi bi-tag"></i>
                    </div>

                    <div>

                        <h6>
                            Category Information
                        </h6>

                        <p>
                            Enter the category details.
                        </p>

                    </div>

                </div>


                <div class="row g-3">

                    <!-- COMPANY -->
                    <div class="col-12">

                        <label class="admin-form-label">

                            Company

                            <span class="required">
                                *
                            </span>

                        </label>

                        <div class="input-icon-wrapper">

                            <i class="bi bi-building"></i>

                            <select
                                class="form-select admin-form-control"
                                v-model="form.companyId"
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

                    </div>


                    <!-- CATEGORY NAME -->
                    <div class="col-12">

                        <label class="admin-form-label">

                            Category Name

                            <span class="required">
                                *
                            </span>

                        </label>

                        <div class="input-icon-wrapper">

                            <i class="bi bi-tag"></i>

                            <input
                                type="text"
                                class="form-control admin-form-control"
                                placeholder="Enter category name"
                                v-model.trim="form.name"
                            />

                        </div>

                    </div>

                </div>

            </div>


            <!-- =====================================================
                 STATUS
            ====================================================== -->
            <div class="form-section status-section">

                <div class="status-setting">

                    <div class="status-setting-icon">

                        <i class="bi bi-toggle-on"></i>

                    </div>


                    <div class="status-setting-content">

                        <strong>
                            Category Status
                        </strong>

                        <span>
                            Enable this category to make it active.
                        </span>

                    </div>


                    <label class="custom-switch">

                        <input
                            type="checkbox"
                            v-model="form.active"
                        />

                        <span class="switch-slider"></span>

                    </label>

                </div>

            </div>

        </div>


        <!-- =========================================================
             MODAL FOOTER
        ========================================================== -->
        <template #footer>

            <button
                type="button"
                class="btn btn-light modal-cancel-btn"
                data-bs-dismiss="modal"
            >
                Cancel
            </button>


            <button
                type="button"
                class="btn btn-primary modal-save-btn"
                :disabled="saving"
                @click="saveCategory"
            >

                <span
                    v-if="saving"
                    class="spinner-border spinner-border-sm me-2"
                ></span>

                <i
                    v-else
                    class="bi"
                    :class="
                        editMode
                            ? 'bi-check-circle'
                            : 'bi-plus-circle'
                    "
                ></i>

                {{
                    saving
                        ? "Saving..."
                        : editMode
                            ? "Update Category"
                            : "Save Category"
                }}

            </button>

        </template>

    </BaseModal>

</template>


<script setup>

import {
    computed,
    onMounted,
    ref
} from "vue";

import BaseModal from "@/components/admin/common/BaseModal.vue";

import {
    createCategory,
    updateCategory,
    getCategories,
    deleteCategory
} from "@/api/category.api";

import {
    getCompanies
} from "@/api/company.api";


/* ================================================================
   REFS
================================================================ */

const modalRef = ref(null);

const editMode = ref(false);

const saving = ref(false);

const loading = ref(false);

const search = ref("");

const companies = ref([]);

const categories = ref([]);


/* ================================================================
   FORM
================================================================ */

const emptyForm = () => ({

    id: null,

    companyId: null,

    name: "",

    active: true

});

const form = ref(emptyForm());


/* ================================================================
   FILTERED CATEGORIES
================================================================ */

const filteredCategories = computed(() => {

    const keyword =
        search.value
            .trim()
            .toLowerCase();

    if (!keyword) {

        return categories.value;

    }

    return categories.value.filter(category => {

        const name =
            category.name?.toLowerCase() || "";

        const companyName =
            category.companyName?.toLowerCase() || "";

        return (
            name.includes(keyword) ||
            companyName.includes(keyword)
        );

    });

});


/* ================================================================
   RESET FORM
================================================================ */

function resetForm() {

    form.value = emptyForm();

}


/* ================================================================
   OPEN CREATE MODAL
================================================================ */

function openCreateModal() {

    editMode.value = false;

    resetForm();

    modalRef.value.show();

}


/* ================================================================
   EDIT CATEGORY
================================================================ */

function editCategory(category) {

    editMode.value = true;

    form.value = {

        id: category.id,

        companyId: category.companyId,

        name: category.name || "",

        active: category.active ?? true

    };

    modalRef.value.show();

}


/* ================================================================
   SAVE CATEGORY
================================================================ */

async function saveCategory() {

    if (!form.value.companyId) {

        alert(
            "Please select company."
        );

        return;

    }


    if (!form.value.name?.trim()) {

        alert(
            "Category name is required."
        );

        return;

    }


    try {

        saving.value = true;


        const categoryData = {

            companyId:
                form.value.companyId,

            name:
                form.value.name.trim(),

            active:
                form.value.active

        };


        if (editMode.value) {

            await updateCategory(
                form.value.id,
                categoryData
            );

            alert(
                "Category updated successfully."
            );

        } else {

            await createCategory(
                categoryData
            );

            alert(
                "Category created successfully."
            );

        }


        await loadCategories();

        modalRef.value.hide();

        resetForm();

        editMode.value = false;


    } catch (error) {

        console.error(
            "Save category error:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Something went wrong while saving the category."
        );

    } finally {

        saving.value = false;

    }

}


/* ================================================================
   DELETE CATEGORY
================================================================ */

async function deleteCategoryById(id) {

    const category =
        categories.value.find(
            item => item.id === id
        );

    const categoryName =
        category?.name ||
        "this category";


    if (
        !confirm(
            `Are you sure you want to delete "${categoryName}"?`
        )
    ) {

        return;

    }


    try {

        await deleteCategory(id);

        alert(
            "Category deleted successfully."
        );

        await loadCategories();

    } catch (error) {

        console.error(
            "Delete category error:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Failed to delete category."
        );

    }

}


/* ================================================================
   LOAD COMPANIES
================================================================ */

async function loadCompanies() {

    try {

        const response =
            await getCompanies();

        companies.value =
            response.data || [];

    } catch (error) {

        console.error(
            "Load companies error:",
            error
        );

        companies.value = [];

    }

}


/* ================================================================
   LOAD CATEGORIES
================================================================ */

async function loadCategories() {

    try {

        loading.value = true;

        const response =
            await getCategories();

        categories.value =
            response.data || [];

    } catch (error) {

        console.error(
            "Load categories error:",
            error
        );

        categories.value = [];

    } finally {

        loading.value = false;

    }

}


/* ================================================================
   MOUNT
================================================================ */

onMounted(async () => {

    await Promise.all([
        loadCompanies(),
        loadCategories()
    ]);

});

</script>


<style scoped>

/* ================================================================
   PAGE
================================================================ */

.category-management-page {
    padding-bottom: 40px;
}


/* ================================================================
   PAGE HEADER
================================================================ */

.page-header {
    margin-bottom: 22px;
}

.page-header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
}

.page-title-wrap {
    display: flex;
    align-items: center;
    gap: 14px;
}

.page-title-icon {
    width: 46px;
    height: 46px;
    border-radius: 12px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(
        --color-primary-light,
        #edf5fc
    );

    color: var(
        --color-primary,
        #1b5e8c
    );

    font-size: 21px;

    flex-shrink: 0;
}

.page-title {
    margin: 0 0 4px;

    color: var(
        --color-heading,
        #162536
    );

    font-size: 24px;
    font-weight: 700;
}

.page-subtitle {
    margin: 0;

    color: var(
        --color-text-light,
        #687786
    );

    font-size: 14px;
}

.add-category-btn {
    min-height: 42px;

    padding: 9px 18px;

    border-radius: 8px;

    font-size: 14px;

    font-weight: 600;
}


/* ================================================================
   CARD
================================================================ */

.admin-card {
    border: 1px solid var(
        --color-border,
        #e1e7ed
    );

    border-radius: 12px;

    background: var(
        --color-white,
        #ffffff
    );

    box-shadow:
        0 3px 12px rgba(
            15,
            35,
            55,
            0.04
        );

    overflow: hidden;
}

.search-card {
    margin-bottom: 18px;
}

.search-card .card-body {
    padding: 14px;
}


/* ================================================================
   SEARCH
================================================================ */

.search-wrapper {
    position: relative;

    display: flex;
    align-items: center;
}

.search-icon {
    position: absolute;

    left: 14px;

    top: 50%;

    transform:
        translateY(-50%);

    color: #8492a0;

    font-size: 15px;

    z-index: 2;
}

.admin-search-input {
    min-height: 42px;

    padding-left: 40px;
    padding-right: 42px;

    border: 1px solid var(
        --color-border,
        #e1e7ed
    );

    border-radius: 8px;

    font-size: 14px;

    color: var(
        --color-text,
        #4e5d69
    );

    box-shadow: none;
}

.admin-search-input:focus {
    border-color: var(
        --color-primary,
        #1b5e8c
    );

    box-shadow:
        0 0 0 3px
        rgba(
            27,
            94,
            140,
            0.08
        );
}

.search-clear {
    position: absolute;

    right: 12px;

    border: 0;

    background: transparent;

    color: #8b98a5;

    font-size: 16px;

    padding: 3px;

    cursor: pointer;
}

.search-clear:hover {
    color: var(
        --color-primary,
        #1b5e8c
    );
}


/* ================================================================
   CARD HEADER
================================================================ */

.admin-card-header {
    min-height: 66px;

    padding: 14px 18px;

    border-bottom: 1px solid var(
        --color-border,
        #e1e7ed
    );

    background: #ffffff;

    display: flex;

    align-items: center;

    justify-content: space-between;
}

.admin-card-title {
    margin: 0 0 3px;

    color: var(
        --color-heading,
        #162536
    );

    font-size: 16px;

    font-weight: 700;
}

.admin-card-count {
    color: var(
        --color-text-light,
        #687786
    );

    font-size: 12px;
}


/* ================================================================
   TABLE
================================================================ */

.admin-table {
    width: 100%;

    margin: 0;

    color: var(
        --color-text,
        #4e5d69
    );

    font-size: 13px;
}

.admin-table thead th {
    padding: 13px 16px;

    background: var(
        --color-surface-soft,
        #f3f6f9
    );

    border-bottom: 1px solid var(
        --color-border,
        #e1e7ed
    );

    color: #566575;

    font-size: 11px;

    font-weight: 700;

    text-transform: uppercase;

    letter-spacing: 0.04em;

    white-space: nowrap;

    vertical-align: middle;
}

.admin-table tbody td {
    padding: 13px 16px;

    border-bottom: 1px solid #edf0f3;

    vertical-align: middle;
}

.category-row {
    transition:
        background 0.18s ease;
}

.category-row:hover {
    background: #fbfcfd;
}

.category-row:last-child td {
    border-bottom: 0;
}


/* ================================================================
   COLUMN WIDTHS
================================================================ */

.col-company {
    min-width: 280px;
}

.col-category {
    min-width: 280px;
}

.col-status {
    width: 150px;
}

.col-action {
    width: 130px;

    text-align: center;
}


/* ================================================================
   COMPANY CELL
================================================================ */

.company-cell {
    display: flex;

    align-items: center;

    gap: 10px;
}

.company-icon {
    width: 36px;
    height: 36px;

    border-radius: 8px;

    display: flex;

    align-items: center;

    justify-content: center;

    background: var(
        --color-primary-light,
        #edf5fc
    );

    color: var(
        --color-primary,
        #1b5e8c
    );

    font-size: 15px;

    flex-shrink: 0;
}

.company-info {
    min-width: 0;
}

.company-name {
    color: var(
        --color-heading,
        #162536
    );

    font-size: 14px;

    font-weight: 600;

    line-height: 1.35;
}


/* ================================================================
   CATEGORY CELL
================================================================ */

.category-cell {
    display: flex;

    align-items: center;

    gap: 10px;
}

.category-icon {
    width: 34px;
    height: 34px;

    border-radius: 8px;

    display: flex;

    align-items: center;

    justify-content: center;

    background: #f7f3ea;

    color: #a66c00;

    font-size: 14px;

    flex-shrink: 0;
}

.category-name {
    color: var(
        --color-heading,
        #162536
    );

    font-size: 14px;

    font-weight: 600;
}


/* ================================================================
   STATUS
================================================================ */

.status-badge {
    display: inline-flex;

    align-items: center;

    gap: 7px;

    padding: 5px 10px;

    border-radius: 20px;

    font-size: 11px;

    font-weight: 600;

    white-space: nowrap;
}

.status-dot {
    width: 6px;
    height: 6px;

    border-radius: 50%;

    background: currentColor;
}

.status-active {
    color: #23814b;

    background: #eaf7ef;
}

.status-inactive {
    color: #a94442;

    background: #fbeeee;
}


/* ================================================================
   ACTION BUTTONS
================================================================ */

.action-buttons {
    display: flex;

    align-items: center;

    justify-content: center;

    gap: 7px;
}

.action-btn {
    width: 34px;
    height: 34px;

    border: 1px solid transparent;

    border-radius: 7px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    font-size: 13px;

    cursor: pointer;

    transition:
        background 0.18s ease,
        border-color 0.18s ease,
        color 0.18s ease,
        transform 0.18s ease;
}

.action-btn:hover {
    transform:
        translateY(-1px);
}

.edit-btn {
    background: #fff8e8;

    color: #a66c00;

    border-color: #f3dfb2;
}

.edit-btn:hover {
    background: #fdf0d1;

    border-color: #e9cb8d;
}

.delete-btn {
    background: #fff0f0;

    color: #c24d4d;

    border-color: #f2d0d0;
}

.delete-btn:hover {
    background: #fbe1e1;

    border-color: #e6b5b5;
}


/* ================================================================
   EMPTY STATE
================================================================ */

.empty-table-cell {
    padding: 0 !important;
}

.empty-state {
    min-height: 260px;

    padding: 35px 20px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    text-align: center;
}

.empty-state-icon {
    width: 56px;
    height: 56px;

    margin-bottom: 12px;

    border-radius: 50%;

    background: var(
        --color-surface-soft,
        #f3f6f9
    );

    color: #9aa6b2;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 22px;
}

.empty-state h5 {
    margin: 0 0 5px;

    color: var(
        --color-heading,
        #162536
    );

    font-size: 15px;

    font-weight: 700;
}

.empty-state p {
    margin: 0 0 15px;

    color: #8a96a1;

    font-size: 13px;
}


/* ================================================================
   LOADING
================================================================ */

.loading-state {
    min-height: 220px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    gap: 12px;

    color: #7d8995;

    font-size: 13px;
}

.loading-state .spinner-border {
    width: 28px;
    height: 28px;

    border-width: 2px;

    color: var(
        --color-primary,
        #1b5e8c
    );
}


/* ================================================================
   MODAL
================================================================ */

.category-modal-content {
    padding: 2px 0;
}

.form-section {
    padding: 18px;

    margin-bottom: 14px;

    border: 1px solid var(
        --color-border,
        #e1e7ed
    );

    border-radius: 10px;

    background: #ffffff;
}

.form-section:last-child {
    margin-bottom: 0;
}

.form-section-header {
    display: flex;

    align-items: center;

    gap: 10px;

    margin-bottom: 17px;
}

.form-section-icon {
    width: 34px;
    height: 34px;

    border-radius: 8px;

    background: var(
        --color-primary-light,
        #edf5fc
    );

    color: var(
        --color-primary,
        #1b5e8c
    );

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 15px;
}

.form-section-header h6 {
    margin: 0 0 2px;

    color: var(
        --color-heading,
        #162536
    );

    font-size: 14px;

    font-weight: 700;
}

.form-section-header p {
    margin: 0;

    color: #8995a0;

    font-size: 11px;
}


/* ================================================================
   FORM
================================================================ */

.admin-form-label {
    display: block;

    margin-bottom: 7px;

    color: #4e5d69;

    font-size: 12px;

    font-weight: 600;
}

.required {
    color: #c24d4d;
}

.admin-form-control {
    min-height: 40px;

    border: 1px solid var(
        --color-border,
        #e1e7ed
    );

    border-radius: 7px;

    color: var(
        --color-text,
        #4e5d69
    );

    font-size: 13px;

    box-shadow: none;
}

.admin-form-control:focus {
    border-color: var(
        --color-primary,
        #1b5e8c
    );

    box-shadow:
        0 0 0 3px
        rgba(
            27,
            94,
            140,
            0.08
        );
}

.input-icon-wrapper {
    position: relative;
}

.input-icon-wrapper > i {
    position: absolute;

    left: 13px;

    top: 50%;

    transform:
        translateY(-50%);

    color: #8996a2;

    z-index: 2;
}

.input-icon-wrapper .admin-form-control {
    padding-left: 36px;
}


/* ================================================================
   SELECT
================================================================ */

select.admin-form-control {
    padding-left: 36px;

    cursor: pointer;
}


/* ================================================================
   STATUS SETTING
================================================================ */

.status-section {
    padding: 13px 18px;
}

.status-setting {
    display: flex;

    align-items: center;

    gap: 12px;
}

.status-setting-icon {
    width: 36px;
    height: 36px;

    border-radius: 8px;

    background: #edf8f1;

    color: #27804d;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 17px;
}

.status-setting-content {
    flex: 1;

    display: flex;

    flex-direction: column;
}

.status-setting-content strong {
    color: var(
        --color-heading,
        #162536
    );

    font-size: 13px;

    font-weight: 700;
}

.status-setting-content span {
    margin-top: 2px;

    color: #8995a0;

    font-size: 11px;
}


/* ================================================================
   CUSTOM SWITCH
================================================================ */

.custom-switch {
    position: relative;

    width: 42px;
    height: 23px;

    display: inline-block;

    flex-shrink: 0;
}

.custom-switch input {
    opacity: 0;

    width: 0;
    height: 0;
}

.switch-slider {
    position: absolute;

    inset: 0;

    border-radius: 30px;

    background: #c8d0d8;

    cursor: pointer;

    transition: 0.2s ease;
}

.switch-slider::before {
    content: "";

    position: absolute;

    width: 17px;
    height: 17px;

    left: 3px;
    top: 3px;

    border-radius: 50%;

    background: #ffffff;

    box-shadow:
        0 1px 3px
        rgba(
            0,
            0,
            0,
            0.15
        );

    transition: 0.2s ease;
}

.custom-switch
input:checked
+ .switch-slider {
    background: var(
        --color-primary,
        #1b5e8c
    );
}

.custom-switch
input:checked
+ .switch-slider::before {
    transform:
        translateX(19px);
}


/* ================================================================
   MODAL FOOTER
================================================================ */

.modal-cancel-btn {
    min-width: 90px;

    border-radius: 7px;

    font-size: 13px;

    font-weight: 600;
}

.modal-save-btn {
    min-width: 145px;

    border-radius: 7px;

    font-size: 13px;

    font-weight: 600;
}

.modal-save-btn i {
    margin-right: 6px;
}


/* ================================================================
   RESPONSIVE
================================================================ */

@media (max-width: 991.98px) {

    .page-header-content {
        align-items: flex-start;
    }

    .col-company {
        min-width: 240px;
    }

    .col-category {
        min-width: 220px;
    }

}


/* ================================================================
   TABLET / MOBILE
================================================================ */

@media (max-width: 767.98px) {

    .category-management-page {
        padding-left: 8px;
        padding-right: 8px;
    }

    .page-header-content {
        flex-direction: column;

        align-items: stretch;
    }

    .add-category-btn {
        width: 100%;
    }

    .page-title {
        font-size: 21px;
    }

    .page-subtitle {
        font-size: 12px;
    }

    .admin-card-header {
        padding: 13px;
    }

    .admin-table thead th,
    .admin-table tbody td {
        padding: 11px 12px;
    }

    .form-section {
        padding: 14px;
    }

}


/* ================================================================
   SMALL MOBILE
================================================================ */

@media (max-width: 575.98px) {

    .page-title-wrap {
        align-items: flex-start;
    }

    .page-title-icon {
        width: 40px;
        height: 40px;

        font-size: 18px;
    }

    .page-title {
        font-size: 19px;
    }

    .company-icon,
    .category-icon {
        width: 31px;
        height: 31px;

        font-size: 12px;
    }

    .company-name,
    .category-name {
        font-size: 13px;
    }

    .action-btn {
        width: 31px;
        height: 31px;
    }

    .status-badge {
        padding: 4px 8px;
    }

    .status-setting-content span {
        display: none;
    }

}

</style>