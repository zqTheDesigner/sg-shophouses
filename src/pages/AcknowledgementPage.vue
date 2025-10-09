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

    <div style="max-width: 1200px" class="q-mx-auto q-px-md q-my-lg">
      <q-markdown no-heading-anchor-links> {{ content.content }}</q-markdown>

      <div class="text-center q-mt-lg">
        <q-img
          src="/images/NHB logo.png"
          alt=""
          style="max-width: 240px; width: 100%; margin"
          class="text-center"
        />
        <div class="q-my-md">
          <b style="font-size: 18px"
            >Heritage Research Grant, National Heritage Board of Singapore</b
          >
        </div>
      </div>
      <div>
        <h4 class="text-center">Shops</h4>

        <div class="column items-center justify-center">
          <div v-for="shop in content.shops" class="column items-center" :key="shop.name">
            <q-img :src="shop.image" style="width: 260px" />
            <b style="font-size: 16px" class="q-mx-md q-my-md">{{ shop.name }}</b>
          </div>
        </div>
      </div>

      <div>
        <h4 class="text-center q-my-xl">Individials</h4>
        <div class="column items-center justify-start">
          <div
            v-for="people in content.individuals"
            class="row items-center"
            :key="people.name"
          >
            <q-img v-if="people.image" :src="people.image" style="max-width: 260px" />
            <b style="font-size: 16px" class="q-mx-md">{{ people.name }}</b>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { content as pageContent } from "src/content/sgShops"

const content = pageContent.acknowledgementPage
</script>

<style lang="scss" scoped></style>
