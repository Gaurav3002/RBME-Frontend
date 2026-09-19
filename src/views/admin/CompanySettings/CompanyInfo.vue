<template>

    <div class="container-fluid company-info-management-page">

        <!-- =========================================================
             PAGE HEADER
        ========================================================== -->

        <div class="page-header">

            <div class="page-header-content">

                <div class="page-title-wrap">

                    <div class="page-title-icon">
                        <i class="bi bi-building"></i>
                    </div>

                    <div>
                        <h3 class="page-title">
                            Company Information
                        </h3>

                        <p class="page-subtitle">
                            Manage company details, contact information and tax registration.
                        </p>
                    </div>

                </div>

                <!-- CREATE COMPANY -->

                <button
                    v-if="hasPermission('CREATE_COMPANYINFO')"
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
             SEARCH + FILTER CARD
        ========================================================== -->

        <div class="card admin-card search-card">

            <div class="card-body">

                <div class="row g-3 align-items-end">

                    <!-- SEARCH -->

                    <div class="col-md-9">

                        <label class="admin-form-label">
                            Search Company
                        </label>

                        <div class="search-wrapper">

                            <div class="search-icon">
                                <i class="bi bi-search"></i>
                            </div>

                            <input
                                type="text"
                                class="form-control admin-search-input"
                                placeholder="Search by company name, city, email or GSTIN..."
                                v-model="searchQuery"
                            />

                            <button
                                v-if="searchQuery"
                                type="button"
                                class="search-clear"
                                @click="searchQuery = ''"
                                title="Clear search"
                            >
                                <i class="bi bi-x-circle"></i>
                            </button>

                        </div>

                    </div>


                    <!-- RESET -->

                    <div class="col-md-3 reset-wrapper">

                        <button
                            type="button"
                            class="btn btn-outline-secondary reset-btn"
                            @click="clearFilters"
                        >
                            <i class="bi bi-arrow-clockwise me-2"></i>
                            Reset
                        </button>

                    </div>

                </div>

            </div>

        </div>


        <!-- =========================================================
             TABLE CARD
        ========================================================== -->

        <div class="card admin-card admin-shared-card company-table-card">

            <!-- TABLE HEADER -->

            <div class="card-header admin-card-header admin-shared-card-header">

                <div>

                    <h5 class="admin-card-title admin-shared-card-title">
                        Companies
                    </h5>

                    <span class="admin-card-count admin-shared-card-count">

                        {{ filteredCompanies.length }}

                        {{ filteredCompanies.length === 1 ? 'company' : 'companies' }}

                    </span>

                </div>

            </div>


            <!-- TABLE BODY -->

            <div class="card-body p-0">

                <div class="table-responsive admin-shared-table-wrap">

                    <table class="table admin-table admin-shared-table align-middle mb-0">

                        <!-- HEADER -->

                        <thead>

                            <tr>

                                <th class="col-number">
                                    #
                                </th>

                                <th class="col-company">
                                    Company
                                </th>

                                <th class="col-location">
                                    Location
                                </th>

                                <th class="col-contact">
                                    Contact
                                </th>

                                <th class="col-tax">
                                    Tax Information
                                </th>

                                <th
                                    v-if="hasPermission('UPDATE_COMPANYINFO') || hasPermission('DELETE_COMPANYINFO')"
                                    class="col-action"
                                >
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <!-- BODY -->

                        <tbody>

                            <!-- LOADING -->

                            <tr v-if="loading">

                                <td
                                    :colspan="hasPermission('UPDATE_COMPANYINFO') || hasPermission('DELETE_COMPANYINFO') ? 6 : 5"
                                    class="empty-table-cell"
                                >

                                    <div class="loading-state">

                                        <div class="spinner-border"></div>

                                        <span>
                                            Loading companies...
                                        </span>

                                    </div>

                                </td>

                            </tr>


                            <!-- EMPTY -->

                            <tr v-else-if="filteredCompanies.length === 0">

                                <td
                                    :colspan="hasPermission('UPDATE_COMPANYINFO') || hasPermission('DELETE_COMPANYINFO') ? 6 : 5"
                                    class="empty-table-cell"
                                >

                                    <div class="empty-state">

                                        <div class="empty-state-icon">
                                            <i class="bi bi-building"></i>
                                        </div>

                                        <h5>
                                            No Companies Found
                                        </h5>

                                        <p>
                                            {{
                                                searchQuery
                                                    ? "No companies match your search."
                                                    : "No companies have been added yet."
                                            }}
                                        </p>

                                        <button
                                            v-if="searchQuery"
                                            type="button"
                                            class="btn btn-outline-primary btn-sm"
                                            @click="searchQuery = ''"
                                        >
                                            Clear Search
                                        </button>

                                    </div>

                                </td>

                            </tr>


                            <!-- DATA -->

                            <tr
                                v-else
                                v-for="(company, index) in filteredCompanies"
                                :key="company.companyId"
                                class="company-row"
                            >

                                <!-- NUMBER -->

                                <td>
                                    {{ index + 1 }}
                                </td>


                                <!-- COMPANY -->

                                <td>

                                    <div class="company-name-cell">

                                        <div class="company-avatar">
                                            <i class="bi bi-building"></i>
                                        </div>

                                        <div class="company-name-content">

                                            <div class="company-name">
                                                {{ company.companyName || "-" }}
                                            </div>

                                            <div class="company-id">
                                                ID: {{ company.companyId }}
                                            </div>

                                        </div>

                                    </div>

                                </td>


                                <!-- LOCATION -->

                                <td>

                                    <div class="location-cell">

                                        <div
                                            v-if="company.addressLine1 || company.addressLine2"
                                            class="location-address"
                                        >
                                            {{ company.addressLine1 || company.addressLine2 }}
                                        </div>

                                        <div class="location-city">

                                            <span v-if="company.city">
                                                {{ company.city }}
                                            </span>

                                            <span v-if="company.city && company.state">
                                                , 
                                            </span>

                                            <span v-if="company.state">
                                                {{ company.state }}
                                            </span>

                                        </div>

                                        <div
                                            v-if="company.country"
                                            class="location-country"
                                        >
                                            {{ company.country }}
                                            <span v-if="company.ZIPCode">
                                                - {{ company.ZIPCode }}
                                            </span>
                                        </div>

                                    </div>

                                </td>


                                <!-- CONTACT -->

                                <td>

                                    <div class="contact-cell">

                                        <div
                                            v-if="company.phone"
                                            class="contact-item"
                                        >
                                            <i class="bi bi-telephone"></i>
                                            <span>
                                                {{ company.phone }}
                                            </span>
                                        </div>

                                        <div
                                            v-if="company.mobile"
                                            class="contact-item"
                                        >
                                            <i class="bi bi-phone"></i>
                                            <span>
                                                {{ company.mobile }}
                                            </span>
                                        </div>

                                        <div
                                            v-if="company.email"
                                            class="contact-item"
                                        >
                                            <i class="bi bi-envelope"></i>
                                            <span>
                                                {{ company.email }}
                                            </span>
                                        </div>

                                        <span
                                            v-if="!company.phone && !company.mobile && !company.email"
                                            class="text-muted"
                                        >
                                            -
                                        </span>

                                    </div>

                                </td>


                                <!-- TAX -->

                                <td>

                                    <div class="tax-cell">

                                        <span
                                            v-if="company.gSTRegistered === 'Yes' || company.gSTRegistered === 'true' || company.gSTRegistered === true"
                                            class="tax-badge tax-registered"
                                        >
                                            <span class="status-dot"></span>
                                            GST Registered
                                        </span>

                                        <span
                                            v-else
                                            class="tax-badge tax-not-registered"
                                        >
                                            <span class="status-dot"></span>
                                            Not Registered
                                        </span>

                                        <div
                                            v-if="company.gSTIN"
                                            class="gstin-text"
                                        >
                                            GSTIN: {{ company.gSTIN }}
                                        </div>

                                        <div
                                            v-if="company.pan"
                                            class="pan-text"
                                        >
                                            PAN: {{ company.pan }}
                                        </div>

                                    </div>

                                </td>


                                <!-- ACTION -->

                                <td
                                    v-if="hasPermission('UPDATE_COMPANYINFO') || hasPermission('DELETE_COMPANYINFO')"
                                >

                                    <div class="action-buttons">

                                        <!-- EDIT -->

                                        <button
                                            v-if="hasPermission('UPDATE_COMPANYINFO')"
                                            type="button"
                                            class="action-btn edit-btn"
                                            title="Edit Company"
                                            @click="openEditModal(company)"
                                        >
                                            <i class="bi bi-pencil"></i>
                                        </button>


                                        <!-- DELETE -->

                                        <button
                                            v-if="hasPermission('DELETE_COMPANYINFO')"
                                            type="button"
                                            class="action-btn delete-btn"
                                            title="Delete Company"
                                            @click="confirmDelete(company)"
                                        >
                                            <i class="bi bi-trash"></i>
                                        </button>

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
         CREATE / EDIT COMPANY MODAL
    ============================================================= -->

    <BaseModal
        ref="modalRef"
        id="companyInfoModal"
        :title="isEditMode ? 'Edit Company Information' : 'Create Company Information'"
    >

        <div class="company-modal-content">


            <!-- =====================================================
                 COMPANY INFORMATION
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
                            Enter the basic company information.
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
                            maxlength="200"
                            v-model.trim="form.companyName"
                        />

                    </div>


                    <!-- TAX REGISTRATION TYPE -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Tax Registration Type
                        </label>

                        <select
                            class="form-select admin-form-control"
                            v-model="form.taxRegistrationType"
                        >

                            <option value="">
                                Select registration type
                            </option>

                            <option value="Regular">
                                Regular
                            </option>

                            <option value="Composition">
                                Composition
                            </option>

                            <option value="Unregistered">
                                Unregistered
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            <!-- =====================================================
                 ADDRESS INFORMATION
            ====================================================== -->

            <div class="form-section">

                <div class="form-section-header">

                    <div class="form-section-icon">
                        <i class="bi bi-geo-alt"></i>
                    </div>

                    <div>

                        <h6>
                            Address Information
                        </h6>

                        <p>
                            Enter the registered company address.
                        </p>

                    </div>

                </div>


                <div class="row g-3">

                    <!-- ADDRESS LINE 1 -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Address Line 1
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control"
                            placeholder="Enter address line 1"
                            maxlength="250"
                            v-model.trim="form.addressLine1"
                        />

                    </div>


                    <!-- ADDRESS LINE 2 -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Address Line 2
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control"
                            placeholder="Enter address line 2"
                            maxlength="250"
                            v-model.trim="form.addressLine2"
                        />

                    </div>


                    <!-- CITY -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            City
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control"
                            placeholder="Enter city"
                            maxlength="100"
                            v-model.trim="form.city"
                        />

                    </div>


                    <!-- STATE -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            State
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control"
                            placeholder="Enter state"
                            maxlength="100"
                            v-model.trim="form.state"
                        />

                    </div>


                    <!-- COUNTRY -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Country
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control"
                            placeholder="Enter country"
                            maxlength="100"
                            v-model.trim="form.country"
                        />

                    </div>


                    <!-- ZIP CODE -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            ZIP / PIN Code
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control"
                            placeholder="Enter ZIP / PIN code"
                            maxlength="20"
                            v-model.trim="form.ZIPCode"
                        />

                    </div>

                </div>

            </div>


            <!-- =====================================================
                 CONTACT INFORMATION
            ====================================================== -->

            <div class="form-section">

                <div class="form-section-header">

                    <div class="form-section-icon">
                        <i class="bi bi-telephone"></i>
                    </div>

                    <div>

                        <h6>
                            Contact Information
                        </h6>

                        <p>
                            Enter company contact and email details.
                        </p>

                    </div>

                </div>


                <div class="row g-3">

                    <!-- PHONE -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Phone
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control"
                            placeholder="Enter phone number"
                            maxlength="30"
                            v-model.trim="form.phone"
                        />

                    </div>


                    <!-- MOBILE -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Mobile
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control"
                            placeholder="Enter mobile number"
                            maxlength="30"
                            v-model.trim="form.mobile"
                        />

                    </div>


                    <!-- EMAIL -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            class="form-control admin-form-control"
                            placeholder="Enter company email"
                            maxlength="150"
                            v-model.trim="form.email"
                        />

                    </div>


                    <!-- ANOTHER EMAIL -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Another Email
                        </label>

                        <input
                            type="email"
                            class="form-control admin-form-control"
                            placeholder="Enter another email"
                            maxlength="150"
                            v-model.trim="form.anotherEmail"
                        />

                    </div>

                </div>

            </div>


            <!-- =====================================================
                 TAX INFORMATION
            ====================================================== -->

            <div class="form-section">

                <div class="form-section-header">

                    <div class="form-section-icon">
                        <i class="bi bi-receipt"></i>
                    </div>

                    <div>

                        <h6>
                            Tax Information
                        </h6>

                        <p>
                            Configure GST and PAN registration details.
                        </p>

                    </div>

                </div>


                <div class="row g-3">

                    <!-- GST REGISTERED -->

                    <div class="col-md-6">

                        <label class="admin-form-label">

                            GST Registered

                            <span class="required">*</span>

                        </label>

                        <select
                            class="form-select admin-form-control"
                            v-model="form.gSTRegistered"
                        >

                            <option value="">
                                Select
                            </option>

                            <option value="Yes">
                                Yes
                            </option>

                            <option value="No">
                                No
                            </option>

                        </select>

                    </div>


                    <!-- GSTIN -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            GSTIN
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control text-uppercase"
                            placeholder="Example: 20ABCDE1234F1Z5"
                            maxlength="20"
                            v-model="form.gSTIN"
                            @input="form.gSTIN = form.gSTIN.toUpperCase()"
                            :disabled="form.gSTRegistered !== 'Yes'"
                        />

                    </div>


                    <!-- PAN -->

                    <div class="col-md-6">

                        <label class="admin-form-label">
                            PAN
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control text-uppercase"
                            placeholder="Example: ABCDE1234F"
                            maxlength="10"
                            v-model="form.pan"
                            @input="form.pan = form.pan.toUpperCase()"
                        />

                    </div>

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
                :disabled="saving"
                @click="closeModal"
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
                    :class="isEditMode ? 'bi-check-circle' : 'bi-plus-circle'"
                ></i>

                {{
                    saving
                        ? "Saving..."
                        : isEditMode
                            ? "Update Company"
                            : "Create Company"
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
    getCompanyInfo,
    getCompanyInfoById,
    createCompanyInfo,
    updateCompanyInfo,
    deleteCompanyInfo as deleteCompanyInfoApi
} from "@/api/CompanyInfoApis/companyInfo.api.js";

import {
    hasPermission
} from "@/utils/permission.js";


// ================================================================
// MODAL REF
// ================================================================

const modalRef = ref(null);


// ================================================================
// STATE
// ================================================================

const companies = ref([]);

const loading = ref(false);

const saving = ref(false);

const searchQuery = ref("");

const isEditMode = ref(false);

const editingCompanyId = ref(null);


// ================================================================
// EMPTY FORM
// ================================================================

const emptyForm = () => ({

    companyName: "",

    addressLine1: "",

    addressLine2: "",

    city: "",

    state: "",

    country: "",

    ZIPCode: "",

    phone: "",

    mobile: "",

    email: "",

    anotherEmail: "",

    gSTRegistered: "",

    gSTIN: "",

    pan: "",

    taxRegistrationType: ""

});


// ================================================================
// FORM
// ================================================================

const form = ref(emptyForm());


// ================================================================
// FILTERED COMPANIES
// ================================================================

const filteredCompanies = computed(() => {

    const keyword =
        searchQuery.value
            .trim()
            .toLowerCase();

    return companies.value.filter(company => {

        const companyName =
            String(company.companyName || "")
                .toLowerCase();

        const city =
            String(company.city || "")
                .toLowerCase();

        const state =
            String(company.state || "")
                .toLowerCase();

        const email =
            String(company.email || "")
                .toLowerCase();

        const mobile =
            String(company.mobile || "")
                .toLowerCase();

        const gstin =
            String(company.gSTIN || "")
                .toLowerCase();

        const pan =
            String(company.pan || "")
                .toLowerCase();


        return (
            !keyword ||
            companyName.includes(keyword) ||
            city.includes(keyword) ||
            state.includes(keyword) ||
            email.includes(keyword) ||
            mobile.includes(keyword) ||
            gstin.includes(keyword) ||
            pan.includes(keyword)
        );

    });

});


// ================================================================
// RESET FORM
// ================================================================

const resetForm = () => {

    form.value = emptyForm();

    editingCompanyId.value = null;

};


// ================================================================
// OPEN CREATE MODAL
// ================================================================

const openCreateModal = () => {

    isEditMode.value = false;

    resetForm();

    if (modalRef.value) {

        modalRef.value.show();

    } else {

        console.error(
            "Company information modal reference is not available."
        );

    }

};


// ================================================================
// OPEN EDIT MODAL
// ================================================================

const openEditModal = async (company) => {

    try {

        saving.value = true;

        const response =
            await getCompanyInfoById(
                company.companyId
            );

        const companyData =
            response?.data || response;


        isEditMode.value = true;

        editingCompanyId.value =
            companyData.companyId;


        form.value = {

            companyName:
                companyData.companyName || "",

            addressLine1:
                companyData.addressLine1 || "",

            addressLine2:
                companyData.addressLine2 || "",

            city:
                companyData.city || "",

            state:
                companyData.state || "",

            country:
                companyData.country || "",

            ZIPCode:
                companyData.ZIPCode || "",

            phone:
                companyData.phone || "",

            mobile:
                companyData.mobile || "",

            email:
                companyData.email || "",

            anotherEmail:
                companyData.anotherEmail || "",

            gSTRegistered:
                companyData.gSTRegistered || "",

            gSTIN:
                companyData.gSTIN || "",

            pan:
                companyData.pan || "",

            taxRegistrationType:
                companyData.taxRegistrationType || ""

        };


        if (modalRef.value) {

            modalRef.value.show();

        }

    } catch (error) {

        console.error(
            "Failed to load company information:",
            error
        );

        alert(
            error?.response?.data?.message ||
            "Failed to load company information."
        );

    } finally {

        saving.value = false;

    }

};


// ================================================================
// CLOSE MODAL
// ================================================================

const closeModal = () => {

    if (saving.value) {
        return;
    }

    if (modalRef.value) {

        modalRef.value.hide();

    }

    isEditMode.value = false;

    editingCompanyId.value = null;

    form.value = emptyForm();

};


// ================================================================
// SAVE COMPANY
// ================================================================

const saveCompany = async () => {

    // ============================================================
    // VALIDATION
    // ============================================================

    if (!form.value.companyName?.trim()) {

        alert(
            "Please enter company name."
        );

        return;

    }


    if (!form.value.gSTRegistered) {

        alert(
            "Please select GST registration status."
        );

        return;

    }


    // ============================================================
    // GST VALIDATION
    // ============================================================

    if (
        form.value.gSTRegistered === "Yes" &&
        !form.value.gSTIN?.trim()
    ) {

        alert(
            "Please enter GSTIN."
        );

        return;

    }


    try {

        saving.value = true;


        // ========================================================
        // PAYLOAD
        // ========================================================

        const payload = {

            companyName:
                form.value.companyName.trim(),

            addressLine1:
                form.value.addressLine1?.trim() || "",

            addressLine2:
                form.value.addressLine2?.trim() || "",

            city:
                form.value.city?.trim() || "",

            state:
                form.value.state?.trim() || "",

            country:
                form.value.country?.trim() || "",

            ZIPCode:
                form.value.ZIPCode?.trim() || "",

            phone:
                form.value.phone?.trim() || "",

            mobile:
                form.value.mobile?.trim() || "",

            email:
                form.value.email?.trim() || "",

            anotherEmail:
                form.value.anotherEmail?.trim() || "",

            gSTRegistered:
                form.value.gSTRegistered,

            gSTIN:
                form.value.gSTIN?.trim().toUpperCase() || "",

            pan:
                form.value.pan?.trim().toUpperCase() || "",

            taxRegistrationType:
                form.value.taxRegistrationType?.trim() || ""

        };


        // ========================================================
        // UPDATE
        // ========================================================

        if (isEditMode.value) {

            await updateCompanyInfo(
                editingCompanyId.value,
                payload
            );

            alert(
                "Company information updated successfully."
            );

        }

        // ========================================================
        // CREATE
        // ========================================================

        else {

            await createCompanyInfo(
                payload
            );

            alert(
                "Company information created successfully."
            );

        }


        // ========================================================
        // RELOAD
        // ========================================================

        await loadCompanies();


        // ========================================================
        // CLOSE
        // ========================================================

        if (modalRef.value) {

            modalRef.value.hide();

        }

        resetForm();

        isEditMode.value = false;


    } catch (error) {

        console.error(
            "Save company information error:",
            error
        );

        alert(
            error?.response?.data?.message ||
            "Something went wrong while saving company information."
        );

    } finally {

        saving.value = false;

    }

};


// ================================================================
// DELETE COMPANY
// ================================================================

const confirmDelete = async (company) => {

    const confirmed =
        window.confirm(
            `Are you sure you want to delete "${company.companyName}"?`
        );


    if (!confirmed) {
        return;
    }


    try {

        await deleteCompanyInfoApi(
            company.companyId
        );

        await loadCompanies();

        alert(
            "Company information deleted successfully."
        );

    } catch (error) {

        console.error(
            "Failed to delete company information:",
            error
        );

        alert(
            error?.response?.data?.message ||
            "Failed to delete company information."
        );

    }

};


// ================================================================
// CLEAR FILTERS
// ================================================================

const clearFilters = () => {

    searchQuery.value = "";

};


// ================================================================
// LOAD COMPANIES
// ================================================================

const loadCompanies = async () => {

    loading.value = true;


    try {

        const response =
            await getCompanyInfo();


        if (Array.isArray(response)) {

            companies.value = response;

        } else if (
            Array.isArray(response?.data)
        ) {

            companies.value =
                response.data;

        } else {

            companies.value = [];

        }


    } catch (error) {

        console.error(
            "Error loading companies:",
            error
        );

        companies.value = [];

        alert(
            "Failed to load company information."
        );

    } finally {

        loading.value = false;

    }

};


// ================================================================
// MOUNT
// ================================================================

onMounted(() => {

    loadCompanies();

});

</script>


<style scoped>

/* ================================================================
   PAGE
================================================================ */

.company-info-management-page {

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
   FORM LABEL
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


/* ================================================================
   FORM CONTROL
================================================================ */

.admin-form-control {

    min-height: 40px;

    border: 1px solid var(--color-border, #e1e7ed);

    border-radius: 7px;

    color: var(--color-text, #4e5d69);

    font-size: 13px;

    box-shadow: none;

}

.admin-form-control:focus {

    border-color: var(--color-primary, #1b5e8c);

    box-shadow: 0 0 0 3px rgba(27, 94, 140, 0.08);

}

.admin-form-control:disabled {

    background: #f4f6f8;

    color: #9aa4ad;

    cursor: not-allowed;

}


/* ================================================================
   RESET
================================================================ */

.reset-wrapper {

    display: flex;

    justify-content: flex-end;

}

.reset-btn {

    min-height: 40px;

    border-radius: 7px;

    font-size: 13px;

    font-weight: 600;

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

.col-number {

    width: 55px;

}

.col-company {

    min-width: 220px;

}

.col-location {

    min-width: 220px;

}

.col-contact {

    min-width: 220px;

}

.col-tax {

    min-width: 190px;

}

.col-action {

    width: 110px;

    text-align: center;

}


/* ================================================================
   COMPANY NAME
================================================================ */

.company-name-cell {

    display: flex;

    align-items: center;

    gap: 11px;

}

.company-avatar {

    width: 38px;

    height: 38px;

    border-radius: 9px;

    background: var(--color-primary-light, #edf5fc);

    color: var(--color-primary, #1b5e8c);

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 15px;

    flex-shrink: 0;

}

.company-name-content {

    min-width: 0;

}

.company-name {

    color: var(--color-heading, #162536);

    font-size: 14px;

    font-weight: 600;

    line-height: 1.35;

}

.company-id {

    margin-top: 3px;

    color: #9aa5af;

    font-size: 10px;

}


/* ================================================================
   LOCATION
================================================================ */

.location-cell {

    line-height: 1.45;

}

.location-address {

    color: #4e5d69;

    font-size: 12px;

    max-width: 230px;

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;

}

.location-city {

    margin-top: 3px;

    color: #687786;

    font-size: 12px;

}

.location-country {

    margin-top: 2px;

    color: #9aa5af;

    font-size: 11px;

}


/* ================================================================
   CONTACT
================================================================ */

.contact-cell {

    display: flex;

    flex-direction: column;

    gap: 5px;

}

.contact-item {

    display: flex;

    align-items: center;

    gap: 7px;

    color: #687786;

    font-size: 12px;

}

.contact-item i {

    width: 15px;

    color: #8795a2;

    font-size: 12px;

}


/* ================================================================
   TAX
================================================================ */

.tax-cell {

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 4px;

}

.tax-badge {

    display: inline-flex;

    align-items: center;

    gap: 7px;

    padding: 5px 9px;

    border-radius: 20px;

    font-size: 10px;

    font-weight: 600;

    white-space: nowrap;

}

.tax-registered {

    color: #23814b;

    background: #eaf7ef;

}

.tax-not-registered {

    color: #8a6670;

    background: #f7eef1;

}

.status-dot {

    width: 6px;

    height: 6px;

    border-radius: 50%;

    background: currentColor;

}

.gstin-text {

    color: #687786;

    font-size: 11px;

    font-family: monospace;

}

.pan-text {

    color: #8995a0;

    font-size: 10px;

    font-family: monospace;

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

    min-width: 150px;

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

    .location-address {

        max-width: 180px;

    }

}


@media (max-width: 767.98px) {

    .company-info-management-page {

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

    .reset-wrapper {

        justify-content: flex-start;

    }

    .reset-btn {

        width: 100%;

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

    .company-avatar {

        width: 34px;

        height: 34px;

    }

    .company-id {

        display: none;

    }

    .action-btn {

        width: 31px;

        height: 31px;

    }

    .tax-badge {

        padding: 4px 8px;

    }

}

</style>