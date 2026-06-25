<template>
  <div>
    <ul class="props">
      <li v-for="(value, key) in props.feature" :key="key">
        <div v-if="key !== 'geometry'">
          <span class="label">
            <b>{{ key }}:</b>
          </span>
          <span class="value">
            <q-markdown v-if="key == 'detail'">{{ value }}</q-markdown>

            <div v-else-if="key == 'Gallery'">
              <q-img
                v-for="(imgSrc, k) in value"
                :src="imgSrc"
                :key="k"
                @click="openImage(imgSrc)"
              />
            </div>

            <span v-else v-html="useHighlight(value)"></span>
          </span>
        </div>
      </li>
    </ul>

    <q-dialog v-model="imagePopup">
      <q-img :src="imageSrc" />
    </q-dialog>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import {highlight} from 'src/utils/highlight'

const useHighlight = (text) => {
  return highlight(text)
}
const props = defineProps(['feature'])

const imagePopup = ref(false)
const imageSrc = ref('')

const openImage = (src) => {
  imagePopup.value = true
  imageSrc.value = src
}


</script>

<style lang="scss" scoped></style>
