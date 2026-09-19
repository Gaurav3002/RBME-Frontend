
<template>
    <div class="container-fluid menu-management-page">

        <!-- =========================================================
             PAGE HEADER
        ========================================================== -->
        <div class="page-header">
            <div class="page-header-content">
                <div class="page-title-wrap">
                    <div class="page-title-icon">
                        <i class="bi bi-list-nested"></i>
                    </div>

                    <div>
                        <h3 class="page-title">Menu Management</h3>
                        <p class="page-subtitle">
                            Manage application menus, hierarchy and access permissions.
                        </p>
                    </div>
                </div>

                <button
                    v-if="hasPermission('MENU_CREATE')"
                    type="button"
                    class="btn btn-primary add-menu-btn"
                    @click="openCreateModal"
                >
                    <i class="bi bi-plus-circle me-2"></i>
                    Add Menu
                </button>
            </div>
        </div>

        <!-- =========================================================
             FILTER CARD
        ========================================================== -->
        <div class="card admin-card search-card">
            <div class="card-body">
                <div class="row g-3 align-items-end">

                    <!-- SEARCH -->
                    <div class="col-md-6">
                        <label class="admin-form-label">Search Menu</label>

                        <div class="search-wrapper">
                            <div class="search-icon">
                                <i class="bi bi-search"></i>
                            </div>

                            <input
                                type="text"
                                class="form-control admin-search-input"
                                placeholder="Search by name, code or route..."
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

                    <!-- STATUS -->
                    <div class="col-md-3">
                        <label class="admin-form-label">Status</label>

                        <select
                            v-model="statusFilter"
                            class="form-select admin-form-control"
                        >
                            <option value="">All Status</option>
                            <option :value="true">Active</option>
                            <option :value="false">Inactive</option>
                        </select>
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
             MENU TABLE
        ========================================================== -->
        <div class="card admin-card menu-table-card">

            <div class="card-header admin-card-header">
                <div>
                    <h5 class="admin-card-title">Menus</h5>

                    <span class="admin-card-count">
                        {{ filteredMenus.length }}
                        {{ filteredMenus.length === 1 ? 'menu' : 'menus' }}
                    </span>
                </div>
            </div>

            <div class="card-body p-0">

                <div class="table-responsive">

                    <table class="table admin-table align-middle mb-0">

                        <thead>
                            <tr>
                                <th class="col-number">#</th>
                                <th class="col-menu">Menu</th>
                                <th class="col-code">Code</th>
                                <th class="col-route">Route</th>
                                <th class="col-parent">Parent</th>
                                <th class="col-permission">Permission</th>
                                <th class="col-order">Order</th>
                                <th class="col-status">Status</th>
                                <th v-if="hasPermission('MENU_DELETE')" class="col-action">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            <!-- =================================================
                                 LOADING
                            ================================================== -->
                            <tr v-if="loading">
                                <td
                                    :colspan="hasPermission('MENU_DELETE') ? 9 : 8"
                                    class="empty-table-cell"
                                >
                                    <div class="loading-state">
                                        <div class="spinner-border"></div>
                                        <span>Loading menus...</span>
                                    </div>
                                </td>
                            </tr>

                            <!-- =================================================
                                 EMPTY
                            ================================================== -->
                            <tr v-else-if="filteredMenus.length === 0">
                                <td
                                    :colspan="hasPermission('MENU_DELETE') ? 9 : 8"
                                    class="empty-table-cell"
                                >
                                    <div class="empty-state">

                                        <div class="empty-state-icon">
                                            <i class="bi bi-list-nested"></i>
                                        </div>

                                        <h5>No Menus Found</h5>

                                        <p>
                                            {{
                                                searchQuery
                                                    ? "No menus match your search."
                                                    : "No menus have been added yet."
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
                                 MENU DATA
                            ================================================== -->
                            <tr
                                v-else
                                v-for="(menu, index) in filteredMenus"
                                :key="menu.id"
                                class="menu-row"
                            >

                                <td>{{ index + 1 }}</td>

                                <td>
                                    <div class="menu-name-cell">

                                        <div class="menu-icon-box">
                                            <i :class="menu.icon || 'bi bi-list'"></i>
                                        </div>

                                        <div class="menu-name-content">

                                            <div class="menu-name">
                                                {{ menu.name || "-" }}
                                            </div>

                                            <div class="menu-id">
                                                ID: {{ menu.id }}
                                            </div>

                                        </div>

                                    </div>
                                </td>

                                <td>
                                    <span class="menu-code">
                                        {{ menu.code || "-" }}
                                    </span>
                                </td>

                                <td>
                                    <span class="menu-route">
                                        {{ menu.route || "-" }}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        v-if="menu.parentId"
                                        class="parent-badge"
                                    >
                                        <i class="bi bi-diagram-3 me-1"></i>
                                        {{ getParentMenuName(menu.parentId) }}
                                    </span>

                                    <span
                                        v-else
                                        class="root-menu-badge"
                                    >
                                        <i class="bi bi-house me-1"></i>
                                        Root Menu
                                    </span>
                                </td>

                                <td>
                                    <span
                                        v-if="menu.permissionId"
                                        class="permission-badge"
                                    >
                                        <i class="bi bi-shield-check me-1"></i>
                                        {{ getPermissionName(menu.permissionId) }}
                                    </span>

                                    <span
                                        v-else
                                        class="no-permission"
                                    >
                                        No Permission
                                    </span>
                                </td>

                                <td>
                                    <span class="order-badge">
                                        {{ menu.displayOrder ?? 0 }}
                                    </span>
                                </td>

                                <td>
                                    <span
                                        class="status-badge"
                                        :class="
                                            menu.active
                                                ? 'status-active'
                                                : 'status-inactive'
                                        "
                                    >
                                        <span class="status-dot"></span>

                                        {{ menu.active ? "Active" : "Inactive" }}
                                    </span>
                                </td>

                                <td v-if="hasPermission('MENU_DELETE')">

                                    <div class="action-buttons">

                                        <button
                                            type="button"
                                            class="action-btn delete-btn"
                                            title="Delete Menu"
                                            @click="confirmDelete(menu)"
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
             MENU TREE
        ========================================================== -->
        <div class="card admin-card menu-tree-card">

            <div class="card-header admin-card-header">

                <div>

                    <h5 class="admin-card-title">
                        <i class="bi bi-diagram-3 me-2"></i>
                        Menu Hierarchy
                    </h5>

                    <span class="admin-card-count">
                        Accessible menus for the current user
                    </span>

                </div>

            </div>

            <div class="card-body">

                <div
                    v-if="menuTree.length === 0"
                    class="tree-empty"
                >
                    <i class="bi bi-diagram-3"></i>
                    <span>No accessible menu hierarchy available.</span>
                </div>

                <div
                    v-else
                    class="menu-tree"
                >
                    <MenuTreeNode
                        v-for="menu in menuTree"
                        :key="`tree-${menu.id}`"
                        :menu="menu"
                        :level="0"
                    />
                </div>

            </div>

        </div>

    </div>

    <!-- =============================================================
         CREATE MENU MODAL
    ============================================================= -->
    <BaseModal
        ref="modalRef"
        id="menuModal"
        title="Create Menu"
    >

        <div class="menu-modal-content">

            <!-- =====================================================
                 MENU INFORMATION
            ====================================================== -->
            <div class="form-section">

                <div class="form-section-header">

                    <div class="form-section-icon">
                        <i class="bi bi-list-nested"></i>
                    </div>

                    <div>
                        <h6>Menu Information</h6>
                        <p>
                            Define the menu name, code, route and icon.
                        </p>
                    </div>

                </div>

                <div class="row g-3">

                    <!-- NAME -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Menu Name
                            <span class="required">*</span>
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control"
                            placeholder="Example: User Management"
                            maxlength="100"
                            v-model.trim="form.name"
                        />

                    </div>

                    <!-- CODE -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Menu Code
                            <span class="required">*</span>
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control text-uppercase"
                            placeholder="Example: USER_MANAGEMENT"
                            maxlength="100"
                            v-model="form.code"
                            @input="normalizeCode"
                        />

                        <small class="form-help-text">
                            Use a unique code such as USER_MANAGEMENT or SALES.
                        </small>

                    </div>

                    <!-- ICON -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Icon
                        </label>

                        <div class="icon-input-wrapper">

                            <span class="icon-preview">
                                <i :class="form.icon || 'bi bi-list'"></i>
                            </span>

                            <input
                                type="text"
                                class="form-control admin-form-control"
                                placeholder="Example: bi bi-people"
                                maxlength="100"
                                v-model.trim="form.icon"
                            />

                        </div>

                        <small class="form-help-text">
                            Use Bootstrap Icons class, for example: bi bi-people.
                        </small>

                    </div>

                    <!-- ROUTE -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Route
                        </label>

                        <input
                            type="text"
                            class="form-control admin-form-control"
                            placeholder="Example: /admin/users"
                            maxlength="200"
                            v-model.trim="form.route"
                        />

                    </div>

                </div>

            </div>

            <!-- =====================================================
                 HIERARCHY + ACCESS
            ====================================================== -->
            <div class="form-section">

                <div class="form-section-header">

                    <div class="form-section-icon">
                        <i class="bi bi-diagram-3"></i>
                    </div>

                    <div>
                        <h6>Hierarchy & Access</h6>
                        <p>
                            Configure parent menu and required permission.
                        </p>
                    </div>

                </div>

                <div class="row g-3">

                    <!-- PARENT -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Parent Menu
                        </label>

                        <select
                            v-model="form.parentId"
                            class="form-select admin-form-control"
                        >

                            <option :value="null">
                                Root Menu
                            </option>

                            <option
                                v-for="menu in parentMenuOptions"
                                :key="menu.id"
                                :value="menu.id"
                            >
                                {{ menu.name }}
                            </option>

                        </select>

                        <small class="form-help-text">
                            Select Root Menu if this is a top-level menu.
                        </small>

                    </div>

                    <!-- PERMISSION -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Permission
                        </label>

                        <select
                            v-model="form.permissionId"
                            class="form-select admin-form-control"
                        >

                            <option :value="null">
                                No Permission
                            </option>

                            <option
                                v-for="permission in activePermissions"
                                :key="permission.id"
                                :value="permission.id"
                            >
                                {{ permission.name }}
                                ({{ permission.code }})
                            </option>

                        </select>

                        <small class="form-help-text">
                            Permission controls access to this menu.
                        </small>

                    </div>

                    <!-- DISPLAY ORDER -->
                    <div class="col-md-6">

                        <label class="admin-form-label">
                            Display Order
                        </label>

                        <input
                            type="number"
                            class="form-control admin-form-control"
                            min="0"
                            placeholder="Example: 1"
                            v-model.number="form.displayOrder"
                        />

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
                        <strong>Menu Status</strong>

                        <span>
                            Enable this menu to make it available in the application.
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
                :disabled="saving"
                @click="closeModal"
            >
                Cancel
            </button>

            <button
                type="button"
                class="btn btn-primary modal-save-btn"
                :disabled="saving"
                @click="saveMenu"
            >

                <span
                    v-if="saving"
                    class="spinner-border spinner-border-sm me-2"
                ></span>

                <i
                    v-else
                    class="bi bi-plus-circle"
                ></i>

                {{ saving ? "Creating..." : "Create Menu" }}

            </button>

        </template>

    </BaseModal>

</template>

<script setup>

import {
    computed,
    defineComponent,
    h,
    onMounted,
    ref
} from "vue";

import BaseModal from "@/components/admin/common/BaseModal.vue";

import {
    getMenuTree,
    createMenu,
    getAllMenu,
    deleteMenu
} from "@/api/menu.api.js";

import {
    getPermissions
} from "@/api/permission.api.js";

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

const menus = ref([]);

const menuTree = ref([]);

const permissions = ref([]);

const loading = ref(false);

const saving = ref(false);

const searchQuery = ref("");

const statusFilter = ref("");


// ================================================================
// FORM
// ================================================================

const emptyForm = () => ({
    name: "",
    code: "",
    icon: "",
    route: "",
    displayOrder: 0,
    active: true,
    parentId: null,
    permissionId: null
});

const form = ref(emptyForm());


// ================================================================
// FILTERED MENUS
// ================================================================

const filteredMenus = computed(() => {

    const keyword = searchQuery.value.trim().toLowerCase();

    return menus.value.filter(menu => {

        const name = String(menu.name || "").toLowerCase();

        const code = String(menu.code || "").toLowerCase();

        const route = String(menu.route || "").toLowerCase();

        const matchesSearch =
            !keyword ||
            name.includes(keyword) ||
            code.includes(keyword) ||
            route.includes(keyword);

        const matchesStatus =
            statusFilter.value === "" ||
            Boolean(menu.active) === Boolean(statusFilter.value);

        return matchesSearch && matchesStatus;

    });

});


// ================================================================
// ACTIVE PERMISSIONS
// ================================================================

const activePermissions = computed(() => {

    return permissions.value
        .filter(permission => permission.active !== false)
        .sort((a, b) =>
            String(a.name || "").localeCompare(
                String(b.name || "")
            )
        );

});


// ================================================================
// PARENT MENU OPTIONS
// ================================================================

const parentMenuOptions = computed(() => {

    return menus.value
        .filter(menu => {

            if (menu.id === form.value.id) {
                return false;
            }

            if (menu.active === false) {
                return false;
            }

            return true;

        })
        .sort((a, b) => {

            const orderA = Number(a.displayOrder ?? 0);

            const orderB = Number(b.displayOrder ?? 0);

            if (orderA !== orderB) {
                return orderA - orderB;
            }

            return String(a.name || "").localeCompare(
                String(b.name || "")
            );

        });

});


// ================================================================
// GET PARENT MENU NAME
// ================================================================

const getParentMenuName = (parentId) => {

    const parent = menus.value.find(
        menu => Number(menu.id) === Number(parentId)
    );

    return parent
        ? parent.name
        : `Menu #${parentId}`;

};


// ================================================================
// GET PERMISSION NAME
// ================================================================

const getPermissionName = (permissionId) => {

    const permission = permissions.value.find(
        permission => Number(permission.id) === Number(permissionId)
    );

    return permission
        ? permission.name
        : `Permission #${permissionId}`;

};


// ================================================================
// RESET FORM
// ================================================================

const resetForm = () => {

    form.value = emptyForm();

};


// ================================================================
// NORMALIZE MENU CODE
// ================================================================

const normalizeCode = () => {

    form.value.code = String(form.value.code || "")
        .toUpperCase()
        .replace(/\s+/g, "_")
        .replace(/[^A-Z0-9_]/g, "_")
        .replace(/_+/g, "_");

};


// ================================================================
// OPEN CREATE MODAL
// ================================================================

const openCreateModal = () => {

    resetForm();

    if (modalRef.value) {

        modalRef.value.show();

    } else {

        console.error(
            "Menu modal reference is not available."
        );

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

    resetForm();

};


// ================================================================
// SAVE MENU
// ================================================================

const saveMenu = async () => {

    // ============================================================
    // VALIDATION
    // ============================================================

    if (!form.value.name?.trim()) {

        alert(
            "Please enter menu name."
        );

        return;

    }

    if (!form.value.code?.trim()) {

        alert(
            "Please enter menu code."
        );

        return;

    }


    // ============================================================
    // NORMALIZE
    // ============================================================

    normalizeCode();


    // ============================================================
    // FINAL VALIDATION
    // ============================================================

    if (!form.value.code?.trim()) {

        alert(
            "Please enter a valid menu code."
        );

        return;

    }


    try {

        saving.value = true;


        // ========================================================
        // PAYLOAD
        // ========================================================

        const payload = {

            name: form.value.name.trim(),

            code: form.value.code
                .trim()
                .toUpperCase(),

            icon: form.value.icon?.trim() || null,

            route: form.value.route?.trim() || null,

            displayOrder:
                Number(form.value.displayOrder ?? 0),

            active:
                Boolean(form.value.active),

            parentId:
                form.value.parentId !== null &&
                form.value.parentId !== ""
                    ? Number(form.value.parentId)
                    : null,

            permissionId:
                form.value.permissionId !== null &&
                form.value.permissionId !== ""
                    ? Number(form.value.permissionId)
                    : null

        };


        console.log(
            "Creating menu:",
            payload
        );


        // ========================================================
        // CREATE
        // ========================================================

        await createMenu(payload);


        alert("Menu created successfully.");


        // ========================================================
        // RELOAD
        // ========================================================

        await loadData();


        // ========================================================
        // CLOSE MODAL
        // ========================================================

        if (modalRef.value) {
            modalRef.value.hide();
        }

        resetForm();


    } catch (error) {

        console.error(
            "Create menu error:",
            error
        );

        const message =
            error?.response?.data?.message ||
            error?.response?.data ||
            "Something went wrong while creating the menu.";

        alert(String(message));

    } finally {

        saving.value = false;

    }

};


// ================================================================
// DELETE MENU
// ================================================================
const confirmDelete = async (menu) => {

    if (!menu?.id) {
        alert("Invalid menu selected.");
        return;
    }

    const confirmed = window.confirm(
        `Are you sure you want to delete "${menu.name}"?`
    );

    if (!confirmed) {
        console.log("Menu deletion cancelled.");
        return;
    }

    try {

        await deleteMenu(menu.id);

        alert("Menu deleted successfully.");

        await loadData();

    } catch (error) {

        console.error(
            "Delete menu error:",
            error
        );

        const message =
            error?.response?.data?.message ||
            error?.response?.data ||
            "Failed to delete menu.";

        alert(String(message));
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
// NORMALIZE API RESPONSE
// ================================================================

const extractArray = (response) => {

    if (Array.isArray(response)) {
        return response;
    }

    if (Array.isArray(response?.data)) {
        return response.data;
    }

    return [];

};


// ================================================================
// LOAD ALL MENUS
// ================================================================

const loadMenus = async () => {

    loading.value = true;

    try {

        const response = await getAllMenu();

        menus.value = extractArray(response);

    } catch (error) {

        console.error(
            "Error loading menus:",
            error
        );

        menus.value = [];

        alert("Failed to load menus.");

    } finally {

        loading.value = false;

    }

};


// ================================================================
// LOAD MENU TREE
// ================================================================

const loadMenuTree = async () => {

    try {

        const response = await getMenuTree();

        menuTree.value = extractArray(response);

    } catch (error) {

        console.error(
            "Error loading menu tree:",
            error
        );

        menuTree.value = [];

    }

};


// ================================================================
// LOAD PERMISSIONS
// ================================================================

const loadPermissions = async () => {

    try {

        const response = await getPermissions();

        permissions.value = extractArray(response);

    } catch (error) {

        console.error(
            "Error loading permissions:",
            error
        );

        permissions.value = [];

        alert("Failed to load permissions.");

    }

};


// ================================================================
// LOAD ALL DATA
// ================================================================

const loadData = async () => {

    await Promise.all([
        loadMenus(),
        loadMenuTree(),
        loadPermissions()
    ]);

};


// ================================================================
// RECURSIVE TREE COMPONENT
// ================================================================

const MenuTreeNode = defineComponent({

    name: "MenuTreeNode",

    props: {

        menu: {
            type: Object,
            required: true
        },

        level: {
            type: Number,
            default: 0
        }

    },

    setup(props) {

        return () => {

            const children =
                Array.isArray(props.menu.children)
                    ? props.menu.children
                    : [];


            return h(

                "div",

                {
                    class: [
                        "tree-node",
                        props.level === 0
                            ? "tree-root"
                            : "tree-child"
                    ]
                },

                [

                    // =================================================
                    // MENU ITEM
                    // =================================================

                    h(

                        "div",

                        {
                            class:
                                props.level === 0
                                    ? "tree-menu-item"
                                    : "tree-child-item"
                        },

                        [

                            props.level > 0
                                ? h(
                                    "div",
                                    {
                                        class: "tree-branch"
                                    }
                                )
                                : null,


                            // =========================================
                            // MENU LEFT
                            // =========================================

                            h(

                                "div",

                                {
                                    class:
                                        props.level === 0
                                            ? "tree-menu-left"
                                            : "tree-child-content"
                                },

                                [

                                    h(

                                        "div",

                                        {
                                            class:
                                                props.level === 0
                                                    ? "tree-icon"
                                                    : "tree-icon small"
                                        },

                                        [

                                            h(

                                                "i",

                                                {
                                                    class:
                                                        props.menu.icon ||
                                                        (
                                                            props.level === 0
                                                                ? "bi bi-list"
                                                                : "bi bi-dot"
                                                        )
                                                }

                                            )

                                        ]

                                    ),


                                    h(

                                        "div",

                                        [

                                            h(

                                                "div",

                                                {
                                                    class: "tree-menu-name"
                                                },

                                                props.menu.name || "-"

                                            ),

                                            h(

                                                "div",

                                                {
                                                    class: "tree-menu-code"
                                                },

                                                props.menu.code || "-"

                                            )

                                        ]

                                    )

                                ]

                            ),


                            // =========================================
                            // ROOT STATUS
                            // =========================================

                            props.level === 0
                                ? h(

                                    "span",

                                    {

                                        class: [
                                            "status-badge",

                                            props.menu.active
                                                ? "status-active"
                                                : "status-inactive"

                                        ]

                                    },

                                    [

                                        h(

                                            "span",

                                            {
                                                class: "status-dot"
                                            }

                                        ),

                                        props.menu.active
                                            ? "Active"
                                            : "Inactive"

                                    ]

                                )

                                : null

                        ]

                    ),


                    // =================================================
                    // CHILDREN
                    // =================================================

                    children.length > 0

                        ? h(

                            "div",

                            {

                                class:
                                    props.level === 0
                                        ? "tree-children"
                                        : "tree-nested-children"

                            },

                            children.map(child =>

                                h(

                                    MenuTreeNode,

                                    {

                                        key:
                                            `tree-${child.id}`,

                                        menu: child,

                                        level:
                                            props.level + 1

                                    }

                                )

                            )

                        )

                        : null

                ]

            );

        };

    }

});


// ================================================================
// MOUNT
// ================================================================

onMounted(() => {

    loadData();

});

</script>

<style scoped>

/* ================================================================
   PAGE
================================================================ */

.menu-management-page {
    padding-bottom: 40px;
}


/* ================================================================
   HEADER
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
    background: #edf5fc;
    color: #1b5e8c;
    font-size: 21px;
    flex-shrink: 0;
}

.page-title {
    margin: 0 0 4px;
    color: #162536;
    font-size: 24px;
    font-weight: 700;
}

.page-subtitle {
    margin: 0;
    color: #687786;
    font-size: 14px;
}

.add-menu-btn {
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
    border: 1px solid #e1e7ed;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 3px 12px rgba(15, 35, 55, 0.04);
    overflow: hidden;
}

.search-card {
    margin-bottom: 18px;
}

.menu-table-card {
    margin-bottom: 18px;
}

.menu-tree-card {
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
    border: 1px solid #e1e7ed;
    border-radius: 8px;
    font-size: 14px;
    color: #4e5d69;
    box-shadow: none;
}

.admin-search-input:focus {
    border-color: #1b5e8c;
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
    color: #1b5e8c;
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
    border: 1px solid #e1e7ed;
    border-radius: 7px;
    color: #4e5d69;
    font-size: 13px;
    box-shadow: none;
}

.admin-form-control:focus {
    border-color: #1b5e8c;
    box-shadow: 0 0 0 3px rgba(27, 94, 140, 0.08);
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
    border-bottom: 1px solid #e1e7ed;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.admin-card-title {
    margin: 0 0 3px;
    color: #162536;
    font-size: 16px;
    font-weight: 700;
}

.admin-card-count {
    color: #687786;
    font-size: 12px;
}


/* ================================================================
   TABLE
================================================================ */

.admin-table {
    width: 100%;
    margin: 0;
    color: #4e5d69;
    font-size: 13px;
}

.admin-table thead th {
    padding: 13px 16px;
    background: #f3f6f9;
    border-bottom: 1px solid #e1e7ed;
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

.menu-row {
    transition: background 0.18s ease;
}

.menu-row:hover {
    background: #fbfcfd;
}

.menu-row:last-child td {
    border-bottom: 0;
}


/* ================================================================
   COLUMNS
================================================================ */

.col-number {
    width: 55px;
}

.col-menu {
    min-width: 220px;
}

.col-code {
    min-width: 170px;
}

.col-route {
    min-width: 170px;
}

.col-parent {
    min-width: 140px;
}

.col-permission {
    min-width: 180px;
}

.col-order {
    width: 70px;
}

.col-status {
    width: 110px;
}

.col-action {
    width: 80px;
    text-align: center;
}


/* ================================================================
   MENU NAME
================================================================ */

.menu-name-cell {
    display: flex;
    align-items: center;
    gap: 11px;
}

.menu-icon-box {
    width: 38px;
    height: 38px;
    border-radius: 9px;
    background: #edf5fc;
    color: #1b5e8c;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
}

.menu-name-content {
    min-width: 0;
}

.menu-name {
    color: #162536;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.35;
}

.menu-id {
    margin-top: 3px;
    color: #9aa5af;
    font-size: 10px;
}


/* ================================================================
   CODE
================================================================ */

.menu-code {
    display: inline-block;
    background: #f1f3f5;
    color: #495057;
    border-radius: 5px;
    padding: 5px 9px;
    font-size: 11px;
    font-family: monospace;
    font-weight: 600;
}


/* ================================================================
   ROUTE
================================================================ */

.menu-route {
    color: #687786;
    font-size: 12px;
    font-family: monospace;
}


/* ================================================================
   PARENT
================================================================ */

.parent-badge {
    display: inline-flex;
    align-items: center;
    padding: 5px 9px;
    border-radius: 5px;
    background: #f3f6f9;
    color: #566575;
    font-size: 11px;
    font-weight: 600;
}

.root-menu-badge {
    display: inline-flex;
    align-items: center;
    padding: 5px 9px;
    border-radius: 5px;
    background: #edf5fc;
    color: #1b5e8c;
    font-size: 11px;
    font-weight: 600;
}


/* ================================================================
   PERMISSION
================================================================ */

.permission-badge {
    display: inline-flex;
    align-items: center;
    padding: 5px 9px;
    border-radius: 5px;
    background: #f5f0ff;
    color: #7155a5;
    font-size: 11px;
    font-weight: 600;
}

.no-permission {
    color: #9aa5af;
    font-size: 11px;
    font-style: italic;
}


/* ================================================================
   ORDER
================================================================ */

.order-badge {
    min-width: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 7px;
    border-radius: 5px;
    background: #f3f6f9;
    color: #566575;
    font-size: 11px;
    font-weight: 700;
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
   ACTION
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
    min-height: 250px;
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
    background: #f3f6f9;
    color: #9aa6b2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
}

.empty-state h5 {
    margin: 0 0 5px;
    color: #162536;
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
    color: #1b5e8c;
}


/* ================================================================
   TREE
================================================================ */

.tree-empty {
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    color: #8a96a1;
    font-size: 13px;
}

.tree-empty i {
    font-size: 20px;
}

.menu-tree {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.tree-root {
    border: 1px solid #e7ebef;
    border-radius: 9px;
    overflow: hidden;
    background: #ffffff;
}

.tree-menu-item {
    min-height: 58px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    background: #f9fbfc;
}

.tree-menu-left {
    display: flex;
    align-items: center;
    gap: 11px;
}

.tree-icon {
    width: 35px;
    height: 35px;
    border-radius: 8px;
    background: #edf5fc;
    color: #1b5e8c;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
}

.tree-icon.small {
    width: 30px;
    height: 30px;
    font-size: 12px;
}

.tree-menu-name {
    color: #162536;
    font-size: 13px;
    font-weight: 600;
}

.tree-menu-code {
    margin-top: 2px;
    color: #9aa5af;
    font-size: 10px;
    font-family: monospace;
}


/* ================================================================
   TREE CHILDREN
================================================================ */

.tree-children {
    border-top: 1px solid #e7ebef;
    padding: 5px 14px 7px 43px;
    background: #ffffff;
}

.tree-nested-children {
    margin-left: 30px;
    padding: 0 0 4px 18px;
    border-left: 1px solid #d6dde4;
}

.tree-child-item {
    position: relative;
    min-height: 46px;
    display: flex;
    align-items: center;
}

.tree-branch {
    position: absolute;
    left: -22px;
    top: 0;
    width: 15px;
    height: 23px;
    border-left: 1px solid #d6dde4;
    border-bottom: 1px solid #d6dde4;
    border-radius: 0 0 0 6px;
}

.tree-child-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.tree-child {
    background: #ffffff;
}


/* ================================================================
   MODAL
================================================================ */

.menu-modal-content {
    padding: 2px 0;
}

.form-section {
    padding: 17px;
    margin-bottom: 13px;
    border: 1px solid #e1e7ed;
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
    margin-bottom: 16px;
}

.form-section-icon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: #edf5fc;
    color: #1b5e8c;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
}

.form-section-header h6 {
    margin: 0 0 2px;
    color: #162536;
    font-size: 14px;
    font-weight: 700;
}

.form-section-header p {
    margin: 0;
    color: #8995a0;
    font-size: 11px;
}


/* ================================================================
   ICON INPUT
================================================================ */

.icon-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.icon-preview {
    position: absolute;
    left: 12px;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    background: #edf5fc;
    color: #1b5e8c;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}

.icon-input-wrapper .admin-form-control {
    padding-left: 45px;
}


/* ================================================================
   STATUS SETTING
================================================================ */

.status-section {
    padding: 12px 17px;
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
    color: #162536;
    font-size: 13px;
    font-weight: 700;
}

.status-setting-content span {
    margin-top: 2px;
    color: #8995a0;
    font-size: 11px;
}


/* ================================================================
   SWITCH
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
    background: #1b5e8c;
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
    min-width: 130px;
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

@media (max-width: 1199.98px) {

    .admin-table {
        min-width: 1100px;
    }

}

@media (max-width: 991.98px) {

    .page-header-content {
        align-items: flex-start;
    }

    .tree-children {
        padding-left: 35px;
    }

}

@media (max-width: 767.98px) {

    .menu-management-page {
        padding-left: 8px;
        padding-right: 8px;
    }

    .page-header-content {
        flex-direction: column;
        align-items: stretch;
    }

    .add-menu-btn {
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

    .menu-icon-box {
        width: 34px;
        height: 34px;
    }

    .menu-id {
        display: none;
    }

    .tree-menu-item {
        padding: 9px 10px;
    }

    .status-setting-content span {
        display: none;
    }

}

</style>
