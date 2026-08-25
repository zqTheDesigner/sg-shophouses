<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-cyan-9">
      <MainHeader />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import MainHeader from "src/components/MainHeader.vue"

defineOptions({
  name: "MainLayout",
})
</script>
