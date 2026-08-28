<template>

    <div class="admin-layout">

        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Content -->
        <div class="main-wrapper">

            <!-- Header -->
            <Header />

            <!-- Page Content -->
            <main class="content">

                <router-view />

            </main>

            <!-- Footer -->
            <Footer />

        </div>

    </div>

</template>

<script setup>

import Sidebar from "@/components/admin/Sidebar.vue";
import Header from "@/components/admin/Header.vue";
import Footer from "@/components/admin/Footer.vue";

</script>

<style scoped>

.admin-layout{
    display:flex;
    min-height:100vh;
    background:#f5f6fa;
}

/* Main wrapper: no left margin on small screens, reserve space on lg+ */
.main-wrapper{
    flex:1;
    margin-left:0;
    display:flex;
    flex-direction:column;
    transition: margin-left .2s;
}

@media (min-width: 992px) {
    .main-wrapper{
        margin-left:250px;
    }
}

.content{
    flex:1;
    padding:20px;
}

</style>