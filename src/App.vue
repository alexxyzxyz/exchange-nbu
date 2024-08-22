<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'


</script>

<template>
  <TheHeader />
  <main class="content">
    <router-view />
  </main>
  <TheFooter />
</template>

<style lang="scss" scoped>
  .content {
    margin-top: 50px;
    min-height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    max-width: 1280px;
  }
</style>
