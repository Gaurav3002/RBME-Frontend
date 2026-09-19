<template>
    <aside class="sidebar">

        <!-- =====================================================
             LOGO
        ====================================================== -->
        <div class="logo">

            <!-- Mobile close -->
            <button
                type="button"
                class="sidebar-close"
                aria-label="Close sidebar"
                @click="$emit('close-sidebar')"
            >
                <i class="bi bi-x-lg"></i>
            </button>

            <div class="logo-content">
                <h4>RBME</h4>
                <small>Admin Panel</small>
            </div>

        </div>


        <!-- =====================================================
             NAVIGATION
        ====================================================== -->
        <nav class="menu">

            <!-- =================================================
                 LOADING
            ================================================== -->
            <div
                v-if="loading"
                class="menu-loading"
            >
                <i class="bi bi-arrow-repeat spin"></i>
                <span>Loading menu...</span>
            </div>


            <!-- =================================================
                 DYNAMIC MENU
            ================================================== -->
            <template
                v-else
                v-for="menu in menus"
                :key="menu.id"
            >

                <!-- =============================================
                     MENU WITH CHILDREN
                ============================================== -->
                <div
                    v-if="
                        menu.children &&
                        menu.children.length > 0
                    "
                    class="menu-group"
                >

                    <!-- Parent menu -->
                    <button
                        type="button"
                        class="menu-item menu-toggle"
                        :class="{
                            'menu-open': isMenuOpen(menu.id)
                        }"
                        @click="toggleMenu(menu.id)"
                    >

                        <span class="menu-toggle-left">

                            <i
                                :class="
                                    menu.icon ||
                                    'bi bi-folder'
                                "
                            ></i>

                            <span class="menu-label">
                                {{ menu.name }}
                            </span>

                        </span>


                        <i
                            class="bi toggle-icon"
                            :class="
                                isMenuOpen(menu.id)
                                    ? 'bi-chevron-up'
                                    : 'bi-chevron-down'
                            "
                        ></i>

                    </button>


                    <!-- =========================================
                         SUBMENU
                    ========================================== -->
                    <div
                        v-show="isMenuOpen(menu.id)"
                        class="submenu"
                    >

                        <router-link
                            v-for="child in menu.children"
                            :key="child.id"
                            :to="child.route"
                            class="submenu-item"
                            active-class="submenu-active"
                            @click="$emit('close-sidebar')"
                        >

                            <i
                                :class="
                                    child.icon ||
                                    'bi bi-circle'
                                "
                            ></i>

                            <span>
                                {{ child.name }}
                            </span>

                        </router-link>

                    </div>

                </div>


                <!-- =============================================
                     SINGLE MENU
                ============================================== -->
                <router-link
                    v-else-if="menu.route"
                    :to="menu.route"
                    class="menu-item"
                    active-class="menu-active"
                    @click="$emit('close-sidebar')"
                >

                    <i
                        :class="
                            menu.icon ||
                            'bi bi-circle'
                        "
                    ></i>

                    <span class="menu-label">
                        {{ menu.name }}
                    </span>

                </router-link>

            </template>


            <!-- =================================================
                 NO MENU
            ================================================== -->
            <div
                v-if="
                    !loading &&
                    menus.length === 0
                "
                class="menu-empty"
            >
                <i class="bi bi-menu-button-wide"></i>
                <span>No menu available</span>
            </div>

        </nav>

    </aside>
</template>


<script setup>

import {
    ref,
    onMounted
} from "vue";

import {
    getMenuTree
} from "@/api/menu.api";


// ============================================================
// EMITS
// ============================================================

defineEmits([
    "close-sidebar"
]);


// ============================================================
// STATE
// ============================================================

const menus = ref([]);

const loading = ref(false);

const openMenus = ref([]);


// ============================================================
// LOAD MENU
// ============================================================

const loadMenus = async () => {

    loading.value = true;

    try {

        const { data } = await getMenuTree();

        menus.value = Array.isArray(data)
            ? data
            : [];


        /*
         * Open all parent menus initially.
         */
        openMenus.value = menus.value
            .filter(
                menu =>
                    Array.isArray(menu.children) &&
                    menu.children.length > 0
            )
            .map(menu => menu.id);

    } catch (error) {

        console.error(
            "Failed to load admin menus:",
            error
        );

        menus.value = [];

        openMenus.value = [];

    } finally {

        loading.value = false;

    }
};


// ============================================================
// TOGGLE MENU
// ============================================================

const toggleMenu = (menuId) => {

    if (!menuId) {
        return;
    }


    const index =
        openMenus.value.indexOf(menuId);


    if (index !== -1) {

        /*
         * Close menu
         */
        openMenus.value.splice(index, 1);

    } else {

        /*
         * Open menu
         */
        openMenus.value.push(menuId);

    }
};


// ============================================================
// CHECK MENU OPEN
// ============================================================

const isMenuOpen = (menuId) => {

    return openMenus.value.includes(menuId);

};


// ============================================================
// INITIAL LOAD
// ============================================================

onMounted(() => {

    loadMenus();

});

</script>
<style scoped>

/* ================================
   SIDEBAR
================================ */

.sidebar {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    background: var(--color-white);
    color: var(--color-heading);

    border-right: 1px solid var(--color-border);
    box-shadow: 4px 0 18px rgba(11, 23, 38, 0.06);

    overflow-x: hidden;
    overflow-y: auto;

    z-index: 1050;
    -webkit-overflow-scrolling: touch;
}


/* ================================
   LOGO
================================ */

.logo {
    position: relative;

    min-height: 88px;
    padding: 18px 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--color-white);
    border-bottom: 1px solid var(--color-border);

    flex-shrink: 0;
}

.logo-content {
    text-align: center;
}

.logo h4 {
    margin: 0;

    color: var(--color-primary);

    font-size: 25px;
    font-weight: 800;
    letter-spacing: 1.5px;
    line-height: 1.1;
}

.logo small {
    display: block;
    margin-top: 5px;

    color: var(--color-text-light);

    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
}


/* ================================
   MOBILE CLOSE
================================ */

.sidebar-close {
    display: none;

    position: absolute;
    top: 12px;
    right: 12px;

    width: 34px;
    height: 34px;

    align-items: center;
    justify-content: center;

    border: 1px solid var(--color-border);
    border-radius: 7px;

    background: var(--color-white);
    color: var(--color-text);

    cursor: pointer;

    transition: 0.2s ease;
}

.sidebar-close:hover {
    background: var(--color-primary);
    border-color: var(--color-primary);
    color: var(--color-white);
}

.sidebar-close i {
    font-size: 14px;
}


/* ================================
   MENU
================================ */

.menu {
    display: flex;
    flex-direction: column;

    flex: 1;
    min-height: 0;

    padding: 12px 10px 24px;
}


/* ================================
   LOADING
================================ */

.menu-loading {
    display: flex;
    align-items: center;
    gap: 10px;

    padding: 12px 14px;

    color: var(--color-text-light);
    font-size: 13px;
}

.menu-loading i {
    color: var(--color-primary);
    font-size: 16px;
}

.spin {
    animation: sidebar-spin 1s linear infinite;
}

@keyframes sidebar-spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}


/* ================================
   MENU GROUP
================================ */

.menu-group {
    width: 100%;
    margin: 2px 0;
}


/* ================================
   MENU ITEM
================================ */

.menu-item {
    width: 100%;
    min-height: 48px;

    display: flex;
    align-items: center;
    gap: 12px;

    padding: 11px 13px;
    margin: 2px 0;

    border: 1px solid transparent;
    border-radius: 8px;

    background: transparent;
    color: var(--color-text);

    text-decoration: none;

    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;

    cursor: pointer;
    text-align: left;

    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease;
}


/* ================================
   MENU ICON
================================ */

.menu-item > i {
    width: 21px;
    min-width: 21px;

    color: var(--icon-primary);

    font-size: 17px;
    text-align: center;

    transition: color 0.2s ease;
}


/* ================================
   MENU LABEL
================================ */

.menu-label {
    flex: 1;
    min-width: 0;
    color:var(--color-heading, #162536);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}


/* ================================
   MENU HOVER
================================ */

.menu-item:hover {
    background: var(--color-primary-light);
    border-color: rgba(23, 107, 115, 0.12);

    color: var(--color-primary);
}

.menu-item:hover > i {
    color: var(--color-primary);
}


/* ================================
   ACTIVE SINGLE MENU
================================ */

.menu-item.menu-active {
    background: var(--color-primary);
    border-color: var(--color-primary);

    color: var(--color-white);

    box-shadow: 0 4px 12px rgba(23, 107, 115, 0.18);
}

.menu-item.menu-active > i {
    color: var(--color-white);
}

.menu-item.menu-active:hover {
    background: var(--color-primary-dark);
    border-color: var(--color-primary-dark);

    color: var(--color-white);
}

.menu-item.menu-active:hover > i {
    color: var(--color-white);
}


/* ================================
   MENU TOGGLE
================================ */

.menu-toggle {
    justify-content: space-between;

    appearance: none;
    -webkit-appearance: none;

    font-family: inherit;
    user-select: none;
}

.menu-toggle-left {
    display: flex;
    align-items: center;
    gap: 12px;

    flex: 1;
    min-width: 0;
}


/* ================================
   TOGGLE ARROW
================================ */

.toggle-icon {
    width: auto !important;
    min-width: auto !important;

    flex-shrink: 0;

    color: var(--color-muted) !important;
    font-size: 12px !important;
}

.menu-toggle:hover .toggle-icon {
    color: var(--color-primary) !important;
}


/* ================================
   SUBMENU
================================ */

.submenu {
    display: flex;
    flex-direction: column;

    margin: 2px 0 5px;
    padding: 4px 0;

    background: var(--color-white);

    border-left: 2px solid var(--color-primary-light);
}


/* ================================
   SUBMENU ITEM
================================ */

.submenu-item {
    display: flex;
    align-items: center;
    gap: 11px;

    min-height: 42px;

    margin: 1px 0 1px 10px;
    padding: 9px 12px 9px 20px;

    border-radius: 7px;

    background: transparent;
    color: var(--color-text-light);

    text-decoration: none;

    font-size: 13px;
    font-weight: 500;

    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        padding-left 0.2s ease;
}


/* ================================
   SUBMENU ICON
================================ */

.submenu-item i {
    width: 17px;
    min-width: 17px;

    color: var(--icon-muted);

    font-size: 13px;
    text-align: center;

    transition: color 0.2s ease;
}


/* ================================
   SUBMENU HOVER
================================ */

.submenu-item:hover {
    background: var(--color-primary-light);
    color: var(--color-primary);

    padding-left: 24px;
}

.submenu-item:hover i {
    color: var(--color-primary);
}


/* ================================
   ACTIVE SUBMENU
================================ */

.submenu-item.submenu-active {
    background: var(--color-primary);

    color: var(--color-white);

    font-weight: 600;

    box-shadow: 0 3px 9px rgba(23, 107, 115, 0.15);
}

.submenu-item.submenu-active i {
    color: var(--color-white);
}


/* ================================
   EMPTY MENU
================================ */

.menu-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    padding: 15px;

    color: var(--color-muted);
    font-size: 13px;
}

.menu-empty i {
    color: var(--color-primary);
}


/* ================================
   SCROLLBAR
================================ */

.sidebar::-webkit-scrollbar {
    width: 6px;
}

.sidebar::-webkit-scrollbar-track {
    background: var(--color-white);
}

.sidebar::-webkit-scrollbar-thumb {
    background: rgba(23, 107, 115, 0.20);
    border-radius: 20px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
}


/* ================================
   DESKTOP COLLAPSED
================================ */

:global(.desktop-sidebar.collapsed) .logo {
    padding-left: 8px;
    padding-right: 8px;
}

:global(.desktop-sidebar.collapsed) .logo-content,
:global(.desktop-sidebar.collapsed) .menu-label,
:global(.desktop-sidebar.collapsed) .toggle-icon {
    display: none;
}

:global(.desktop-sidebar.collapsed) .menu {
    padding-left: 8px;
    padding-right: 8px;
}

:global(.desktop-sidebar.collapsed) .menu-item {
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
}

:global(.desktop-sidebar.collapsed) .menu-toggle-left {
    justify-content: center;
}

:global(.desktop-sidebar.collapsed) .submenu {
    display: none !important;
}


/* ================================
   TABLET / MOBILE
================================ */

@media (max-width: 991px) {

    .sidebar {
        width: 250px;
        min-width: 250px;
        max-width: 250px;
    }

    .sidebar-close {
        display: flex;
    }

    .logo {
        min-height: 76px;

        padding: 16px 50px 16px 16px;

        justify-content: flex-start;
    }

    .logo-content {
        text-align: left;
    }

    .logo h4 {
        font-size: 22px;
    }

    .menu {
        padding: 10px 8px 24px;
    }

    /* Keep mobile sidebar expanded */
    :global(.desktop-sidebar.collapsed) .logo-content {
        display: block;
    }

    :global(.desktop-sidebar.collapsed) .menu-label {
        display: inline;
    }

    :global(.desktop-sidebar.collapsed) .toggle-icon {
        display: block !important;
    }

    :global(.desktop-sidebar.collapsed) .menu-item {
        justify-content: flex-start;

        padding-left: 13px;
        padding-right: 13px;
    }

    :global(.desktop-sidebar.collapsed) .menu-toggle-left {
        justify-content: flex-start;
    }

    :global(.desktop-sidebar.collapsed) .submenu {
        display: flex !important;
    }
}


/* ================================
   SMALL MOBILE
================================ */

@media (max-width: 480px) {

    .sidebar {
        width: 240px;
        min-width: 240px;
        max-width: 240px;
    }

    .menu-item {
        min-height: 46px;
        font-size: 13px;
    }

    .submenu-item {
        min-height: 40px;
        font-size: 12.5px;
    }
}

</style>
