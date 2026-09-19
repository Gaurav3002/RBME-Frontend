```vue
<template>

    <div class="container-fluid tax-info-management-page">

        <!-- =========================================================
             PAGE HEADER
        ========================================================== -->

        <div class="page-header">

            <div class="page-header-content">

                <div class="page-title-wrap">

                    <div class="page-title-icon">
                        <i class="bi bi-percent"></i>
                    </div>

                    <div>

                        <h3 class="page-title">
                            Tax / GST
                        </h3>

                        <p class="page-subtitle">
                            Manage tax rates and GST information used across the system.
                        </p>

                    </div>

                </div>

                <!-- CREATE -->

                <button 
                    v-if="hasPermission('TAX_GST_CREATE')"
                    type="button"
                    class="btn btn-primary add-tax-btn"
                    @click="openCreateModal"
                >
                    <i class="bi bi-plus-circle me-2"></i>
                    Add Tax
                </button>

            </div>

        </div>


        <!-- =========================================================
             SEARCH
        ========================================================== -->

        <div class="card admin-card search-card">

            <div class="card-body">

                <div class="row g-3 align-items-end">

                    <div class="col-md-9">

                        <label class="admin-form-label">
                            Search Tax
                        </label>

                        <div class="search-wrapper">

                            <div class="search-icon">
                                <i class="bi bi-search"></i>
                            </div>

                            <input
                                type="text"
                                class="form-control admin-search-input"
                                placeholder="Search by tax name or percentage..."
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
             TABLE
        ========================================================== -->

        <div class="card admin-card tax-table-card">

            <!-- TABLE HEADER -->

            <div class="card-header admin-card-header">

                <div>

                    <h5 class="admin-card-title">
                        Tax / GST Rates
                    </h5>

                    <span class="admin-card-count">

                        {{ filteredTaxInfo.length }}

                        {{
                            filteredTaxInfo.length === 1
                                ? "tax"
                                : "taxes"
                        }}

                    </span>

                </div>

            </div>


            <!-- TABLE BODY -->

            <div class="card-body p-0">

                <div class="table-responsive">

                    <table class="table admin-table align-middle mb-0">

                        <thead>

                            <tr>

                                <th class="col-number">
                                    #
                                </th>

                                <th class="col-tax">
                                    Tax Name
                                </th>

                                <th class="col-percentage">
                                    Tax Percentage
                                </th>

                                <th class="col-created">
                                    Created On
                                </th>

                                <th class="col-created-by">
                                    Created By
                                </th>

                                <th
                                    v-if="
                                        hasPermission('TAX_GST_UPDATE') ||
                                        hasPermission('TAX_GST_DELETE')
                                    "
                                    class="col-action"
                                >
                                    Action
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <!-- LOADING -->

                            <tr v-if="loading">

                                <td
                                    :colspan="
                                        hasPermission('TAX_GST_UPDATE') ||
                                        hasPermission('TAX_GST_DELETE')
                                            ? 6
                                            : 5
                                    "
                                    class="empty-table-cell"
                                >

                                    <div class="loading-state">

                                        <div class="spinner-border"></div>

                                        <span>
                                            Loading tax information...
                                        </span>

                                    </div>

                                </td>

                            </tr>


                            <!-- EMPTY -->

                            <tr
                                v-else-if="filteredTaxInfo.length === 0"
                            >

                                <td
                                    :colspan="
                                        hasPermission('TAX_GST_UPDATE') ||
                                        hasPermission('TAX_GST_DELETE')
                                            ? 6
                                            : 5
                                    "
                                    class="empty-table-cell"
                                >

                                    <div class="empty-state">

                                        <div class="empty-state-icon">
                                            <i class="bi bi-percent"></i>
                                        </div>

                                        <h5>
                                            No Tax Information Found
                                        </h5>

                                        <p>
                                            {{
                                                searchQuery
                                                    ? "No tax records match your search."
                                                    : "No tax information has been added yet."
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
                                v-for="(tax, index) in filteredTaxInfo"
                                :key="tax.id"
                                class="tax-row"
                            >

                                <!-- NUMBER -->

                                <td>
                                    {{ index + 1 }}
                                </td>


                                <!-- TAX NAME -->

                                <td>

                                    <div class="tax-name-cell">

                                        <div class="tax-avatar">
                                            <i class="bi bi-percent"></i>
                                        </div>

                                        <div class="tax-name-content">

                                            <div class="tax-name">
                                                {{ tax.taxName || "-" }}
                                            </div>

                                            <div class="tax-id">
                                                ID: {{ tax.id }}
                                            </div>

                                        </div>

                                    </div>

                                </td>


                                <!-- TAX PERCENTAGE -->

                                <td>

                                    <div class="percentage-cell">

                                        <span class="percentage-badge">

                                            <i class="bi bi-percent"></i>

                                            {{ tax.taxPercentage ?? 0 }}%

                                        </span>

                                    </div>

                                </td>


                                <!-- CREATED ON -->

                                <td>

                                    <div class="created-cell">

                                        <div class="created-date">

                                            {{ formatDate(tax.createdOn) }}

                                        </div>

                                    </div>

                                </td>


                                <!-- CREATED BY -->

                                <td>

                                    <div class="created-by-cell">

                                        <i class="bi bi-person"></i>

                                        <span>
                                            {{ tax.createdBy || "-" }}
                                        </span>

                                    </div>

                                </td>


                                <!-- ACTION -->

                                <td
                                    v-if="
                                        hasPermission('TAX_GST_UPDATE') ||
                                        hasPermission('TAX_GST_DELETE')
                                    "
                                >

                                    <div class="action-buttons">

                                        <!-- EDIT -->

                                        <button
                                            v-if="hasPermission('TAX_GST_UPDATE')"
                                            type="button"
                                            class="action-btn edit-btn"
                                            title="Edit Tax"
                                            @click="openEditModal(tax)"
                                        >
                                            <i class="bi bi-pencil"></i>
                                        </button>


                                        <!-- DELETE -->

                                        <button
                                            v-if="hasPermission('TAX_GST_DELETE')"
                                            type="button"
                                            class="action-btn delete-btn"
                                            title="Delete Tax"
                                            @click="confirmDelete(tax)"
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


        <!-- =========================================================
             CREATE / EDIT MODAL
        ========================================================== -->

        <BaseModal
            ref="modalRef"
            id="taxInfoDetailsModal"
            :title="
                isEditMode
                    ? 'Edit Tax Information'
                    : 'Create Tax Information'
            "
        >

            <div class="tax-modal-content">

                <!-- =================================================
                     TAX INFORMATION
                ================================================== -->

                <div class="form-section">

                    <div class="form-section-header">

                        <div class="form-section-icon">
                            <i class="bi bi-percent"></i>
                        </div>

                        <div>

                            <h6>
                                Tax Information
                            </h6>

                            <p>
                                Enter the tax name and applicable percentage.
                            </p>

                        </div>

                    </div>


                    <div class="row g-3">

                        <!-- TAX NAME -->

                        <div class="col-md-6">

                            <label class="admin-form-label">

                                Tax Name

                                <span class="required">
                                    *
                                </span>

                            </label>

                            <input
                                type="text"
                                class="form-control admin-form-control"
                                placeholder="Example: GST 18%"
                                maxlength="100"
                                v-model.trim="form.taxName"
                            />

                        </div>


                        <!-- TAX PERCENTAGE -->

                        <div class="col-md-6">

                            <label class="admin-form-label">

                                Tax Percentage

                                <span class="required">
                                    *
                                </span>

                            </label>

                            <div class="percentage-input-wrapper">

                                <input
                                    type="number"
                                    class="form-control admin-form-control percentage-input"
                                    placeholder="Enter tax percentage"
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    v-model.number="form.taxPercentage"
                                />

                                <span class="percentage-symbol">
                                    %
                                </span>

                            </div>

                            <small class="form-help-text">
                                Enter a value between 0 and 100.
                            </small>

                        </div>

                    </div>

                </div>


                <!-- =================================================
                     COMMON GST RATES
                ================================================== -->

                <div class="form-section">

                    <div class="form-section-header">

                        <div class="form-section-icon">
                            <i class="bi bi-list-check"></i>
                        </div>

                        <div>

                            <h6>
                                Common GST Rates
                            </h6>

                            <p>
                                Quickly select a standard GST percentage.
                            </p>

                        </div>

                    </div>


                    <div class="gst-rate-options">

                        <button
                            type="button"
                            class="gst-rate-btn"
                            :class="{
                                selected:
                                    form.taxPercentage === 0
                            }"
                            @click="selectTaxPercentage(0)"
                        >
                            0%
                        </button>

                        <button
                            type="button"
                            class="gst-rate-btn"
                            :class="{
                                selected:
                                    form.taxPercentage === 5
                            }"
                            @click="selectTaxPercentage(5)"
                        >
                            5%
                        </button>

                        <button
                            type="button"
                            class="gst-rate-btn"
                            :class="{
                                selected:
                                    form.taxPercentage === 12
                            }"
                            @click="selectTaxPercentage(12)"
                        >
                            12%
                        </button>

                        <button
                            type="button"
                            class="gst-rate-btn"
                            :class="{
                                selected:
                                    form.taxPercentage === 18
                            }"
                            @click="selectTaxPercentage(18)"
                        >
                            18%
                        </button>

                        <button
                            type="button"
                            class="gst-rate-btn"
                            :class="{
                                selected:
                                    form.taxPercentage === 28
                            }"
                            @click="selectTaxPercentage(28)"
                        >
                            28%
                        </button>

                    </div>

                </div>

            </div>


            <!-- =====================================================
                 MODAL FOOTER
            ====================================================== -->

            <template #footer>

                <button
                    type="button"
                    class="btn btn-light modal-cancel-btn"
                    :disabled="saving"
                    @click="closeModal"
                >
                    Cancel
                </button>


                <button
                    type="button"
                    class="btn btn-primary modal-save-btn"
                    :disabled="saving"
                    @click="saveTaxInfo"
                >

                    <span
                        v-if="saving"
                        class="spinner-border spinner-border-sm me-2"
                    ></span>

                    <i
                        v-else
                        class="bi"
                        :class="
                            isEditMode
                                ? 'bi-check-circle'
                                : 'bi-plus-circle'
                        "
                    ></i>

                    {{
                        saving
                            ? "Saving..."
                            : isEditMode
                                ? "Update Tax"
                                : "Create Tax"
                    }}

                </button>

            </template>

        </BaseModal>

    </div>

</template>


<script setup>

import {
    computed,
    onMounted,
    ref
} from "vue";

import BaseModal from "@/components/admin/common/BaseModal.vue";

import {
    getTaxInfo,
    getTaxInfoById,
    createTaxInfo,
    updateTaxInfo,
    deleteTaxInfo as deleteTaxInfoApi
} from "@/api/CompanyInfoApis/taxInfoDetails.api.js";

import {
    hasPermission
} from "@/utils/permission.js";


// ================================================================
// MODAL
// ================================================================

const modalRef = ref(null);


// ================================================================
// STATE
// ================================================================

const taxInfo = ref([]);

const loading = ref(false);

const saving = ref(false);

const searchQuery = ref("");

const isEditMode = ref(false);

const editingTaxId = ref(null);


// ================================================================
// EMPTY FORM
// ================================================================

const emptyForm = () => ({

    taxName: "",

    taxPercentage: 0

});


// ================================================================
// FORM
// ================================================================

const form = ref(emptyForm());


// ================================================================
// FILTER
// ================================================================

const filteredTaxInfo = computed(() => {

    const keyword =
        searchQuery.value
            .trim()
            .toLowerCase();

    return taxInfo.value.filter(tax => {

        const taxName =
            String(tax.taxName || "")
                .toLowerCase();

        const taxPercentage =
            String(tax.taxPercentage ?? "")
                .toLowerCase();

        const createdBy =
            String(tax.createdBy ?? "")
                .toLowerCase();

        return (

            !keyword ||

            taxName.includes(keyword) ||

            taxPercentage.includes(keyword) ||

            createdBy.includes(keyword)

        );

    });

});


// ================================================================
// RESET FORM
// ================================================================

const resetForm = () => {

    form.value = emptyForm();

    editingTaxId.value = null;

};


// ================================================================
// CREATE
// ================================================================

const openCreateModal = () => {

    isEditMode.value = false;

    resetForm();

    if (modalRef.value) {

        modalRef.value.show();

    } else {

        console.error(
            "Tax information modal reference is not available."
        );

    }

};


// ================================================================
// EDIT
// ================================================================

const openEditModal = async (tax) => {

    try {

        saving.value = true;

        const response =
            await getTaxInfoById(tax.id);

        const taxData =
            response?.data || response;


        isEditMode.value = true;

        editingTaxId.value =
            taxData.id;


        form.value = {

            taxName:
                taxData.taxName || "",

            taxPercentage:
                taxData.taxPercentage ?? 0

        };


        if (modalRef.value) {

            modalRef.value.show();

        }

    } catch (error) {

        console.error(
            "Failed to load tax information:",
            error
        );

        alert(
            error?.response?.data?.message ||
            "Failed to load tax information."
        );

    } finally {

        saving.value = false;

    }

};


// ================================================================
// CLOSE
// ================================================================

const closeModal = () => {

    if (saving.value) {
        return;
    }

    if (modalRef.value) {
        modalRef.value.hide();
    }

    isEditMode.value = false;

    editingTaxId.value = null;

    form.value = emptyForm();

};


// ================================================================
// SELECT COMMON TAX RATE
// ================================================================

const selectTaxPercentage = (percentage) => {

    form.value.taxPercentage = percentage;

};


// ================================================================
// SAVE
// ================================================================

const saveTaxInfo = async () => {

    // ------------------------------------------------------------
    // VALIDATION
    // ------------------------------------------------------------

    if (!form.value.taxName?.trim()) {

        alert("Please enter tax name.");

        return;

    }


    if (
        form.value.taxPercentage === null ||
        form.value.taxPercentage === undefined ||
        form.value.taxPercentage === ""
    ) {

        alert("Please enter tax percentage.");

        return;

    }


    const taxPercentage =
        Number(form.value.taxPercentage);


    if (Number.isNaN(taxPercentage)) {

        alert("Please enter a valid tax percentage.");

        return;

    }


    if (taxPercentage < 0) {

        alert(
            "Tax percentage cannot be less than 0."
        );

        return;

    }


    if (taxPercentage > 100) {

        alert(
            "Tax percentage cannot be greater than 100."
        );

        return;

    }


    try {

        saving.value = true;


        // --------------------------------------------------------
        // PAYLOAD
        // Matches TaxInfoRequestDTO
        // --------------------------------------------------------

        const payload = {

            taxName:
                form.value.taxName.trim(),

            taxPercentage:
                taxPercentage

        };


        // --------------------------------------------------------
        // UPDATE
        // --------------------------------------------------------

        if (isEditMode.value) {

            await updateTaxInfo(
                editingTaxId.value,
                payload
            );

            alert(
                "Tax information updated successfully."
            );

        }


        // --------------------------------------------------------
        // CREATE
        // --------------------------------------------------------

        else {

            await createTaxInfo(
                payload
            );

            alert(
                "Tax information created successfully."
            );

        }


        // --------------------------------------------------------
        // RELOAD
        // --------------------------------------------------------

        await loadTaxInfo();


        // --------------------------------------------------------
        // CLOSE
        // --------------------------------------------------------

        if (modalRef.value) {

            modalRef.value.hide();

        }

        resetForm();

        isEditMode.value = false;

    } catch (error) {

        console.error(
            "Save tax information error:",
            error
        );

        alert(
            error?.response?.data?.message ||
            "Something went wrong while saving tax information."
        );

    } finally {

        saving.value = false;

    }

};


// ================================================================
// DELETE
// ================================================================

const confirmDelete = async (tax) => {

    const confirmed =
        window.confirm(
            `Are you sure you want to delete "${tax.taxName}"?`
        );


    if (!confirmed) {

        return;

    }


    try {

        await deleteTaxInfoApi(
            tax.id
        );


        await loadTaxInfo();


        alert(
            "Tax information deleted successfully."
        );

    } catch (error) {

        console.error(
            "Failed to delete tax information:",
            error
        );

        alert(
            error?.response?.data?.message ||
            "Failed to delete tax information."
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
// FORMAT DATE
// ================================================================

const formatDate = (dateValue) => {

    if (!dateValue) {

        return "-";

    }


    const date =
        new Date(dateValue);


    if (Number.isNaN(date.getTime())) {

        return "-";

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

};


// ================================================================
// LOAD
// ================================================================

const loadTaxInfo = async () => {

    loading.value = true;


    try {

        const response =
            await getTaxInfo();


        if (Array.isArray(response)) {

            taxInfo.value =
                response;

        }

        else if (
            Array.isArray(response?.data)
        ) {

            taxInfo.value =
                response.data;

        }

        else {

            taxInfo.value = [];

        }

    } catch (error) {

        console.error(
            "Error loading tax information:",
            error
        );

        taxInfo.value = [];

        alert(
            error?.response?.data?.message ||
            "Failed to load tax information."
        );

    } finally {

        loading.value = false;

    }

};


// ================================================================
// MOUNT
// ================================================================

onMounted(() => {

    loadTaxInfo();

});

</script>


<style scoped>

/* ================================================================
   PAGE
================================================================ */

.tax-info-management-page {

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

.add-tax-btn {

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

    box-shadow:
        0 3px 12px rgba(15, 35, 55, 0.04);

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

    box-shadow:
        0 0 0 3px rgba(27, 94, 140, 0.08);

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

    box-shadow:
        0 0 0 3px rgba(27, 94, 140, 0.08);

}

.form-help-text {

    display: block;

    margin-top: 5px;

    color: #8995a0;

    font-size: 10px;

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
   TABLE HEADER
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

.tax-row {

    transition: background 0.18s ease;

}

.tax-row:hover {

    background: #fbfcfd;

}

.tax-row:last-child td {

    border-bottom: 0;

}


/* ================================================================
   COLUMN WIDTHS
================================================================ */

.col-number {

    width: 55px;

}

.col-tax {

    min-width: 260px;

}

.col-percentage {

    min-width: 170px;

}

.col-created {

    min-width: 180px;

}

.col-created-by {

    min-width: 120px;

}

.col-action {

    width: 110px;

    text-align: center;

}


/* ================================================================
   TAX
================================================================ */

.tax-name-cell {

    display: flex;

    align-items: center;

    gap: 11px;

}

.tax-avatar {

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

.tax-name-content {

    min-width: 0;

}

.tax-name {

    color: var(--color-heading, #162536);

    font-size: 14px;

    font-weight: 600;

    line-height: 1.35;

}

.tax-id {

    margin-top: 3px;

    color: #9aa5af;

    font-size: 10px;

}


/* ================================================================
   PERCENTAGE
================================================================ */

.percentage-cell {

    display: flex;

    align-items: center;

}

.percentage-badge {

    display: inline-flex;

    align-items: center;

    gap: 6px;

    padding: 6px 11px;

    border-radius: 20px;

    background: #edf5fc;

    color: #1b5e8c;

    font-size: 11px;

    font-weight: 700;

}


/* ================================================================
   CREATED
================================================================ */

.created-cell {

    line-height: 1.4;

}

.created-date {

    color: #687786;

    font-size: 12px;

}


/* ================================================================
   CREATED BY
================================================================ */

.created-by-cell {

    display: flex;

    align-items: center;

    gap: 7px;

    color: #687786;

    font-size: 12px;

}

.created-by-cell i {

    color: #8795a2;

}


/* ================================================================
   ACTIONS
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
   EMPTY
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

.tax-modal-content {

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
   PERCENTAGE INPUT
================================================================ */

.percentage-input-wrapper {

    position: relative;

}

.percentage-input {

    padding-right: 42px;

}

.percentage-symbol {

    position: absolute;

    right: 14px;

    top: 50%;

    transform: translateY(-50%);

    color: #7d8995;

    font-size: 13px;

    font-weight: 600;

}


/* ================================================================
   GST RATE OPTIONS
================================================================ */

.gst-rate-options {

    display: flex;

    flex-wrap: wrap;

    gap: 9px;

}

.gst-rate-btn {

    min-width: 62px;

    min-height: 38px;

    padding: 7px 14px;

    border: 1px solid var(--color-border, #e1e7ed);

    border-radius: 7px;

    background: #ffffff;

    color: #566575;

    font-size: 12px;

    font-weight: 600;

    cursor: pointer;

    transition:
        background 0.18s ease,
        border-color 0.18s ease,
        color 0.18s ease,
        transform 0.18s ease;

}

.gst-rate-btn:hover {

    transform: translateY(-1px);

    border-color: var(--color-primary, #1b5e8c);

    color: var(--color-primary, #1b5e8c);

}

.gst-rate-btn.selected {

    background: var(--color-primary-light, #edf5fc);

    border-color: var(--color-primary, #1b5e8c);

    color: var(--color-primary, #1b5e8c);

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

}


@media (max-width: 767.98px) {

    .tax-info-management-page {

        padding-left: 8px;

        padding-right: 8px;

    }

    .page-header-content {

        flex-direction: column;

        align-items: stretch;

    }

    .add-tax-btn {

        width: 100%;

    }

    .reset-wrapper {

        justify-content: stretch;

    }

    .reset-btn {

        width: 100%;

    }

    .gst-rate-options {

        gap: 7px;

    }

}

</style>
