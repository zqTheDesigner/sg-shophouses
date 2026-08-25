<template>
  <div class="q-pa-md flex row items-center justify-between">
    <h5 class="q-ma-none">{{ content[lang].title }}</h5>
    <p class="q-ma-none">{{ content[lang].subtitle }}</p>
  </div>
</template>

<script setup>
import appController from "src/stores/appController"

const { lang } = appController

const content = {
  en: {
    title: "Ritual Alliances of the Putian Plain",
    subtitle: "NUS Chinese Studies Department",
  },
  ch: { title: "莆田平原的仪式联盟", subtitle: "新加坡国立大学中文系" },
}
</script>

<style lang="scss" scoped></style>
