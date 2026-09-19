```vue
<template>
    <div class="container-fluid user-management-page">

        <!-- =========================================================
             PAGE HEADER
        ========================================================== -->
        <div class="page-header">
            <div class="page-header-content">
                <div class="page-title-wrap">
                    <div class="page-title-icon">
                        <i class="bi bi-people"></i>
                    </div>
                    <div>
                        <h3 class="page-title">User Management</h3>
                        <p class="page-subtitle">Manage all user accounts and their access permissions.</p>
                    </div>
                </div>  

                <button v-if="hasPermission('USER_CREATE')" type="button" class="btn btn-primary add-user-btn" @click="openAddUserModal">
                    <i class="bi bi-plus-circle me-2"></i>
                    Add User
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

                    <input type="text" class="form-control admin-search-input" placeholder="Search user by name, username or email..." v-model="searchQuery" />

                    <button v-if="searchQuery" type="button" class="search-clear" @click="searchQuery = ''" title="Clear search">
                        <i class="bi bi-x-circle"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- =========================================================
             TABLE CARD
        ========================================================== -->
        <div class="card admin-card admin-shared-card user-table-card">
            <div class="card-header admin-card-header admin-shared-card-header">
                <div>
                    <h5 class="admin-card-title admin-shared-card-title">Users</h5>
                    <span class="admin-card-count admin-shared-card-count">
                        {{ filteredUsers.length }}
                        {{ filteredUsers.length === 1 ? 'user' : 'users' }}
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
                                <th class="col-name">Full Name</th>
                                <th class="col-username">Username</th>
                                <th class="col-email">Email</th>
                                <th class="col-role">Role</th>
                                <th class="col-status">Status</th>
                                <th class="col-action">Action</th>
                            </tr>
                        </thead>

                        <!-- =================================================
                             TABLE BODY
                        ================================================== -->
                        <tbody>

                            <tr v-for="user in filteredUsers" :key="user.id" class="user-row">

                                <!-- FULL NAME -->
                                <td>
                                    <div class="user-name-cell">
                                        <div class="user-avatar">
                                            {{ getInitials(user.fullName) }}
                                        </div>
                                        <div class="user-name-content">
                                            <div class="user-name">{{ user.fullName || "-" }}</div>
                                            <div class="user-id">ID: {{ user.id }}</div>
                                        </div>
                                    </div>
                                </td>

                                <!-- USERNAME -->
                                <td>
                                    <div class="username-cell">
                                        <i class="bi bi-person"></i>
                                        <span>{{ user.username || "-" }}</span>
                                    </div>
                                </td>

                                <!-- EMAIL -->
                                <td>
                                    <div class="email-cell">
                                        <i class="bi bi-envelope"></i>
                                        <span>{{ user.email || "-" }}</span>
                                    </div>
                                </td>

                                <!-- ROLE -->
                                <td>
                                    <span class="role-badge">
                                        <i class="bi bi-shield-check"></i>
                                        {{ user.roleName || "-" }}
                                    </span>
                                </td>

                                <!-- STATUS -->
                                <td>
                                    <span class="status-badge" :class="user.active ? 'status-active' : 'status-inactive'">
                                        <span class="status-dot"></span>
                                        {{ user.active ? "Active" : "Inactive" }}
                                    </span>
                                </td>

                                <!-- ACTION -->
                                <td>
                                    <div class="action-buttons">

                                        <button v-if="hasPermission('USER_EDIT')" type="button" class="action-btn edit-btn" @click="openEditUserModal(user)" title="Edit User">
                                            <i class="bi bi-pencil"></i>
                                        </button>

                                        <button v-if="hasPermission('USER_DELETE')" type="button" class="action-btn delete-btn" @click="deleteUser(user)" title="Delete User">
                                            <i class="bi bi-trash"></i>
                                        </button>

                                    </div>
                                </td>

                            </tr>

                            <!-- =================================================
                                 EMPTY STATE
                            ================================================== -->
                            <tr v-if="!loading && filteredUsers.length === 0">
                                <td colspan="6" class="empty-table-cell">
                                    <div class="empty-state">
                                        <div class="empty-state-icon">
                                            <i class="bi bi-people"></i>
                                        </div>

                                        <h5>No Users Found</h5>

                                        <p>
                                            {{ searchQuery ? "No users match your search." : "No users have been added yet." }}
                                        </p>

                                        <button v-if="searchQuery" type="button" class="btn btn-outline-primary btn-sm" @click="searchQuery = ''">
                                            Clear Search
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <!-- =================================================
                                 LOADING STATE
                            ================================================== -->
                            <tr v-if="loading">
                                <td colspan="6" class="empty-table-cell">
                                    <div class="loading-state">
                                        <div class="spinner-border"></div>
                                        <span>Loading users...</span>
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
         CREATE / EDIT USER MODAL
    ============================================================= -->
    <BaseModal ref="modalRef" id="userModal" :title="isEditMode ? 'Edit User' : 'Create User'">

        <div class="user-modal-content">

            <!-- =====================================================
                 USER INFORMATION
            ====================================================== -->
            <div class="form-section">

                <div class="form-section-header">
                    <div class="form-section-icon">
                        <i class="bi bi-person"></i>
                    </div>

                    <div>
                        <h6>User Information</h6>
                        <p>Enter the basic information for this user account.</p>
                    </div>
                </div>

                <div class="row g-3">

                    <!-- FULL NAME -->
                    <div class="col-md-6">
                        <label class="admin-form-label">
                            Full Name
                            <span class="required">*</span>
                        </label>

                        <input type="text" class="form-control admin-form-control" placeholder="Enter full name" v-model.trim="form.fullName" />
                    </div>

                    <!-- USERNAME -->
                    <div class="col-md-6">
                        <label class="admin-form-label">
                            Username
                            <span class="required">*</span>
                        </label>

                        <div class="input-icon-wrapper">
                            <i class="bi bi-person"></i>
                            <input type="text" class="form-control admin-form-control" placeholder="Enter username" v-model.trim="form.username" :disabled="isEditMode" />
                        </div>
                    </div>

                    <!-- EMAIL -->
                    <div class="col-md-6">
                        <label class="admin-form-label">
                            Email
                            <span class="required">*</span>
                        </label>

                        <div class="input-icon-wrapper">
                            <i class="bi bi-envelope"></i>
                            <input type="email" class="form-control admin-form-control" placeholder="Enter email address" v-model.trim="form.email" />
                        </div>
                    </div>

                    <!-- ROLE -->
                    <div class="col-md-6">
                        <label class="admin-form-label">
                            Role
                            <span class="required">*</span>
                        </label>

                        <div class="input-icon-wrapper">
                            <i class="bi bi-shield-check"></i>

                            <select class="form-select admin-form-control" v-model="form.roleId">
                                <option value="">Select Role</option>
                                <option v-for="role in roles" :key="role.id" :value="role.id">
                                    {{ role.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>

            <!-- =====================================================
                 SECURITY
            ====================================================== -->
            <div class="form-section">

                <div class="form-section-header">
                    <div class="form-section-icon">
                        <i class="bi bi-lock"></i>
                    </div>

                    <div>
                        <h6>Account Security</h6>
                        <p>Set or update the user's account password.</p>
                    </div>
                </div>

                <div class="row g-3">       

                    <!-- PASSWORD -->
                    <div class="col-12">
                        <label class="admin-form-label">
                            Password
                            <span v-if="!isEditMode" class="required">*</span>
                        </label>

                        <div class="input-icon-wrapper">
                            <i class="bi bi-key"></i>

                            <input type="password" class="form-control admin-form-control" v-model="form.password" :placeholder="isEditMode ? 'Leave blank to keep current password' : 'Enter password'" />
                        </div>

                        <small v-if="isEditMode" class="form-help-text">
                            Leave blank if you don't want to change the password.
                        </small>
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
                        <strong>Account Status</strong>
                        <span>Enable this user account to allow access to the admin panel.</span>
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

            <button type="button" class="btn btn-light modal-cancel-btn" data-bs-dismiss="modal">
                Cancel
            </button>

            <button type="button" class="btn btn-primary modal-save-btn" :disabled="saving" @click="saveUser">

                <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>

                <i v-else class="bi" :class="isEditMode ? 'bi-check-circle' : 'bi-plus-circle'"></i>

                {{ saving ? "Saving..." : isEditMode ? "Update User" : "Create User" }}

            </button>

        </template>

    </BaseModal>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import { getUsers, createUser, updateUser, deleteUser as deleteUserApi } from "@/api/user.api.js";
import { getRoles } from "@/api/role.api.js";
import BaseModal from "@/components/admin/common/BaseModal.vue";
import  {hasPermission} from "@/utils/permission.js";

/* ================================================================
   REFS
================================================================ */

const modalRef = ref(null);

const users = ref([]);
const roles = ref([]);

const loading = ref(false);
const saving = ref(false);

const searchQuery = ref("");

const isEditMode = ref(false);
const editingUserId = ref(null);


/* ================================================================
   FORM
================================================================ */

const emptyForm = () => ({
    fullName: "",
    username: "",
    email: "",
    roleId: "",
    password: "",
    active: true
});

const form = ref(emptyForm());





/* ================================================================
   FILTERED USERS
================================================================ */

const filteredUsers = computed(() => {
    const keyword = searchQuery.value.trim().toLowerCase();

    if (!keyword) {
        return users.value;
    }

    return users.value.filter(user => {
        const fullName = user.fullName?.toLowerCase() || "";
        const username = user.username?.toLowerCase() || "";
        const email = user.email?.toLowerCase() || "";
        const roleName = user.roleName?.toLowerCase() || "";

        return (
            fullName.includes(keyword) ||
            username.includes(keyword) ||
            email.includes(keyword) ||
            roleName.includes(keyword)
        );
    });
});


/* ================================================================
   USER INITIALS
================================================================ */

const getInitials = (name) => {
    if (!name) {
        return "U";
    }

    const parts = name.trim().split(/\s+/);

    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }

    return (
        parts[0].charAt(0) +
        parts[parts.length - 1].charAt(0)
    ).toUpperCase();
};


/* ================================================================
   RESET FORM
================================================================ */

const resetForm = () => {
    form.value = emptyForm();
    editingUserId.value = null;
};


/* ================================================================
   OPEN ADD USER MODAL
================================================================ */

const openAddUserModal = () => {
    isEditMode.value = false;
    resetForm();
    modalRef.value.show();
};


/* ================================================================
   OPEN EDIT USER MODAL
================================================================ */

const openEditUserModal = (user) => {
    isEditMode.value = true;

    editingUserId.value = user.id;

    form.value = {
        fullName: user.fullName || "",
        username: user.username || "",
        email: user.email || "",
        roleId: user.roleId || "",
        password: "",
        active: user.active ?? true
    };

    modalRef.value.show();
};


/* ================================================================
   SAVE USER
================================================================ */

const saveUser = async () => {

    if (!form.value.fullName?.trim()) {
        alert("Please enter full name.");
        return;
    }

    if (!form.value.username?.trim()) {
        alert("Please enter username.");
        return;
    }

    if (!form.value.email?.trim()) {
        alert("Please enter email.");
        return;
    }

    if (!form.value.roleId) {
        alert("Please select a role.");
        return;
    }

    if (!isEditMode.value && !form.value.password) {
        alert("Please enter password.");
        return;
    }

    try {
        saving.value = true;

        const payload = {
            fullName: form.value.fullName.trim(),
            username: form.value.username.trim(),
            email: form.value.email.trim(),
            roleId: form.value.roleId,
            active: form.value.active
        };

        if (form.value.password) {
            payload.password = form.value.password;
        }

        if (isEditMode.value) {
            await updateUser(editingUserId.value, payload);
            alert("User updated successfully.");
        } else {
            await createUser(payload);
            alert("User created successfully.");
        }

        await loadUsers();

        modalRef.value.hide();

        resetForm();

        isEditMode.value = false;

    } catch (error) {
        console.error("Save user error:", error);

        alert(
            error.response?.data?.message ||
            "Something went wrong while saving the user."
        );
    } finally {
        saving.value = false;
    }
};


/* ================================================================
   DELETE USER
================================================================ */

const deleteUser = async (user) => {

    const confirmed = window.confirm(
        `Are you sure you want to delete "${user.fullName}"?`
    );

    if (!confirmed) {
        return;
    }

    try {

        await deleteUserApi(user.id);

        await loadUsers();

        alert("User deleted successfully.");

    } catch (error) {

        console.error("Failed to delete user:", error);

        alert(
            error.response?.data?.message ||
            "Failed to delete user."
        );
    }
};


/* ================================================================
   LOAD USERS
================================================================ */

const loadUsers = async () => {

    loading.value = true;

    try {

        const response = await getUsers();

        users.value = response.data || [];

    } catch (error) {

        console.error("Error loading users:", error);

        users.value = [];

    } finally {

        loading.value = false;
    }
};


/* ================================================================
   LOAD ROLES
================================================================ */

const loadRoles = async () => {

    try {

        const response = await getRoles();

        roles.value = response.data || [];

    } catch (error) {

        console.error("Error loading roles:", error);

        roles.value = [];
    }
};


/* ================================================================
   MOUNT
================================================================ */

onMounted(async () => {

    await Promise.all([
        loadUsers(),
        loadRoles()
    ]);

});
</script>

<style scoped>

/* ================================================================
   PAGE
================================================================ */

.user-management-page {
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

.add-user-btn {
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

.user-row {
    transition: background 0.18s ease;
}

.user-row:hover {
    background: #fbfcfd;
}

.user-row:last-child td {
    border-bottom: 0;
}


/* ================================================================
   COLUMN WIDTHS
================================================================ */

.col-name {
    min-width: 220px;
}

.col-username {
    min-width: 150px;
}

.col-email {
    min-width: 220px;
}

.col-role {
    width: 150px;
}

.col-status {
    width: 120px;
}

.col-action {
    width: 110px;
    text-align: center;
}


/* ================================================================
   USER NAME
================================================================ */

.user-name-cell {
    display: flex;
    align-items: center;
    gap: 11px;
}

.user-avatar {
    width: 38px;
    height: 38px;
    border-radius: 9px;
    background: var(--color-primary-light, #edf5fc);
    color: var(--color-primary, #1b5e8c);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
}

.user-name-content {
    min-width: 0;
}

.user-name {
    color: var(--color-heading, #162536);
    font-size: 14px;
    font-weight: 600;
    line-height: 1.35;
}

.user-id {
    margin-top: 3px;
    color: #9aa5af;
    font-size: 10px;
}


/* ================================================================
   USERNAME
================================================================ */

.username-cell {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #536271;
    font-size: 13px;
}

.username-cell i {
    color: #8996a2;
    font-size: 13px;
}


/* ================================================================
   EMAIL
================================================================ */

.email-cell {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    max-width: 280px;
    color: #536271;
    font-size: 13px;
}

.email-cell i {
    color: #8996a2;
    font-size: 13px;
    flex-shrink: 0;
}

.email-cell span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


/* ================================================================
   ROLE
================================================================ */

.role-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 9px;
    border-radius: 6px;
    background: #f1f5f8;
    color: #526273;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
}

.role-badge i {
    color: var(--color-primary, #1b5e8c);
    font-size: 12px;
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

.user-modal-content {
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

.admin-form-control:disabled {
    background: #f4f6f8;
    color: #8c98a4;
    cursor: not-allowed;
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

.input-icon-wrapper select.admin-form-control {
    padding-left: 36px;
}

.form-help-text {
    display: block;
    margin-top: 6px;
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

    .email-cell {
        max-width: 220px;
    }

}

@media (max-width: 767.98px) {

    .user-management-page {
        padding-left: 8px;
        padding-right: 8px;
    }

    .page-header-content {
        flex-direction: column;
        align-items: stretch;
    }

    .add-user-btn {
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

    .user-avatar {
        width: 34px;
        height: 34px;
    }

    .user-id {
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
```
