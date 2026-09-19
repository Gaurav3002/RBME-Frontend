<template>
    <div class="container-fluid permission-management-page">

        <!-- =========================================================
             PAGE HEADER
        ========================================================== -->
        <div class="page-header">
            <div class="page-header-content">

                <div class="page-title-wrap">
                    <div class="page-title-icon">
                        <i class="bi bi-shield-lock"></i>
                    </div>

                    <div>
                        <h3 class="page-title">Permission Management</h3>
                        <p class="page-subtitle">Manage system permissions and access controls.</p>
                    </div>
                </div>

                <!-- CREATE PERMISSION -->
                <button v-if="hasPermission('PERMISSION_CREATE')" type="button" class="btn btn-primary add-permission-btn" @click="openCreateModal">
                    <i class="bi bi-plus-circle me-2"></i>
                    Add Permission
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
                    <div class="col-md-6">
                        <label class="admin-form-label">Search Permission</label>

                        <div class="search-wrapper">
                            <div class="search-icon">
                                <i class="bi bi-search"></i>
                            </div>

                            <input type="text" class="form-control admin-search-input" placeholder="Search by name, code or description..." v-model="searchQuery" />

                            <button v-if="searchQuery" type="button" class="search-clear" @click="searchQuery = ''" title="Clear search">
                                <i class="bi bi-x-circle"></i>
                            </button>
                        </div>
                    </div>


                    <!-- STATUS -->
                    <div class="col-md-3">
                        <label class="admin-form-label">Status</label>

                        <select v-model="statusFilter" class="form-select admin-form-control">
                            <option value="">All Status</option>
                            <option :value="true">Active</option>
                            <option :value="false">Inactive</option>
                        </select>
                    </div>


                    <!-- RESET -->
                    <div class="col-md-3 reset-wrapper">
                        <button type="button" class="btn btn-outline-secondary reset-btn" @click="clearFilters">
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
        <div class="card admin-card admin-shared-card permission-table-card">

            <!-- TABLE HEADER -->
            <div class="card-header admin-card-header admin-shared-card-header">
                <div>
                    <h5 class="admin-card-title admin-shared-card-title">Permissions</h5>

                    <span class="admin-card-count admin-shared-card-count">
                        {{ filteredPermissions.length }}
                        {{ filteredPermissions.length === 1 ? 'permission' : 'permissions' }}
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
                                <th class="col-number">#</th>
                                <th class="col-name">Permission Name</th>
                                <th class="col-code">Permission Code</th>
                                <th class="col-description">Description</th>
                                <th class="col-status">Status</th>
                                <th v-if="hasPermission('PERMISSION_EDIT') || hasPermission('PERMISSION_DELETE')" class="col-action">Action</th>
                            </tr>
                        </thead>


                        <!-- BODY -->
                        <tbody>

                            <!-- LOADING -->
                            <tr v-if="loading">
                                <td :colspan="hasPermission('PERMISSION_EDIT') || hasPermission('PERMISSION_DELETE') ? 6 : 5" class="empty-table-cell">
                                    <div class="loading-state">
                                        <div class="spinner-border"></div>
                                        <span>Loading permissions...</span>
                                    </div>
                                </td>
                            </tr>


                            <!-- EMPTY -->
                            <tr v-else-if="filteredPermissions.length === 0">
                                <td :colspan="hasPermission('PERMISSION_EDIT') || hasPermission('PERMISSION_DELETE') ? 6 : 5" class="empty-table-cell">

                                    <div class="empty-state">

                                        <div class="empty-state-icon">
                                            <i class="bi bi-shield-lock"></i>
                                        </div>

                                        <h5>No Permissions Found</h5>

                                        <p>
                                            {{ searchQuery ? "No permissions match your search." : "No permissions have been added yet." }}
                                        </p>

                                        <button v-if="searchQuery" type="button" class="btn btn-outline-primary btn-sm" @click="searchQuery = ''">
                                            Clear Search
                                        </button>

                                    </div>

                                </td>
                            </tr>


                            <!-- DATA -->
                            <tr v-else v-for="(permission, index) in filteredPermissions" :key="permission.id" class="permission-row">

                                <!-- NUMBER -->
                                <td>{{ index + 1 }}</td>


                                <!-- NAME -->
                                <td>
                                    <div class="permission-name-cell">

                                        <div class="permission-avatar">
                                            <i class="bi bi-shield-check"></i>
                                        </div>

                                        <div class="permission-name-content">

                                            <div class="permission-name">
                                                {{ permission.name || "-" }}
                                            </div>

                                            <div class="permission-id">
                                                ID: {{ permission.id }}
                                            </div>

                                        </div>

                                    </div>
                                </td>


                                <!-- CODE -->
                                <td>
                                    <span class="permission-code">{{ permission.code || "-" }}</span>
                                </td>


                                <!-- DESCRIPTION -->
                                <td>
                                    <div class="description-cell">{{ permission.description || "-" }}</div>
                                </td>


                                <!-- STATUS -->
                                <td>
                                    <span class="status-badge" :class="permission.active ? 'status-active' : 'status-inactive'">
                                        <span class="status-dot"></span>
                                        {{ permission.active ? "Active" : "Inactive" }}
                                    </span>
                                </td>


                                <!-- ACTION -->
                                <td v-if="hasPermission('PERMISSION_EDIT') || hasPermission('PERMISSION_DELETE')">

                                    <div class="action-buttons">

                                        <!-- EDIT -->
                                        <button v-if="hasPermission('PERMISSION_EDIT')" type="button" class="action-btn edit-btn" title="Edit Permission" @click="openEditModal(permission)">
                                            <i class="bi bi-pencil"></i>
                                        </button>

                                        <!-- DELETE -->
                                        <button v-if="hasPermission('PERMISSION_DELETE')" type="button" class="action-btn delete-btn" title="Delete Permission" @click="confirmDelete(permission)">
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
         CREATE / EDIT PERMISSION MODAL
    ============================================================= -->

    <BaseModal ref="modalRef" id="permissionModal" :title="isEditMode ? 'Edit Permission' : 'Create Permission'">

        <div class="permission-modal-content">

            <!-- =====================================================
                 PERMISSION INFORMATION
            ====================================================== -->
            <div class="form-section">

                <div class="form-section-header">

                    <div class="form-section-icon">
                        <i class="bi bi-shield-check"></i>
                    </div>

                    <div>
                        <h6>Permission Information</h6>
                        <p>Define the permission name and unique code.</p>
                    </div>

                </div>


                <div class="row g-3">

                    <!-- NAME -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Permission Name
                            <span class="required">*</span>
                        </label>

                        <input type="text" class="form-control admin-form-control" placeholder="Example: Create User" maxlength="100" v-model.trim="form.name" />

                    </div>


                    <!-- CODE -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Permission Code
                            <span class="required">*</span>
                        </label>

                        <input type="text" class="form-control admin-form-control text-uppercase" placeholder="Example: USER_CREATE" maxlength="100" v-model="form.code" @input="form.code = form.code.toUpperCase().replace(/\s+/g, '_')" />

                        <small class="form-help-text">
                            Use a unique code such as USER_VIEW, USER_CREATE or USER_EDIT.
                        </small>

                    </div>


                    <!-- DESCRIPTION -->
                    <div class="col-12">

                        <label class="admin-form-label">Description</label>

                        <textarea class="form-control admin-form-control" rows="3" maxlength="500" placeholder="Enter permission description" v-model.trim="form.description"></textarea>

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
                        <strong>Permission Status</strong>

                        <span>
                            Enable this permission to allow it to be assigned to roles.
                        </span>
                    </div>

                    <label class="custom-switch">
                        <input type="checkbox" v-model="form.active" />
                        <span class="switch-slider"></span>
                    </label>

                </div>

            </div>

        </div>


        <!-- =========================================================
             MODAL FOOTER
        ========================================================== -->
        <template #footer>

            <button type="button" class="btn btn-light modal-cancel-btn" data-bs-dismiss="modal" :disabled="saving" @click="closeModal">
                Cancel
            </button>

            <button type="button" class="btn btn-primary modal-save-btn" :disabled="saving" @click="savePermission">

                <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>

                <i v-else class="bi" :class="isEditMode ? 'bi-check-circle' : 'bi-plus-circle'"></i>

                {{ saving ? "Saving..." : isEditMode ? "Update Permission" : "Create Permission" }}

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
    getPermissions,
    createPermission,
    updatePermission,
    deletePermission as deletePermissionApi
} from "@/api/permission.api.js";

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

const permissions = ref([]);

const loading = ref(false);

const saving = ref(false);

const searchQuery = ref("");

const statusFilter = ref("");

const isEditMode = ref(false);

const editingPermissionId = ref(null);


// ================================================================
// FORM
// ================================================================

const emptyForm = () => ({
    name: "",
    code: "",
    description: "",
    active: true
});

const form = ref(emptyForm());


// ================================================================
// FILTERED PERMISSIONS
// ================================================================

const filteredPermissions = computed(() => {

    const keyword = searchQuery.value.trim().toLowerCase();

    return permissions.value.filter(permission => {

        const name = String(permission.name || "").toLowerCase();

        const code = String(permission.code || "").toLowerCase();

        const description = String(permission.description || "").toLowerCase();

        const matchesSearch =
            !keyword ||
            name.includes(keyword) ||
            code.includes(keyword) ||
            description.includes(keyword);

        const matchesStatus =
            statusFilter.value === "" ||
            permission.active === statusFilter.value;

        return matchesSearch && matchesStatus;

    });

});


// ================================================================
// RESET FORM
// ================================================================

const resetForm = () => {

    form.value = emptyForm();

    editingPermissionId.value = null;

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

        console.error("Permission modal reference is not available.");

    }

};


// ================================================================
// OPEN EDIT MODAL
// ================================================================

const openEditModal = (permission) => {

    isEditMode.value = true;

    editingPermissionId.value = permission.id;

    form.value = {
        name: permission.name || "",
        code: permission.code || "",
        description: permission.description || "",
        active: permission.active ?? true
    };

    if (modalRef.value) {

        modalRef.value.show();

    } else {

        console.error("Permission modal reference is not available.");

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

    editingPermissionId.value = null;

    form.value = emptyForm();

};


// ================================================================
// SAVE PERMISSION
// ================================================================

const savePermission = async () => {

    // ============================================================
    // VALIDATION
    // ============================================================

    if (!form.value.name?.trim()) {

        alert("Please enter permission name.");

        return;

    }

    if (!form.value.code?.trim()) {

        alert("Please enter permission code.");

        return;

    }


    try {

        saving.value = true;


        // ========================================================
        // PAYLOAD
        // ========================================================

        const payload = {
            name: form.value.name.trim(),
            code: form.value.code.trim().toUpperCase(),
            description: form.value.description?.trim() || "",
            active: form.value.active
        };


        // ========================================================
        // UPDATE
        // ========================================================

        if (isEditMode.value) {

            await updatePermission(
                editingPermissionId.value,
                payload
            );

            alert("Permission updated successfully.");

        }

        // ========================================================
        // CREATE
        // ========================================================

        else {

            await createPermission(payload);

            alert("Permission created successfully.");

        }


        // ========================================================
        // RELOAD
        // ========================================================

        await loadPermissions();


        // ========================================================
        // CLOSE
        // ========================================================

        if (modalRef.value) {

            modalRef.value.hide();

        }

        resetForm();

        isEditMode.value = false;


    } catch (error) {

        console.error("Save permission error:", error);

        alert(
            error?.response?.data?.message ||
            "Something went wrong while saving the permission."
        );

    } finally {

        saving.value = false;

    }

};


// ================================================================
// DELETE PERMISSION
// ================================================================

const confirmDelete = async (permission) => {

    const confirmed = window.confirm(
        `Are you sure you want to delete "${permission.name}"?`
    );

    if (!confirmed) {
        return;
    }


    try {

        await deletePermissionApi(permission.id);

        await loadPermissions();

        alert("Permission deleted successfully.");

    } catch (error) {

        console.error("Failed to delete permission:", error);

        alert(
            error?.response?.data?.message ||
            "Failed to delete permission."
        );

    }

};


// ================================================================
// CLEAR FILTERS
// ================================================================

const clearFilters = () => {

    searchQuery.value = "";

    statusFilter.value = "";

};


// ================================================================
// LOAD PERMISSIONS
// ================================================================

const loadPermissions = async () => {

    loading.value = true;


    try {

        const response = await getPermissions();


        if (Array.isArray(response)) {

            permissions.value = response;

        } else if (Array.isArray(response?.data)) {

            permissions.value = response.data;

        } else {

            permissions.value = [];

        }


    } catch (error) {

        console.error("Error loading permissions:", error);

        permissions.value = [];

        alert("Failed to load permissions.");

    } finally {

        loading.value = false;

    }

};


// ================================================================
// MOUNT
// ================================================================

onMounted(() => {

    loadPermissions();

});

</script>


<style scoped>

/* ================================================================
   PAGE
================================================================ */

.permission-management-page {
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

.add-permission-btn {
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

textarea.admin-form-control {
    min-height: 90px;
    resize: vertical;
}

.form-help-text {
    display: block;
    margin-top: 6px;
    color: #8995a0;
    font-size: 11px;
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

.permission-row {
    transition: background 0.18s ease;
}

.permission-row:hover {
    background: #fbfcfd;
}

.permission-row:last-child td {
    border-bottom: 0;
}


/* ================================================================
   COLUMN WIDTHS
================================================================ */

.col-number {
    width: 60px;
}

.col-name {
    min-width: 220px;
}

.col-code {
    min-width: 180px;
}

.col-description {
    min-width: 260px;
}

.col-status {
    width: 120px;
}

.col-action {
    width: 110px;
    text-align: center;
}


/* ================================================================
   PERMISSION NAME
================================================================ */

.permission-name-cell {
    display: flex;
    align-items: center;
    gap: 11px;
}

.permission-avatar {
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

.permission-name-content {
    min-width: 0;
}

.permission-name {
    color: var(--color-heading, #162536);
    font-size: 14px;
    font-weight: 600;
    line-height: 1.35;
}

.permission-id {
    margin-top: 3px;
    color: #9aa5af;
    font-size: 10px;
}


/* ================================================================
   PERMISSION CODE
================================================================ */

.permission-code {
    display: inline-block;
    background: #f1f3f5;
    color: #495057;
    border-radius: 5px;
    padding: 5px 9px;
    font-size: 12px;
    font-family: monospace;
    font-weight: 600;
}


/* ================================================================
   DESCRIPTION
================================================================ */

.description-cell {
    max-width: 360px;
    color: #687786;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.18s ease;
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

.permission-modal-content {
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

    .description-cell {
        max-width: 250px;
    }

}


@media (max-width: 767.98px) {

    .permission-management-page {
        padding-left: 8px;
        padding-right: 8px;
    }

    .page-header-content {
        flex-direction: column;
        align-items: stretch;
    }

    .add-permission-btn {
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

    .permission-avatar {
        width: 34px;
        height: 34px;
    }

    .permission-id {
        display: none;
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

