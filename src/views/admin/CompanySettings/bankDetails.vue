<template>
    <div class="container-fluid bank-details-management-page">

        <!-- =========================================================
             PAGE HEADER
        ========================================================== -->

        <div class="page-header">
            <div class="page-header-content">

                <div class="page-title-wrap">

                    <div class="page-title-icon">
                        <i class="bi bi-bank"></i>
                    </div>

                    <div>
                        <h3 class="page-title">
                            Bank Details
                        </h3>

                        <p class="page-subtitle">
                            Manage company bank accounts and payment banking information.
                        </p>
                    </div>

                </div>

                <!-- CREATE -->
                <button
                    v-if="hasPermission('CREATE_BANKDETAILS')"
                    type="button"
                    class="btn btn-primary add-bank-btn"
                    @click="openCreateModal"
                >
                    <i class="bi bi-plus-circle me-2"></i>
                    Add Bank Account
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
                            Search Bank Account
                        </label>

                        <div class="search-wrapper">

                            <div class="search-icon">
                                <i class="bi bi-search"></i>
                            </div>

                            <input
                                type="text"
                                class="form-control admin-search-input"
                                placeholder="Search by bank name, branch, account holder, IFSC or account number..."
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

        <div class="card admin-card bank-table-card">

            <!-- TABLE HEADER -->

            <div class="card-header admin-card-header">

                <div>
                    <h5 class="admin-card-title">
                        Bank Accounts
                    </h5>

                    <span class="admin-card-count">
                        {{ filteredBankDetails.length }}
                        {{
                            filteredBankDetails.length === 1
                                ? "account"
                                : "accounts"
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

                                <th class="col-bank">
                                    Bank
                                </th>

                                <th class="col-account">
                                    Account Details
                                </th>

                                <th class="col-branch">
                                    Branch
                                </th>

                                <th class="col-type">
                                    Account Type
                                </th>

                                <th class="col-currency">
                                    Currency
                                </th>

                                <th class="col-status">
                                    Status
                                </th>

                                <th
                                    v-if="
                                        hasPermission('UPDATE_BANKDETAILS') ||
                                        hasPermission('DELETE_BANKDETAILS')
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
                                        hasPermission('UPDATE_BANKDETAILS') ||
                                        hasPermission('DELETE_BANKDETAILS')
                                            ? 8
                                            : 7
                                    "
                                    class="empty-table-cell"
                                >

                                    <div class="loading-state">

                                        <div class="spinner-border"></div>

                                        <span>
                                            Loading bank details...
                                        </span>

                                    </div>

                                </td>

                            </tr>


                            <!-- EMPTY -->

                            <tr
                                v-else-if="filteredBankDetails.length === 0"
                            >

                                <td
                                    :colspan="
                                        hasPermission('UPDATE_BANKDETAILS') ||
                                        hasPermission('DELETE_BANKDETAILS')
                                            ? 8
                                            : 7
                                    "
                                    class="empty-table-cell"
                                >

                                    <div class="empty-state">

                                        <div class="empty-state-icon">
                                            <i class="bi bi-bank"></i>
                                        </div>

                                        <h5>
                                            No Bank Accounts Found
                                        </h5>

                                        <p>
                                            {{
                                                searchQuery
                                                    ? "No bank accounts match your search."
                                                    : "No bank accounts have been added yet."
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
                                v-for="(bank, index) in filteredBankDetails"
                                :key="bank.id"
                                class="bank-row"
                            >

                                <!-- NUMBER -->

                                <td>
                                    {{ index + 1 }}
                                </td>


                                <!-- BANK -->

                                <td>

                                    <div class="bank-name-cell">

                                        <div class="bank-avatar">
                                            <i class="bi bi-bank"></i>
                                        </div>

                                        <div class="bank-name-content">

                                            <div class="bank-name">
                                                {{ bank.bankName || "-" }}
                                            </div>

                                            <div class="bank-id">
                                                ID: {{ bank.id }}
                                            </div>

                                        </div>

                                    </div>

                                </td>


                                <!-- ACCOUNT -->

                                <td>

                                    <div class="account-cell">

                                        <div class="account-holder">

                                            <i class="bi bi-person"></i>

                                            <span>
                                                {{ bank.accountHolderName || "-" }}
                                            </span>

                                        </div>

                                        <div class="account-number">

                                            <i class="bi bi-credit-card"></i>

                                            <span>
                                                {{ bank.accountNumber || "-" }}
                                            </span>

                                        </div>

                                        <div class="ifsc-code">
                                            IFSC:
                                            {{ bank.ifscCode || "-" }}
                                        </div>

                                    </div>

                                </td>


                                <!-- BRANCH -->

                                <td>

                                    <div class="branch-cell">

                                        <div class="branch-name">
                                            {{ bank.branchName || "-" }}
                                        </div>

                                    </div>

                                </td>


                                <!-- ACCOUNT TYPE -->

                                <td>

                                    <span
                                        v-if="bank.accountType === 'CURRENT'"
                                        class="type-badge current-badge"
                                    >
                                        <i class="bi bi-wallet2"></i>
                                        Current
                                    </span>

                                    <span
                                        v-else-if="bank.accountType === 'SAVINGS'"
                                        class="type-badge savings-badge"
                                    >
                                        <i class="bi bi-piggy-bank"></i>
                                        Savings
                                    </span>

                                    <span v-else>
                                        -
                                    </span>

                                </td>


                                <!-- CURRENCY -->

                                <td>

                                    <div class="currency-cell">

                                        <span class="currency-badge">

                                            <i class="bi bi-currency-exchange"></i>

                                            {{ bank.currency || "-" }}

                                        </span>

                                    </div>

                                </td>


                                <!-- STATUS -->

                                <td>

                                    <div class="status-cell">

                                        <!-- PRIMARY -->

                                        <span
                                            v-if="bank.primaryAccount"
                                            class="primary-badge"
                                        >
                                            <span class="status-dot"></span>
                                            Primary
                                        </span>

                                        <span
                                            v-else
                                            class="secondary-badge"
                                        >
                                            <span class="status-dot"></span>
                                            Secondary
                                        </span>


                                        <!-- ACTIVE -->

                                        <span
                                            v-if="bank.status === 'ACTIVE'"
                                            class="active-badge"
                                        >
                                            Active
                                        </span>

                                        <!-- INACTIVE -->

                                        <span
                                            v-else
                                            class="inactive-badge"
                                        >
                                            Inactive
                                        </span>

                                    </div>

                                </td>


                                <!-- ACTION -->

                                <td
                                    v-if="
                                        hasPermission('UPDATE_BANKDETAILS') ||
                                        hasPermission('DELETE_BANKDETAILS')
                                    "
                                >

                                    <div class="action-buttons">

                                        <!-- EDIT -->

                                        <button
                                            v-if="hasPermission('UPDATE_BANKDETAILS')"
                                            type="button"
                                            class="action-btn edit-btn"
                                            title="Edit Bank Account"
                                            @click="openEditModal(bank)"
                                        >
                                            <i class="bi bi-pencil"></i>
                                        </button>


                                        <!-- DELETE -->

                                        <button
                                            v-if="hasPermission('DELETE_BANKDETAILS')"
                                            type="button"
                                            class="action-btn delete-btn"
                                            title="Delete Bank Account"
                                            @click="confirmDelete(bank)"
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
            id="bankDetailsModal"
            :title="
                isEditMode
                    ? 'Edit Bank Details'
                    : 'Create Bank Details'
            "
        >

            <div class="bank-modal-content">

                <!-- =================================================
                     BANK INFORMATION
                ================================================== -->

                <div class="form-section">

                    <div class="form-section-header">

                        <div class="form-section-icon">
                            <i class="bi bi-bank"></i>
                        </div>

                        <div>

                            <h6>
                                Bank Information
                            </h6>

                            <p>
                                Enter the basic bank account information.
                            </p>

                        </div>

                    </div>


                    <div class="row g-3">

                        <!-- BANK NAME -->

                        <div class="col-md-6">

                            <label class="admin-form-label">
                                Bank Name
                                <span class="required">*</span>
                            </label>

                            <input
                                type="text"
                                class="form-control admin-form-control"
                                placeholder="Enter bank name"
                                maxlength="150"
                                v-model.trim="form.bankName"
                            />

                        </div>


                        <!-- BRANCH NAME -->

                        <div class="col-md-6">

                            <label class="admin-form-label">
                                Branch Name
                                <span class="required">*</span>
                            </label>

                            <input
                                type="text"
                                class="form-control admin-form-control"
                                placeholder="Enter branch name"
                                maxlength="200"
                                v-model.trim="form.branchName"
                            />

                        </div>


                        <!-- ACCOUNT HOLDER -->

                        <div class="col-md-6">

                            <label class="admin-form-label">
                                Account Holder Name
                                <span class="required">*</span>
                            </label>

                            <input
                                type="text"
                                class="form-control admin-form-control"
                                placeholder="Enter account holder name"
                                maxlength="200"
                                v-model.trim="form.accountHolderName"
                            />

                        </div>


                        <!-- ACCOUNT TYPE -->

                        <div class="col-md-6">

                            <label class="admin-form-label">
                                Account Type
                                <span class="required">*</span>
                            </label>

                            <select
                                class="form-select admin-form-control"
                                v-model="form.accountType"
                            >

                                <option value="">
                                    Select account type
                                </option>

                                <option value="CURRENT">
                                    Current
                                </option>

                                <option value="SAVINGS">
                                    Savings
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                <!-- =================================================
                     ACCOUNT INFORMATION
                ================================================== -->

                <div class="form-section">

                    <div class="form-section-header">

                        <div class="form-section-icon">
                            <i class="bi bi-credit-card"></i>
                        </div>

                        <div>

                            <h6>
                                Account Information
                            </h6>

                            <p>
                                Enter account number and IFSC information.
                            </p>

                        </div>

                    </div>


                    <div class="row g-3">

                        <!-- ACCOUNT NUMBER -->

                        <div class="col-md-6">

                            <label class="admin-form-label">
                                Account Number
                                <span class="required">*</span>
                            </label>

                            <input
                                type="text"
                                class="form-control admin-form-control"
                                placeholder="Enter account number"
                                maxlength="50"
                                v-model.trim="form.accountNumber"
                            />

                        </div>


                        <!-- IFSC -->

                        <div class="col-md-6">

                            <label class="admin-form-label">
                                IFSC Code
                                <span class="required">*</span>
                            </label>

                            <input
                                type="text"
                                class="form-control admin-form-control text-uppercase"
                                placeholder="Example: HDFC0001234"
                                maxlength="20"
                                v-model="form.ifscCode"
                                @input="
                                    form.ifscCode =
                                        form.ifscCode.toUpperCase()
                                "
                            />

                        </div>


                        <!-- CURRENCY -->

                        <div class="col-md-6">

                            <label class="admin-form-label">
                                Currency
                                <span class="required">*</span>
                            </label>

                            <select
                                class="form-select admin-form-control"
                                v-model="form.currency"
                            >

                                <option value="">
                                    Select currency
                                </option>

                                <option value="INR">
                                    INR - Indian Rupee
                                </option>
                            </select>

                        </div>

                    </div>

                </div>


                <!-- =================================================
                     ACCOUNT SETTINGS
                ================================================== -->

                <div class="form-section">

                    <div class="form-section-header">

                        <div class="form-section-icon">
                            <i class="bi bi-gear"></i>
                        </div>

                        <div>

                            <h6>
                                Account Settings
                            </h6>

                            <p>
                                Configure primary account and account status.
                            </p>

                        </div>

                    </div>


                    <div class="row g-3">

                        <!-- PRIMARY ACCOUNT -->

                        <div class="col-md-6">

                            <label class="admin-form-label">
                                Primary Account
                            </label>

                            <select
                                class="form-select admin-form-control"
                                v-model="form.primaryAccount"
                            >

                                <option :value="false">
                                    No
                                </option>

                                <option :value="true">
                                    Yes
                                </option>

                            </select>

                        </div>


                        <!-- STATUS -->

                        <div class="col-md-6">

                            <label class="admin-form-label">
                                Account Status
                            </label>

                            <select
                                class="form-select admin-form-control"
                                v-model="form.status"
                            >

                                <option value="ACTIVE">
                                    Active
                                </option>

                                <option value="INACTIVE">
                                    Inactive
                                </option>

                            </select>

                        </div>

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
                    @click="saveBankDetails"
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
                                ? "Update Bank Account"
                                : "Create Bank Account"
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
    getBankDetails,
    getBankDetailsById,
    createBankDetails,
    updateBankDetails,
    deleteBankDetails as deleteBankDetailsApi
} from "@/api/CompanyInfoApis/bankDetails.api.js";

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

const bankDetails = ref([]);

const loading = ref(false);

const saving = ref(false);

const searchQuery = ref("");

const isEditMode = ref(false);

const editingBankId = ref(null);


// ================================================================
// EMPTY FORM
// Matches BankDetailsRequestDto exactly
// ================================================================

const emptyForm = () => ({

    bankName: "",

    branchName: "",

    accountHolderName: "",

    accountNumber: "",

    ifscCode: "",

    accountType: "",

    currency: "INR",

    primaryAccount: false,

    status: "ACTIVE"

});


// ================================================================
// FORM
// ================================================================

const form = ref(emptyForm());


// ================================================================
// FILTER
// ================================================================

const filteredBankDetails = computed(() => {

    const keyword =
        searchQuery.value
            .trim()
            .toLowerCase();

    return bankDetails.value.filter(bank => {

        const bankName =
            String(bank.bankName || "")
                .toLowerCase();

        const branchName =
            String(bank.branchName || "")
                .toLowerCase();

        const accountHolderName =
            String(bank.accountHolderName || "")
                .toLowerCase();

        const accountNumber =
            String(bank.accountNumber || "")
                .toLowerCase();

        const ifscCode =
            String(bank.ifscCode || "")
                .toLowerCase();

        const accountType =
            String(bank.accountType || "")
                .toLowerCase();

        const currency =
            String(bank.currency || "")
                .toLowerCase();

        const status =
            String(bank.status || "")
                .toLowerCase();

        return (

            !keyword ||

            bankName.includes(keyword) ||

            branchName.includes(keyword) ||

            accountHolderName.includes(keyword) ||

            accountNumber.includes(keyword) ||

            ifscCode.includes(keyword) ||

            accountType.includes(keyword) ||

            currency.includes(keyword) ||

            status.includes(keyword)

        );

    });

});


// ================================================================
// RESET FORM
// ================================================================

const resetForm = () => {

    form.value = emptyForm();

    editingBankId.value = null;

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
            "Bank details modal reference is not available."
        );

    }

};


// ================================================================
// EDIT
// ================================================================

const openEditModal = async (bank) => {

    try {

        saving.value = true;

        const response =
            await getBankDetailsById(bank.id);

        const bankData =
            response?.data || response;


        isEditMode.value = true;

        editingBankId.value =
            bankData.id;


        form.value = {

            bankName:
                bankData.bankName || "",

            branchName:
                bankData.branchName || "",

            accountHolderName:
                bankData.accountHolderName || "",

            accountNumber:
                bankData.accountNumber || "",

            ifscCode:
                bankData.ifscCode || "",

            accountType:
                bankData.accountType || "",

            currency:
                bankData.currency || "INR",

            primaryAccount:
                bankData.primaryAccount ?? false,

            status:
                bankData.status || "ACTIVE"

        };


        if (modalRef.value) {

            modalRef.value.show();

        }

    } catch (error) {

        console.error(
            "Failed to load bank details:",
            error
        );

        alert(
            error?.response?.data?.message ||
            "Failed to load bank details."
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

    editingBankId.value = null;

    form.value = emptyForm();

};


// ================================================================
// SAVE
// ================================================================

const saveBankDetails = async () => {

    // ------------------------------------------------------------
    // VALIDATION
    // ------------------------------------------------------------

    if (!form.value.bankName?.trim()) {

        alert("Please enter bank name.");

        return;

    }


    if (!form.value.branchName?.trim()) {

        alert("Please enter branch name.");

        return;

    }


    if (!form.value.accountHolderName?.trim()) {

        alert("Please enter account holder name.");

        return;

    }


    if (!form.value.accountNumber?.trim()) {

        alert("Please enter account number.");

        return;

    }


    if (!form.value.ifscCode?.trim()) {

        alert("Please enter IFSC code.");

        return;

    }


    if (!form.value.accountType) {

        alert("Please select account type.");

        return;

    }


    if (!form.value.currency) {

        alert("Please select currency.");

        return;

    }


    if (!form.value.status) {

        alert("Please select account status.");

        return;

    }


    try {

        saving.value = true;


        // --------------------------------------------------------
        // PAYLOAD
        // Matches BankDetailsRequestDto exactly
        // --------------------------------------------------------

        const payload = {

            bankName:
                form.value.bankName.trim(),

            branchName:
                form.value.branchName.trim(),

            accountHolderName:
                form.value.accountHolderName.trim(),

            accountNumber:
                form.value.accountNumber.trim(),

            ifscCode:
                form.value.ifscCode
                    .trim()
                    .toUpperCase(),

            accountType:
                form.value.accountType,

            currency:
                form.value.currency,

            primaryAccount:
                Boolean(form.value.primaryAccount),

            status:
                form.value.status

        };


        // --------------------------------------------------------
        // UPDATE
        // --------------------------------------------------------

        if (isEditMode.value) {

            await updateBankDetails(
                editingBankId.value,
                payload
            );

            alert(
                "Bank details updated successfully."
            );

        }

        // --------------------------------------------------------
        // CREATE
        // --------------------------------------------------------

        else {

            await createBankDetails(
                payload
            );

            alert(
                "Bank details created successfully."
            );

        }


        // --------------------------------------------------------
        // RELOAD
        // --------------------------------------------------------

        await loadBankDetails();


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
            "Save bank details error:",
            error
        );

        alert(
            error?.response?.data?.message ||
            "Something went wrong while saving bank details."
        );

    } finally {

        saving.value = false;

    }

};


// ================================================================
// DELETE
// ================================================================

const confirmDelete = async (bank) => {

    const confirmed =
        window.confirm(
            `Are you sure you want to delete "${bank.bankName}" account?`
        );


    if (!confirmed) {
        return;
    }


    try {

        await deleteBankDetailsApi(
            bank.id
        );

        await loadBankDetails();

        alert(
            "Bank details deleted successfully."
        );

    } catch (error) {

        console.error(
            "Failed to delete bank details:",
            error
        );

        alert(
            error?.response?.data?.message ||
            "Failed to delete bank details."
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
// LOAD
// ================================================================

const loadBankDetails = async () => {

    loading.value = true;


    try {

        const response =
            await getBankDetails();


        if (Array.isArray(response)) {

            bankDetails.value =
                response;

        }

        else if (
            Array.isArray(response?.data)
        ) {

            bankDetails.value =
                response.data;

        }

        else {

            bankDetails.value = [];

        }

    } catch (error) {

        console.error(
            "Error loading bank details:",
            error
        );

        bankDetails.value = [];

        alert(
            error?.response?.data?.message ||
            "Failed to load bank details."
        );

    } finally {

        loading.value = false;

    }

};


// ================================================================
// MOUNT
// ================================================================

onMounted(() => {

    loadBankDetails();

});

</script>


<style scoped>

/* ================================================================
   PAGE
================================================================ */

.bank-details-management-page {
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

.add-bank-btn {
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

.bank-row {
    transition: background 0.18s ease;
}

.bank-row:hover {
    background: #fbfcfd;
}

.bank-row:last-child td {
    border-bottom: 0;
}


/* ================================================================
   COLUMN WIDTHS
================================================================ */

.col-number {
    width: 55px;
}

.col-bank {
    min-width: 210px;
}

.col-account {
    min-width: 260px;
}

.col-branch {
    min-width: 190px;
}

.col-type {
    min-width: 130px;
}

.col-currency {
    min-width: 120px;
}

.col-status {
    min-width: 150px;
}

.col-action {
    width: 110px;

    text-align: center;
}


/* ================================================================
   BANK
================================================================ */

.bank-name-cell {
    display: flex;
    align-items: center;

    gap: 11px;
}

.bank-avatar {
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

.bank-name-content {
    min-width: 0;
}

.bank-name {
    color: var(--color-heading, #162536);

    font-size: 14px;

    font-weight: 600;

    line-height: 1.35;
}

.bank-id {
    margin-top: 3px;

    color: #9aa5af;

    font-size: 10px;
}


/* ================================================================
   ACCOUNT
================================================================ */

.account-cell {
    display: flex;
    flex-direction: column;

    gap: 4px;
}

.account-holder {
    display: flex;
    align-items: center;

    gap: 7px;

    color: #4e5d69;

    font-size: 12px;
    font-weight: 600;
}

.account-holder i {
    color: #8795a2;
}

.account-number {
    display: flex;
    align-items: center;

    gap: 7px;

    color: #687786;

    font-size: 12px;

    font-family: monospace;
}

.account-number i {
    color: #8795a2;
}

.ifsc-code {
    color: #8995a0;

    font-size: 10px;

    font-family: monospace;
}


/* ================================================================
   BRANCH
================================================================ */

.branch-cell {
    line-height: 1.45;
}

.branch-name {
    color: #4e5d69;

    font-size: 12px;
}


/* ================================================================
   ACCOUNT TYPE
================================================================ */

.type-badge {
    display: inline-flex;

    align-items: center;

    gap: 6px;

    padding: 5px 9px;

    border-radius: 20px;

    font-size: 10px;

    font-weight: 600;

    white-space: nowrap;
}

.current-badge {
    background: #fff8e8;
    color: #a66c00;
}

.savings-badge {
    background: #edf5fc;
    color: #1b5e8c;
}


/* ================================================================
   CURRENCY
================================================================ */

.currency-cell {
    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 5px;
}

.currency-badge {
    display: inline-flex;

    align-items: center;

    gap: 6px;

    padding: 5px 9px;

    border-radius: 20px;

    background: #edf5fc;

    color: #1b5e8c;

    font-size: 10px;

    font-weight: 600;
}


/* ================================================================
   STATUS
================================================================ */

.status-cell {
    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 5px;
}

.primary-badge,
.secondary-badge {
    display: inline-flex;

    align-items: center;

    gap: 7px;

    padding: 5px 9px;

    border-radius: 20px;

    font-size: 10px;

    font-weight: 600;

    white-space: nowrap;
}

.primary-badge {
    color: #23814b;
    background: #eaf7ef;
}

.secondary-badge {
    color: #687786;
    background: #f1f3f5;
}

.status-dot {
    width: 6px;
    height: 6px;

    border-radius: 50%;

    background: currentColor;
}

.active-badge {
    color: #23814b;

    font-size: 10px;
}

.inactive-badge {
    color: #c24d4d;

    font-size: 10px;
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

.bank-modal-content {
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
    min-width: 170px;

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

    .bank-details-management-page {
        padding-left: 8px;
        padding-right: 8px;
    }

    .page-header-content {
        flex-direction: column;
        align-items: stretch;
    }

    .add-bank-btn {
        width: 100%;
    }

    .reset-wrapper {
        justify-content: stretch;
    }

    .reset-btn {
        width: 100%;
    }

}

</style>
