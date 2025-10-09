<template>
  <div class="row full-width items-center justify-between">
    <router-link to="/" style="text-decoration: none; color: white">
      <h5 style="max-width: 240px;font-size:22px" class="q-ma-md">
      <b>{{ content.siteTitle }}</b></h5>
    </router-link>
    <div class="gt-sm absolute full-width d-flex row justify-between" style="pointer-events: none">
      <div class="q-mx-auto row" style="padding-right: 80px">
        <router-link
          class="q-px-sm"
          v-for="item in content.headerLinks"
          :to="item.link"
          :key="item.label"
          style="text-decoration: none; pointer-events: auto"
        >
          <p class="q-ma-xs text-white">
            {{ item.label }}
          </p>
        </router-link>
      </div>
    </div>
    <div
      class="lt-md absolute full-width d-flex row justify-end"
      style="pointer-events: none; padding-right: 80px"
    >
      <q-btn icon="menu" style="pointer-events: auto"></q-btn>
      <q-menu
        label="test"
        class="bg-cyan-9 full-width"
        fit
        anchor="bottom middle"
        :offset="[0, 14]"
        self="top middle"
      >
        <router-link
          class="q-pa-none text-center full-width"
          v-for="item in content.headerLinks"
          :to="item.link"
          :key="item.label"
          style="text-decoration: none"
        >
          <p class="q-ma-xs text-white q-py-md" style="border-bottom: solid 1px white">
            {{ item.label }}
          </p>
        </router-link>
      </q-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { content } from '../controllers/contentController'
</script>

<style scoped></style>
