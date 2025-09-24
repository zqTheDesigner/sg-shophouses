<template>
  <q-page class="flex items-center column">
    <div class="fit" style="max-width: 1400px">
      <q-img :src="content.landingPage.bgImage" style="max-height: 460px">
        <div class="fit flex items-center justify-center column">
          <div>
            <h3 class="text-center gt-sm">{{ content.landingPage.title }}</h3>
            <h5 class="text-center q-my-sm lt-md">{{ content.landingPage.subtitle }}</h5>
          </div>
          <div
            class="mx-auto"
            style="width: 50%; max-width: 300px; min-width: 64px; border: 1px white solid"
          ></div>
          <div class="q-my-md">
            <b style="font-size: 18px" class="text-center">{{ content.landingPage.subtitle }}</b>
          </div>
          <div>
            <q-btn to="/map" label="Visit Map" outline />
          </div>
        </div>
      </q-img>
    </div>

    <div style="max-width: 800px" class="q-mx-auto q-px-md">
      <q-markdown no-heading-anchor-links>{{ content.landingPage.content }}</q-markdown>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { content } from '../controllers/contentController'
</script>
