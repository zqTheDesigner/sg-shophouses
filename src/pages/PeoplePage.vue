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

    <div style="max-width: 800px" class="q-mb-xl q-px-md q-mx-auto flex column full-width">
      <q-markdown no-heading-anchor-links> {{ content.content }}</q-markdown>

      <div
        v-for="people in content.people"
        :key="people.name"
        class="full-width column flex justify-begin"
      >
        <h5 class="q-mb-sm">{{ people.name }}</h5>
        <i>{{ people.subtitle }}</i>
        <p class="q-my-sm">{{ people.info }}</p>
      </div>

      <div v-if="content['special-advisors']">
        <div style="border-top: 1px solid black" class="q-mt-lg"></div>
        <h4 class="q-mb-sm q-mt-xl">Special Advisors</h4>
        <div
          v-for="people in content['special-advisors']"
          :key="people.name"
          class="full-width column flex justify-begin"
        >
          <h5 class="q-mb-sm">{{ people.name }}</h5>
          <p class="q-my-sm">{{ people.info }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { content as pageContent } from 'src/content/sgShops'

const content = pageContent.peoplePage
</script>

<style scoped></style>
