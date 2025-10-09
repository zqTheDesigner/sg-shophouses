<template>
  <q-page class="flex items-center column">
    <div class="fit" style="max-width: 1400px">
      <q-img :src="content.bgImage" style="max-height: 450px">
        <div class="fit flex items-center justify-center column">
          <div>
            <h3 class="text-center gt-sm">{{ content.title }}</h3>
            <h5 class="text-center q-my-sm lt-md">{{ content.title }}</h5>
          </div>
          <div
            class="mx-auto"
            style="width: 50%; max-width: 300px; min-width: 64px; border: 1px white solid"
          ></div>
          <div class="q-my-md">
            <b style="font-size: 18px" class="text-center">{{ content.subtitle }}</b>
          </div>
        </div>
      </q-img>
    </div>

    <div style="max-width: 800px" class="q-mx-auto q-px-md q-my-lg">
      <q-markdown no-heading-anchor-links> {{ content.content }}</q-markdown>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { content as pageContent } from 'src/content/sgShops'
const content = pageContent.about

</script>

<style scoped></style>
