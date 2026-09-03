<template>
    <div class="container-fluid company-management-page">

        <!-- =========================================================
             PAGE HEADER
        ========================================================== -->
        <div class="page-header">

            <div class="page-header-content">
                <div class="page-title-wrap">
                    <div class="page-title-icon">
                        <i class="bi bi-buildings"></i>
                    </div>

                    <div>
                        <h3 class="page-title">Company Management</h3>
                        <p class="page-subtitle">
                            Manage all companies and their website information.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    class="btn btn-primary add-company-btn"
                    @click="openCreateModal"
                >
                    <i class="bi bi-plus-circle me-2"></i>
                    Add Company
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
                        placeholder="Search company by name or website..."
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
        <div class="card admin-card company-table-card">

            <div class="card-header admin-card-header">

                <div>
                    <h5 class="admin-card-title">
                        Companies
                    </h5>

                    <span class="admin-card-count">
                        {{ filteredCompanies.length }}
                        {{ filteredCompanies.length === 1 ? 'company' : 'companies' }}
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
                                <th class="col-logo">
                                    Logo
                                </th>

                                <th class="col-banner">
                                    Banner
                                </th>

                                <th class="col-name">
                                    Company Name
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
                                v-for="company in filteredCompanies"
                                :key="company.id"
                                class="company-row"
                            >

                                <!-- LOGO -->
                                <td class="image-column">

                                    <div
                                        v-if="company.logo"
                                        class="image-preview"
                                        @click="openImage(company.logo)"
                                    >
                                        <img
                                            :src="getImageUrl(company.logo)"
                                            :alt="company.name + ' logo'"
                                            class="company-image"
                                        />
                                    </div>

                                    <div
                                        v-else
                                        class="image-placeholder"
                                    >
                                        <i class="bi bi-image"></i>
                                        <span>No Logo</span>
                                    </div>

                                </td>


                                <!-- BANNER -->
                                <td class="image-column">

                                    <div
                                        v-if="company.banner"
                                        class="image-preview banner-preview"
                                        @click="openImage(company.banner)"
                                    >
                                        <img
                                            :src="getImageUrl(company.banner)"
                                            :alt="company.name + ' banner'"
                                            class="company-image"
                                        />
                                    </div>

                                    <div
                                        v-else
                                        class="image-placeholder"
                                    >
                                        <i class="bi bi-card-image"></i>
                                        <span>No Banner</span>
                                    </div>

                                </td>


                                <!-- COMPANY NAME -->
                                <td>

                                    <div class="company-name-cell">

                                        <div class="company-name">
                                            {{ company.name || "-" }}
                                        </div>

                                        <div
                                            v-if="company.description"
                                            class="company-description"
                                        >
                                            {{ company.description }}
                                        </div>

                                    </div>

                                </td>

                                <!-- STATUS -->
                                <td>

                                    <span
                                        class="status-badge"
                                        :class="company.active
                                            ? 'status-active'
                                            : 'status-inactive'"
                                    >
                                        <span class="status-dot"></span>

                                        {{ company.active ? "Active" : "Inactive" }}
                                    </span>

                                </td>


                                <!-- ACTION -->
                                <td>

                                    <div class="action-buttons">

                                        <button
                                            type="button"
                                            class="action-btn edit-btn"
                                            @click="editCompany(company)"
                                            title="Edit Company"
                                        >
                                            <i class="bi bi-pencil"></i>
                                        </button>

                                        <button
                                            type="button"
                                            class="action-btn delete-btn"
                                            @click="deleteCompany(company.id)"
                                            title="Delete Company"
                                        >
                                            <i class="bi bi-trash"></i>
                                        </button>

                                    </div>

                                </td>

                            </tr>


                            <!-- =================================================
                                 EMPTY STATE
                            ================================================== -->
                            <tr v-if="!loading && filteredCompanies.length === 0">

                                <td
                                    colspan="6"
                                    class="empty-table-cell"
                                >

                                    <div class="empty-state">

                                        <div class="empty-state-icon">
                                            <i class="bi bi-buildings"></i>
                                        </div>

                                        <h5>
                                            No Company Found
                                        </h5>

                                        <p>
                                            {{
                                                search
                                                    ? "No companies match your search."
                                                    : "No companies have been added yet."
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
                                    colspan="6"
                                    class="empty-table-cell"
                                >

                                    <div class="loading-state">

                                        <div class="spinner-border">
                                        </div>

                                        <span>
                                            Loading companies...
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
         ADD / EDIT COMPANY MODAL
    ============================================================= -->
    <BaseModal
        ref="modalRef"
        id="companyModal"
        :title="editMode ? 'Edit Company' : 'Add Company'"
    >

        <div class="company-modal-content">

            <!-- =====================================================
                 COMPANY BASIC INFORMATION
            ====================================================== -->
            <div class="form-section">

                <div class="form-section-header">

                    <div class="form-section-icon">
                        <i class="bi bi-building"></i>
                    </div>

                    <div>
                        <h6>
                            Company Information
                        </h6>

                        <p>
                            Enter the basic company details.
                        </p>
                    </div>

                </div>


                <div class="row g-3">

                    <!-- COMPANY NAME -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Company Name
                            <span class="required">*</span>
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control"
                            placeholder="Enter company name"
                            v-model.trim="form.name"
                        />

                    </div>


                    <!-- WEBSITE -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Website
                        </label>

                        <div class="input-icon-wrapper">

                            <i class="bi bi-globe2"></i>

                            <input
                                type="text"
                                class="form-control admin-form-control"
                                placeholder="https://example.com"
                                v-model.trim="form.website"
                            />

                        </div>

                    </div>


                    <!-- DESCRIPTION -->
                    <div class="col-12">

                        <label class="admin-form-label">
                            Description
                        </label>

                        <textarea
                            rows="4"
                            class="form-control admin-form-control"
                            placeholder="Enter company description..."
                            v-model.trim="form.description"
                        ></textarea>

                    </div>

                </div>

            </div>


            <!-- =====================================================
                 MEDIA
            ====================================================== -->
            <div class="form-section">

                <div class="form-section-header">

                    <div class="form-section-icon">
                        <i class="bi bi-images"></i>
                    </div>

                    <div>
                        <h6>
                            Company Media
                        </h6>

                        <p>
                            Upload company logo and banner images.
                        </p>
                    </div>

                </div>


                <div class="row g-3">

                    <!-- LOGO -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Company Logo
                        </label>

                        <div class="file-upload-box">

                            <div
                                v-if="logoPreview"
                                class="upload-preview"
                            >
                                <img
                                    :src="logoPreview"
                                    alt="Logo Preview"
                                />

                                <button
                                    type="button"
                                    class="remove-preview-btn"
                                    @click="removeLogo"
                                >
                                    <i class="bi bi-x"></i>
                                </button>
                            </div>

                            <div
                                v-else
                                class="upload-placeholder"
                            >
                                <i class="bi bi-cloud-arrow-up"></i>

                                <span>
                                    Upload Logo
                                </span>

                                <small>
                                    PNG, JPG, WEBP
                                </small>
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                @change="onLogoChange"
                            />

                        </div>

                    </div>


                    <!-- BANNER -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Company Banner
                        </label>

                        <div class="file-upload-box">

                            <div
                                v-if="bannerPreview"
                                class="upload-preview banner-upload-preview"
                            >
                                <img
                                    :src="bannerPreview"
                                    alt="Banner Preview"
                                />

                                <button
                                    type="button"
                                    class="remove-preview-btn"
                                    @click="removeBanner"
                                >
                                    <i class="bi bi-x"></i>
                                </button>
                            </div>

                            <div
                                v-else
                                class="upload-placeholder"
                            >
                                <i class="bi bi-card-image"></i>

                                <span>
                                    Upload Banner
                                </span>

                                <small>
                                    PNG, JPG, WEBP
                                </small>
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                @change="onBannerChange"
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
                            Company Status
                        </strong>

                        <span>
                            Enable this company to make it active.
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
                @click="saveCompany"
            >

                <span
                    v-if="saving"
                    class="spinner-border spinner-border-sm me-2"
                ></span>

                <i
                    v-else
                    class="bi"
                    :class="editMode
                        ? 'bi-check-circle'
                        : 'bi-plus-circle'"
                ></i>

                {{ saving
                    ? "Saving..."
                    : editMode
                        ? "Update Company"
                        : "Save Company"
                }}

            </button>

        </template>

    </BaseModal>


    <!-- =============================================================
         IMAGE PREVIEW MODAL
    ============================================================= -->
    <div
        v-if="previewImage"
        class="image-lightbox"
        @click.self="previewImage = null"
    >

        <button
            type="button"
            class="lightbox-close"
            @click="previewImage = null"
        >
            <i class="bi bi-x-lg"></i>
        </button>

        <img
            :src="previewImage"
            alt="Company image"
            class="lightbox-image"
        />

    </div>

</template>


<script setup>

import {
    computed,
    onMounted,
    ref
} from "vue";

import {
    createCompany,
    updateCompany,
    getCompanies,
    deleteCompany as deleteCompanyApi
} from "@/api/company.api";

import BaseModal from "@/components/admin/common/BaseModal.vue";


/* ================================================================
   CONFIG
================================================================ */

const API_BASE_URL = import.meta.env.VITE_IMAGE_URL;


/* ================================================================
   REFS
================================================================ */

const modalRef = ref(null);

const editMode = ref(false);

const saving = ref(false);

const loading = ref(false);

const search = ref("");

const companies = ref([]);

const previewImage = ref(null);

const logoPreview = ref("");

const bannerPreview = ref("");



/* ================================================================
   FORM
================================================================ */

const emptyForm = () => ({
    id: null,
    name: "",
    website: "",
    description: "",
    active: true,
    logo: null,
    banner: null
});

const form = ref(emptyForm());



/* ================================================================
   IMAGE URL
================================================================ */

const getImageUrl = (path) => {

    if (!path) {
        return "";
    }

    if (
        path.startsWith("http://") ||
        path.startsWith("https://")
    ) {
        return path;
    }

    return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
};



/* ================================================================
   WEBSITE URL
================================================================ */

const normalizeWebsite = (website) => {

    if (!website) {
        return "#";
    }

    if (
        website.startsWith("http://") ||
        website.startsWith("https://")
    ) {
        return website;
    }

    return `https://${website}`;
};



/* ================================================================
   FILTERED COMPANIES
================================================================ */

const filteredCompanies = computed(() => {

    const keyword = search.value
        .trim()
        .toLowerCase();

    if (!keyword) {
        return companies.value;
    }

    return companies.value.filter(company => {

        const name =
            company.name?.toLowerCase() || "";

        const website =
            company.website?.toLowerCase() || "";

        const description =
            company.description?.toLowerCase() || "";

        return (
            name.includes(keyword) ||
            website.includes(keyword) ||
            description.includes(keyword)
        );

    });

});



/* ================================================================
   RESET FORM
================================================================ */

function resetForm() {

    form.value = emptyForm();

    logoPreview.value = "";

    bannerPreview.value = "";

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
   EDIT COMPANY
================================================================ */

function editCompany(company) {

    editMode.value = true;

    form.value = {

        id: company.id,

        name: company.name || "",

        website: company.website || "",

        description: company.description || "",

        active: company.active ?? true,

        logo: null,

        banner: null

    };


    /*
     * Show existing images
     */

    logoPreview.value =
        company.logo
            ? getImageUrl(company.logo)
            : "";

    bannerPreview.value =
        company.banner
            ? getImageUrl(company.banner)
            : "";


    modalRef.value.show();

}



/* ================================================================
   LOGO CHANGE
================================================================ */

function onLogoChange(event) {

    const file = event.target.files?.[0];

    if (!file) {
        return;
    }

    form.value.logo = file;

    logoPreview.value =
        URL.createObjectURL(file);

}



/* ================================================================
   BANNER CHANGE
================================================================ */

function onBannerChange(event) {

    const file = event.target.files?.[0];

    if (!file) {
        return;
    }

    form.value.banner = file;

    bannerPreview.value =
        URL.createObjectURL(file);

}



/* ================================================================
   REMOVE LOGO
================================================================ */

function removeLogo() {

    form.value.logo = null;

    logoPreview.value = "";

}



/* ================================================================
   REMOVE BANNER
================================================================ */

function removeBanner() {

    form.value.banner = null;

    bannerPreview.value = "";

}



/* ================================================================
   OPEN IMAGE
================================================================ */

function openImage(path) {

    if (!path) {
        return;
    }

    previewImage.value =
        getImageUrl(path);

}



/* ================================================================
   DELETE COMPANY
================================================================ */

async function deleteCompany(id) {

    const company =
        companies.value.find(
            item => item.id === id
        );

    const companyName =
        company?.name || "this company";


    if (
        !confirm(
            `Are you sure you want to delete "${companyName}"?`
        )
    ) {
        return;
    }


    try {

        await deleteCompanyApi(id);

        alert(
            "Company deleted successfully."
        );

        await loadCompanies();

    } catch (error) {

        console.error(error);

        alert(
            error.response?.data?.message ||
            "Failed to delete company."
        );

    }

}



/* ================================================================
   SAVE COMPANY
================================================================ */

async function saveCompany() {

    if (!form.value.name?.trim()) {

        alert(
            "Please enter company name."
        );

        return;
    }


    try {

        saving.value = true;


        const formData = new FormData();

        formData.append(
            "name",
            form.value.name.trim()
        );

        formData.append(
            "website",
            form.value.website || ""
        );

        formData.append(
            "description",
            form.value.description || ""
        );

        formData.append(
            "active",
            String(form.value.active)
        );


        if (
            form.value.logo instanceof File
        ) {

            formData.append(
                "logo",
                form.value.logo
            );

        }


        if (
            form.value.banner instanceof File
        ) {

            formData.append(
                "banner",
                form.value.banner
            );

        }


        if (editMode.value) {

            await updateCompany(
                form.value.id,
                formData
            );

            alert(
                "Company updated successfully."
            );

        } else {

            await createCompany(
                formData
            );

            alert(
                "Company added successfully."
            );

        }


        await loadCompanies();

        modalRef.value.hide();

        resetForm();

        editMode.value = false;

    } catch (error) {

        console.error(
            "Save company error:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Something went wrong while saving the company."
        );

    } finally {

        saving.value = false;

    }

}



/* ================================================================
   LOAD COMPANIES
================================================================ */

async function loadCompanies() {

    try {

        loading.value = true;

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

    } finally {

        loading.value = false;

    }

}



/* ================================================================
   MOUNT
================================================================ */

onMounted(async () => {

    await loadCompanies();

});

</script>


<style scoped>

/* ================================================================
   PAGE
================================================================ */

.company-management-page {
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
    background: var(--color-primary-light, #edf5fc);
    color: var(--color-primary, #1b5e8c);
    font-size: 21px;
    flex-shrink: 0;
}

.page-title {
    margin: 0 0 4px;
    color: var(--color-heading, #162536);
    font-size: 24px;
    font-weight: 700;
}

.page-subtitle {
    margin: 0;
    color: var(--color-text-light, #687786);
    font-size: 14px;
}

.add-company-btn {
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
    border: 1px solid var(--color-border, #e1e7ed);
    border-radius: 12px;
    background: var(--color-white, #ffffff);
    box-shadow: 0 3px 12px rgba(15, 35, 55, 0.04);
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
    transform: translateY(-50%);
    color: #8492a0;
    font-size: 15px;
    z-index: 2;
}

.admin-search-input {
    min-height: 42px;
    padding-left: 40px;
    padding-right: 42px;
    border: 1px solid var(--color-border, #e1e7ed);
    border-radius: 8px;
    font-size: 14px;
    color: var(--color-text, #4e5d69);
    box-shadow: none;
}

.admin-search-input:focus {
    border-color: var(--color-primary, #1b5e8c);
    box-shadow: 0 0 0 3px rgba(27, 94, 140, 0.08);
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
    color: var(--color-primary, #1b5e8c);
}


/* ================================================================
   CARD HEADER
================================================================ */

.admin-card-header {
    min-height: 66px;
    padding: 14px 18px;
    border-bottom: 1px solid var(--color-border, #e1e7ed);
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.admin-card-title {
    margin: 0 0 3px;
    color: var(--color-heading, #162536);
    font-size: 16px;
    font-weight: 700;
}

.admin-card-count {
    color: var(--color-text-light, #687786);
    font-size: 12px;
}


/* ================================================================
   TABLE
================================================================ */

.admin-table {
    width: 100%;
    margin: 0;
    color: var(--color-text, #4e5d69);
    font-size: 13px;
}

.admin-table thead th {
    padding: 13px 16px;
    background: var(--color-surface-soft, #f3f6f9);
    border-bottom: 1px solid var(--color-border, #e1e7ed);
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

.company-row {
    transition: background 0.18s ease;
}

.company-row:hover {
    background: #fbfcfd;
}

.company-row:last-child td {
    border-bottom: 0;
}


/* ================================================================
   COLUMN WIDTHS
================================================================ */

.col-logo {
    width: 100px;
}

.col-banner {
    width: 120px;
}

.col-name {
    min-width: 210px;
}

.col-status {
    width: 120px;
}

.col-action {
    width: 120px;
    text-align: center;
}


/* ================================================================
   IMAGE
================================================================ */

.image-column {
    width: 100px;
}

.image-preview {
    width: 68px;
    height: 52px;
    border: 1px solid var(--color-border, #e1e7ed);
    border-radius: 8px;
    background: #ffffff;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition:
        border-color 0.18s ease,
        box-shadow 0.18s ease,
        transform 0.18s ease;
}

.image-preview:hover {
    border-color: var(--color-primary, #1b5e8c);
    box-shadow: 0 4px 12px rgba(15, 35, 55, 0.08);
    transform: translateY(-1px);
}

.banner-preview {
    width: 82px;
}

.company-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 5px;
}

.image-placeholder {
    width: 68px;
    height: 52px;
    border: 1px dashed #d5dce3;
    border-radius: 8px;
    background: #fafbfc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #9aa6b2;
    gap: 2px;
}

.image-placeholder i {
    font-size: 16px;
}

.image-placeholder span {
    font-size: 9px;
}


/* ================================================================
   COMPANY NAME
================================================================ */

.company-name-cell {
    max-width: 300px;
}

.company-name {
    color: var(--color-heading, #162536);
    font-weight: 600;
    font-size: 14px;
    line-height: 1.35;
}

.company-description {
    margin-top: 3px;
    color: #87939e;
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


/* ================================================================
   WEBSITE
================================================================ */

.company-website {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    max-width: 280px;
    color: var(--color-primary, #1b5e8c);
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
}

.company-website span {
    max-width: 210px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.company-website:hover {
    color: #14496d;
    text-decoration: underline;
}

.external-icon {
    font-size: 10px;
    opacity: 0.7;
}

.empty-value {
    color: #a0aab4;
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
    transform: translateY(-1px);
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
    background: var(--color-surface-soft, #f3f6f9);
    color: #9aa6b2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
}

.empty-state h5 {
    margin: 0 0 5px;
    color: var(--color-heading, #162536);
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
    color: var(--color-primary, #1b5e8c);
}


/* ================================================================
   MODAL
================================================================ */

.company-modal-content {
    padding: 2px 0;
}

.form-section {
    padding: 18px;
    margin-bottom: 14px;
    border: 1px solid var(--color-border, #e1e7ed);
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
    background: var(--color-primary-light, #edf5fc);
    color: var(--color-primary, #1b5e8c);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
}

.form-section-header h6 {
    margin: 0 0 2px;
    color: var(--color-heading, #162536);
    font-size: 14px;
    font-weight: 700;
}

.form-section-header p {
    margin: 0;
    color: #8995a0;
    font-size: 11px;
}

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
    border: 1px solid var(--color-border, #e1e7ed);
    border-radius: 7px;
    color: var(--color-text, #4e5d69);
    font-size: 13px;
    box-shadow: none;
}

textarea.admin-form-control {
    min-height: 92px;
    resize: vertical;
}

.admin-form-control:focus {
    border-color: var(--color-primary, #1b5e8c);
    box-shadow: 0 0 0 3px rgba(27, 94, 140, 0.08);
}

.input-icon-wrapper {
    position: relative;
}

.input-icon-wrapper > i {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: #8996a2;
    z-index: 2;
}

.input-icon-wrapper .admin-form-control {
    padding-left: 36px;
}


/* ================================================================
   FILE UPLOAD
================================================================ */

.file-upload-box {
    position: relative;
    min-height: 145px;
    border: 1px dashed #ccd5dd;
    border-radius: 9px;
    background: #fafcfd;
    overflow: hidden;
    cursor: pointer;
    transition:
        border-color 0.18s ease,
        background 0.18s ease;
}

.file-upload-box:hover {
    border-color: var(--color-primary, #1b5e8c);
    background: var(--color-primary-light, #edf5fc);
}

.file-upload-box > input[type="file"] {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 5;
}

.upload-placeholder {
    height: 145px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #84919d;
    pointer-events: none;
}

.upload-placeholder i {
    margin-bottom: 7px;
    color: var(--color-primary, #1b5e8c);
    font-size: 26px;
}

.upload-placeholder span {
    color: #5f6d7a;
    font-size: 13px;
    font-weight: 600;
}

.upload-placeholder small {
    margin-top: 3px;
    color: #9ba6af;
    font-size: 10px;
}

.upload-preview {
    position: absolute;
    inset: 0;
    padding: 8px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.upload-preview img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 6px;
}

.banner-upload-preview img {
    object-fit: cover;
}

.remove-preview-btn {
    position: absolute;
    top: 7px;
    right: 7px;
    width: 27px;
    height: 27px;
    border: 0;
    border-radius: 50%;
    background: rgba(11, 23, 38, 0.75);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    z-index: 10;
    cursor: pointer;
}

.remove-preview-btn:hover {
    background: #c24d4d;
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
    color: var(--color-heading, #162536);
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
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    transition: 0.2s ease;
}

.custom-switch input:checked + .switch-slider {
    background: var(--color-primary, #1b5e8c);
}

.custom-switch input:checked + .switch-slider::before {
    transform: translateX(19px);
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
   IMAGE LIGHTBOX
================================================================ */

.image-lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    padding: 30px;
    background: rgba(11, 23, 38, 0.86);
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightbox-image {
    max-width: 90vw;
    max-height: 88vh;
    object-fit: contain;
    border-radius: 8px;
    background: #ffffff;
    padding: 8px;
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.25);
}

.lightbox-close {
    position: absolute;
    top: 22px;
    right: 25px;
    width: 38px;
    height: 38px;
    border: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
}

.lightbox-close:hover {
    background: rgba(255, 255, 255, 0.22);
}


/* ================================================================
   RESPONSIVE
================================================================ */

@media (max-width: 991.98px) {

    .page-header-content {
        align-items: flex-start;
    }   


    .company-name-cell {
        max-width: 230px;
    }

}


@media (max-width: 767.98px) {

    .company-management-page {
        padding-left: 8px;
        padding-right: 8px;
    }

    .page-header-content {
        flex-direction: column;
        align-items: stretch;
    }

    .add-company-btn {
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

    .company-description {
        max-width: 180px;
    }

    .form-section {
        padding: 14px;
    }

}


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

    .image-preview {
        width: 58px;
        height: 45px;
    }

    .banner-preview {
        width: 68px;
    }

    .image-placeholder {
        width: 58px;
        height: 45px;
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