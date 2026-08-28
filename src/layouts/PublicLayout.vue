<template>
  <div class="public-layout">

   

    <Navbar />

    <main>
      <router-view />
    </main>

    <Footer />

  </div>
</template>

<script setup>
// import Header from "@/components/public/layout/Header.vue";
import Navbar from "@/components/public/layout/Navbar.vue";
import Footer from "@/components/public/layout/Footer.vue";
</script>