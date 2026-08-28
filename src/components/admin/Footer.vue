<template>
    <footer class="footer">

        <div class="footer-left">
            © {{ currentYear }} RBME. All Rights Reserved.
        </div>

        <div class="footer-right">
            Version 1.0.0
        </div>

    </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>

.footer{
    height:60px;
    background:#ffffff;
    border-top:1px solid #e5e7eb;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 25px;
    color:#6b7280;
    font-size:14px;
}

.footer-left{
    font-weight:500;
}

.footer-right{
    font-weight:500;
}

@media (max-width: 575.98px) {
    .footer {
        height: auto;
        min-height: 60px;
        gap: 6px 16px;
        padding: 12px 15px;
        flex-wrap: wrap;
        font-size: 12px;
    }
}

</style>