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

    <div style="max-width: 800px" class="q-mb-xl q-mx-auto flex column full-width q-px-md">
      <q-markdown no-heading-anchor-links> {{ content.content }}</q-markdown>

      <div
        v-for="content in content.listOfContent"
        :key="content.title"
        class="full-width column flex justify-begin q-mt-xl"
      >
        <i>{{ content.subtitle }}</i>
        <a
          v-if="content.link.startsWith('http')"
          :href="content.link"
          class="text-black"
          target="_blank"
        >
          <p class="q-mb-sm">{{ content.link }}</p>
        </a>

        <router-link
          v-if="!content.link.startsWith('http')"
          :to="content.link"
          class="text-black"
          target="_blank"
        >
          <p class="q-mb-sm">{{ content.link }}</p>
        </router-link>

        <p class="q-my-sm">{{ content.brief }}</p>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { content as pageContent } from 'src/content/sgShops'

const content = pageContent.contentPage
</script>

<style scoped></style>
