```vue
<template>

    <div class="container-fluid role-management-page">

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

                        <h3 class="page-title">
                            Role Management
                        </h3>

                        <p class="page-subtitle">
                            Manage roles and their access permissions.
                        </p>

                    </div>

                </div>


                <button
                    v-if="hasPermission('ROLE_CREATE')"
                    type="button"
                    class="btn btn-primary add-role-btn"
                    @click="openAddRoleModal"
                >
                    <i class="bi bi-plus-circle me-2"></i>
                    Add Role
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
                        placeholder="Search role by name or description..."
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

        </div>


        <!-- =========================================================
             TABLE CARD
        ========================================================== -->

        <div class="card admin-card admin-shared-card role-table-card">

            <div class="card-header admin-card-header admin-shared-card-header">

                <div>

                    <h5 class="admin-card-title admin-shared-card-title">
                        Roles
                    </h5>

                    <span class="admin-card-count admin-shared-card-count">

                        {{ filteredRoles.length }}

                        {{ filteredRoles.length === 1 ? 'role' : 'roles' }}

                    </span>

                </div>

            </div>


            <div class="card-body p-0">

                <div class="table-responsive admin-shared-table-wrap">

                    <table class="table admin-table admin-shared-table align-middle mb-0">

                        <!-- =================================================
                             TABLE HEADER
                        ================================================== -->

                        <thead>

                            <tr>

                                <th class="col-role-name">
                                    Role
                                </th>

                                <th class="col-description">
                                    Description
                                </th>

                                <th class="col-permissions">
                                    Permissions
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
                                v-for="role in filteredRoles"
                                :key="role.id"
                                class="role-row"
                            >

                                <!-- ROLE -->

                                <td>

                                    <div class="role-name-cell">

                                        <div class="role-avatar">

                                            <i class="bi bi-shield-check"></i>

                                        </div>

                                        <div class="role-name-content">

                                            <div class="role-name">
                                                {{ role.name || "-" }}
                                            </div>

                                            <div class="role-id">
                                                ID: {{ role.id }}
                                            </div>

                                        </div>

                                    </div>

                                </td>


                                <!-- DESCRIPTION -->

                                <td>

                                    <div class="description-cell">

                                        <span
                                            v-if="role.description"
                                        >
                                            {{ role.description }}
                                        </span>

                                        <span
                                            v-else
                                            class="text-muted"
                                        >
                                            -
                                        </span>

                                    </div>

                                </td>


                                <!-- PERMISSIONS -->

                                <td>

                                    <div class="permission-cell">

                                        <span class="permission-count">

                                            <i class="bi bi-key me-1"></i>

                                            {{
                                                getPermissionCount(role)
                                            }}

                                            {{
                                                getPermissionCount(role) === 1
                                                    ? "Permission"
                                                    : "Permissions"
                                            }}

                                        </span>

                                    </div>

                                </td>


                                <!-- STATUS -->

                                <td>

                                    <span
                                        class="status-badge"
                                        :class="
                                            role.active
                                                ? 'status-active'
                                                : 'status-inactive'
                                        "
                                    >

                                        <span class="status-dot"></span>

                                        {{
                                            role.active
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
                                            v-if="hasPermission('ROLE_EDIT')"
                                            type="button"
                                            class="action-btn edit-btn"
                                            @click="openEditRoleModal(role)"
                                            title="Edit Role"
                                        >
                                            <i class="bi bi-pencil"></i>
                                        </button>


                                        <!-- PERMISSIONS -->

                                        <button
                                            v-if="hasPermission('ROLE_EDIT')"
                                            type="button"
                                            class="action-btn permission-btn"
                                            @click="openPermissionModal(role)"
                                            title="Manage Permissions"
                                        >
                                            <i class="bi bi-key"></i>
                                        </button>


                                        <!-- DELETE -->

                                        <button
                                            v-if="hasPermission('ROLE_DELETE')"
                                            type="button"
                                            class="action-btn delete-btn"
                                            @click="deleteRole(role)"
                                            title="Delete Role"
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
                                    filteredRoles.length === 0
                                "
                            >

                                <td
                                    colspan="5"
                                    class="empty-table-cell"
                                >

                                    <div class="empty-state">

                                        <div class="empty-state-icon">

                                            <i class="bi bi-shield-x"></i>

                                        </div>

                                        <h5>
                                            No Roles Found
                                        </h5>

                                        <p>

                                            {{
                                                searchQuery
                                                    ? "No roles match your search."
                                                    : "No roles have been added yet."
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


                            <!-- =================================================
                                 LOADING STATE
                            ================================================== -->

                            <tr v-if="loading">

                                <td
                                    colspan="5"
                                    class="empty-table-cell"
                                >

                                    <div class="loading-state">

                                        <div class="spinner-border"></div>

                                        <span>
                                            Loading roles...
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
         CREATE / EDIT ROLE MODAL
    ============================================================= -->

    <BaseModal
        ref="modalRef"
        id="roleModal"
        :title="isEditMode ? 'Edit Role' : 'Create Role'"
    >

        <div class="role-modal-content">


            <!-- =====================================================
                 ROLE INFORMATION
            ====================================================== -->

            <div class="form-section">

                <div class="form-section-header">

                    <div class="form-section-icon">

                        <i class="bi bi-shield-lock"></i>

                    </div>

                    <div>

                        <h6>
                            Role Information
                        </h6>

                        <p>
                            Enter the basic information for this role.
                        </p>

                    </div>

                </div>


                <div class="row g-3">

                    <!-- ROLE NAME -->

                    <div class="col-12">

                        <label class="admin-form-label">

                            Role Name

                            <span class="required">
                                *
                            </span>

                        </label>


                        <div class="input-icon-wrapper">

                            <i class="bi bi-shield"></i>

                            <input
                                type="text"
                                class="form-control admin-form-control"
                                placeholder="Enter role name"
                                v-model.trim="form.name"
                                maxlength="100"
                            />

                        </div>

                    </div>


                    <!-- DESCRIPTION -->

                    <div class="col-12">

                        <label class="admin-form-label">
                            Description
                        </label>


                        <textarea
                            class="form-control admin-form-control description-input"
                            placeholder="Enter role description"
                            v-model.trim="form.description"
                            maxlength="255"
                            rows="4"
                        ></textarea>

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
                            Role Status
                        </strong>

                        <span>
                            Enable this role to allow it to be assigned to users.
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
                @click="saveRole"
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
                            ? "Update Role"
                            : "Create Role"
                }}

            </button>

        </template>

    </BaseModal>


    <!-- =============================================================
         PERMISSION MODAL
    ============================================================= -->

    <BaseModal
        ref="permissionModalRef"
        id="rolePermissionModal"
        title="Role Permissions"
    >

        <div class="permission-modal-content">

            <!-- ROLE HEADER -->

            <div class="selected-role-header">

                <div class="selected-role-icon">

                    <i class="bi bi-shield-check"></i>

                </div>

                <div>

                    <div class="selected-role-name">
                        {{ selectedRole?.name || "-" }}
                    </div>

                    <div class="selected-role-subtitle">
                        Select the permissions assigned to this role.
                    </div>

                </div>

            </div>


            <!-- LOADING -->

            <div
                v-if="permissionsLoading"
                class="loading-state permission-loading"
            >

                <div class="spinner-border"></div>

                <span>
                    Loading permissions...
                </span>

            </div>


            <!-- PERMISSIONS -->

            <div
                v-else-if="permissions.length > 0"
                class="permissions-grid"
            >

                <div
                    v-for="permission in permissions"
                    :key="permission.id"
                    class="permission-item"
                    :class="{
                        'permission-selected':
                            isPermissionSelected(permission)
                    }"
                >

                    <label class="permission-label">

                        <input
                            type="checkbox"
                            class="permission-checkbox"
                            :checked="
                                isPermissionSelected(permission)
                            "
                            :disabled="permissionSaving"
                            @change="
                                togglePermission(permission)
                            "
                        />


                        <div class="permission-content">

                            <div class="permission-name">

                                {{ permission.name }}

                            </div>

                            <div class="permission-code">

                                {{ permission.code }}

                            </div>

                        </div>

                    </label>

                </div>

            </div>


            <!-- NO PERMISSIONS -->

            <div
                v-else
                class="empty-permission-state"
            >

                <div class="empty-permission-icon">

                    <i class="bi bi-key"></i>

                </div>

                <h6>
                    No Permissions Found
                </h6>

                <p>
                    Create permissions first before assigning them to a role.
                </p>

            </div>

        </div>


        <!-- =========================================================
             PERMISSION MODAL FOOTER
        ========================================================== -->

        <template #footer>

            <button
                type="button"
                class="btn btn-light modal-cancel-btn"
                data-bs-dismiss="modal"
            >
                Close
            </button>

        </template>

    </BaseModal>

</template>


<script setup>

import {computed,onMounted,ref} from "vue";
import {getRoles,createRole,updateRole,deleteRole as deleteRoleApi,assignPermission,removePermission} from "@/api/role.api.js";
import {getPermissions} from "@/api/permission.api.js";
import BaseModal from "@/components/admin/common/BaseModal.vue";

// ================================================================
// REFS
// ================================================================
const modalRef = ref(null);
const permissionModalRef = ref(null);
const roles = ref([]);
const permissions = ref([]);
const loading = ref(false);
const saving = ref(false);
const permissionsLoading = ref(false);
const permissionSaving = ref(false);
const searchQuery = ref("");
const isEditMode = ref(false);
const editingRoleId = ref(null);
const selectedRole = ref(null);
const selectedPermissionIds = ref([]);


// ================================================================
// FORM
// ================================================================

const emptyForm = () => ({
    name: "",
    description: "",
    active: true
});

const form = ref(
    emptyForm()
);


// ================================================================
// ADMIN PERMISSIONS
// ================================================================

const getAdmin = () => {
    try {
        return JSON.parse(
            sessionStorage.getItem("admin") || "{}"
        );
    } catch (error) {
        console.error(
            "Error fetching admin permissions:",
            error
        );
        return {};
    }
};

const hasPermission = (permission) => {
    const admin = getAdmin();
    const permissions =admin.permissions || [];
    return permissions.includes(permission);
};


// ================================================================
// FILTERED ROLES
// ================================================================
const filteredRoles = computed(() => {
    const keyword =searchQuery.value.trim().toLowerCase();
    if (!keyword) {
        return roles.value;
    }

    return roles.value.filter(role => {
        const name = role.name?.toLowerCase() || "";
        const description =role.description?.toLowerCase() || "";
        return (name.includes(keyword) || description.includes(keyword));
    });

});


// ================================================================
// RESET FORM
// ================================================================
const resetForm = () => {
    form.value = emptyForm();
    editingRoleId.value = null;

};


// ================================================================
// OPEN ADD ROLE MODAL
// ================================================================
const openAddRoleModal = () => {
    if (!hasPermission("ROLE_CREATE")) {
        return;
    }
    isEditMode.value = false;
    resetForm();
    modalRef.value.show();
};


// ================================================================
// OPEN EDIT ROLE MODAL
// ================================================================
const openEditRoleModal = (role) => {
    if (!hasPermission("ROLE_EDIT")) {
        return;
    }
    isEditMode.value = true;
    editingRoleId.value =role.id;
    form.value = {
        name:role.name || "",
        description:role.description || "",
        active: role.active ?? true
    };
    modalRef.value.show();
};


// ================================================================
// SAVE ROLE
// ================================================================

const saveRole = async () => {
    // ROLE NAME VALIDATION
    if (!form.value.name?.trim()) {
        alert("Please enter role name.");
        return;
    }
    try {
        saving.value = true;
        const payload = {
            name:form.value.name.trim(),
            description:form.value.description?.trim() || null,
            active:form.value.active
        };
        if (isEditMode.value) {
            await updateRole( editingRoleId.value,payload);
            alert("Role updated successfully.");
        } else {
            await createRole(payload);
            alert("Role created successfully.");
        }
        await loadRoles();
        modalRef.value.hide();
        resetForm();
        isEditMode.value = false;
    } catch (error) {
        console.error( "Save role error:", error);
        alert(
            error.response?.data?.message ||
            "Something went wrong while saving the role."
        );

    } finally {

        saving.value = false;

    }

};


// ================================================================
// DELETE ROLE
// ================================================================

const deleteRole = async (role) => {

    if (!hasPermission("ROLE_DELETE")) {
        return;
    }

    const confirmed =
        window.confirm(
            `Are you sure you want to delete "${role.name}"?`
        );


    if (!confirmed) {
        return;
    }
    try {
        await deleteRoleApi(role.id);
        await loadRoles();
        alert(
            "Role deleted successfully."
        );

    } catch (error) {

        console.error(
            "Failed to delete role:",
            error
        );
        alert(
            error.response?.data?.message ||
            "Failed to delete role."
        );

    }

};


// ================================================================
// LOAD ROLES
// ================================================================

const loadRoles = async () => {
    loading.value = true;
    try {
        const response =await getRoles();

        roles.value = response.data || [];
    } catch (error) {
        console.error( "Error loading roles:", error);
        roles.value = [];
    } finally {
        loading.value = false;
    }
};


// ================================================================
// LOAD PERMISSIONS
// ================================================================

const loadPermissions = async () => {
    permissionsLoading.value = true;
    try {
        const response =await getPermissions();
        permissions.value =response.data || [];
    } catch (error) {
        console.error( "Error loading permissions:", error);
        permissions.value = [];
    } finally {
        permissionsLoading.value = false;
    }
};


// ================================================================
// GET PERMISSION COUNT
// ================================================================
const getPermissionCount = (role) => {
    if (!role?.permissions) {
        return 0;
    }

    if (Array.isArray(role.permissions)) {
        return role.permissions.length;
    }

    if (role.permissions instanceof Set) {
        return role.permissions.size;
    }
    return 0;
};


// ================================================================
// OPEN PERMISSION MODAL
// ================================================================

const openPermissionModal = async (role) => {
    if (!hasPermission("ROLE_EDIT")) {
        return;
    }
    selectedRole.value = role;
    selectedPermissionIds.value = [];
    await loadPermissions();
    if (
        role.permissions &&
        Array.isArray(role.permissions)
    ) {
        selectedPermissionIds.value =
            permissions.value
                .filter(permission =>
                    role.permissions.includes(
                        permission.code
                    )
                )
                .map(permission =>
                    permission.id
                );

    }
    permissionModalRef.value.show();
};


// ================================================================
// CHECK PERMISSION
// ================================================================

const isPermissionSelected = (
    permission
) => {

    return selectedPermissionIds.value.includes(
        permission.id
    );

};


// ================================================================
// TOGGLE PERMISSION
// ================================================================

const togglePermission = async (
    permission
) => {

    if (!selectedRole.value) {

        return;

    }


    permissionSaving.value = true;


    const currentlySelected =
        isPermissionSelected(
            permission
        );


    try {

        if (currentlySelected) {

            // REMOVE

            await removePermission(
                selectedRole.value.id,
                permission.id
            );


            selectedPermissionIds.value =
                selectedPermissionIds.value.filter(
                    id =>
                        id !== permission.id
                );

        } else {

            // ADD

            await assignPermission(
                selectedRole.value.id,
                permission.id
            );


            selectedPermissionIds.value.push(
                permission.id
            );

        }
        await loadRoles();

        const updatedRole =roles.value.find(
                role =>
                    role.id ===
                    selectedRole.value.id
            );


        if (updatedRole) {

            selectedRole.value =
                updatedRole;

        }

    } catch (error) {

        console.error(
            "Permission update error:",
            error
        );


        alert(
            error.response?.data?.message ||
            "Failed to update permission."
        );

    } finally {

        permissionSaving.value = false;

    }

};


// ================================================================
// MOUNT
// ================================================================

onMounted(async () => {

    await Promise.all([

        loadRoles(),

        loadPermissions()

    ]);

});

</script>


<style scoped>

/* ================================================================
   PAGE
================================================================ */

.role-management-page {

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


.add-role-btn {

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


.role-row {

    transition: background 0.18s ease;

}


.role-row:hover {

    background: #fbfcfd;

}


.role-row:last-child td {

    border-bottom: 0;

}


/* ================================================================
   COLUMN WIDTHS
================================================================ */

.col-role-name {

    min-width: 230px;

}


.col-description {

    min-width: 280px;

}


.col-permissions {

    width: 170px;

}


.col-status {

    width: 120px;

}


.col-action {

    width: 145px;

    text-align: center;

}


/* ================================================================
   ROLE NAME
================================================================ */

.role-name-cell {

    display: flex;

    align-items: center;

    gap: 11px;

}


.role-avatar {

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


.role-name-content {

    min-width: 0;

}


.role-name {

    color: var(--color-heading, #162536);

    font-size: 14px;

    font-weight: 600;

    line-height: 1.35;

}


.role-id {

    margin-top: 3px;

    color: #9aa5af;

    font-size: 10px;

}


/* ================================================================
   DESCRIPTION
================================================================ */

.description-cell {

    color: #536271;

    font-size: 13px;

    max-width: 350px;

}


/* ================================================================
   PERMISSION COUNT
================================================================ */

.permission-count {

    display: inline-flex;

    align-items: center;

    padding: 5px 9px;

    border-radius: 6px;

    background: #f1f5f8;

    color: #526273;

    font-size: 11px;

    font-weight: 600;

    white-space: nowrap;

}


.permission-count i {

    color: var(--color-primary, #1b5e8c);

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


/* EDIT */

.edit-btn {

    background: #fff8e8;

    color: #a66c00;

    border-color: #f3dfb2;

}


.edit-btn:hover {

    background: #fdf0d1;

    border-color: #e9cb8d;

}


/* PERMISSION */

.permission-btn {

    background: #edf7f3;

    color: #287a61;

    border-color: #cde8dc;

}


.permission-btn:hover {

    background: #dff0e8;

    border-color: #b9ddcd;

}


/* DELETE */

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

.role-modal-content {

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


.admin-form-control:focus {

    border-color: var(--color-primary, #1b5e8c);

    box-shadow: 0 0 0 3px rgba(27, 94, 140, 0.08);

}


.description-input {

    min-height: 90px;

    resize: vertical;

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
   PERMISSION MODAL
================================================================ */

.permission-modal-content {

    padding: 2px 0;

}


.selected-role-header {

    display: flex;

    align-items: center;

    gap: 12px;

    padding: 14px;

    margin-bottom: 16px;

    border: 1px solid var(--color-border, #e1e7ed);

    border-radius: 10px;

    background: #f8fafc;

}


.selected-role-icon {

    width: 40px;

    height: 40px;

    border-radius: 9px;

    background: var(--color-primary-light, #edf5fc);

    color: var(--color-primary, #1b5e8c);

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 17px;

}


.selected-role-name {

    color: var(--color-heading, #162536);

    font-size: 14px;

    font-weight: 700;

}


.selected-role-subtitle {

    margin-top: 2px;

    color: #8995a0;

    font-size: 11px;

}


.permissions-grid {

    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 10px;

}


.permission-item {

    border: 1px solid var(--color-border, #e1e7ed);

    border-radius: 9px;

    padding: 11px 12px;

    background: #ffffff;

    transition: 0.18s ease;

}


.permission-item:hover {

    background: #fbfcfd;

}


.permission-item.permission-selected {

    border-color: rgba(27, 94, 140, 0.35);

    background: #f7fbfe;

}


.permission-label {

    display: flex;

    align-items: flex-start;

    gap: 10px;

    cursor: pointer;

    width: 100%;

}


.permission-checkbox {

    width: 16px;

    height: 16px;

    margin-top: 2px;

    flex-shrink: 0;

    cursor: pointer;

}


.permission-content {

    min-width: 0;

}


.permission-name {

    color: var(--color-heading, #162536);

    font-size: 12px;

    font-weight: 600;

}


.permission-code {

    margin-top: 3px;

    color: #8995a0;

    font-size: 10px;

    word-break: break-word;

}


.permission-loading {

    min-height: 180px;

}


.empty-permission-state {

    min-height: 180px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    text-align: center;

}


.empty-permission-icon {

    width: 50px;

    height: 50px;

    border-radius: 50%;

    background: var(--color-surface-soft, #f3f6f9);

    color: #9aa6b2;

    display: flex;

    align-items: center;

    justify-content: center;

    font-size: 20px;

    margin-bottom: 10px;

}


.empty-permission-state h6 {

    margin: 0 0 4px;

    color: var(--color-heading, #162536);

    font-size: 14px;

    font-weight: 700;

}


.empty-permission-state p {

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

    .description-cell {

        max-width: 220px;

    }

}


@media (max-width: 767.98px) {

    .role-management-page {

        padding-left: 8px;

        padding-right: 8px;

    }


    .page-header-content {

        flex-direction: column;

        align-items: stretch;

    }


    .add-role-btn {

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


    .permissions-grid {

        grid-template-columns: 1fr;

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


    .role-avatar {

        width: 34px;

        height: 34px;

    }


    .role-id {

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

