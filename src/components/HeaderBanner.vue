<template>
  <div class="row no-wrap items-center fit q-px-sm q-my-xl" style="max-width: 800px">
    <div class="fit" style="max-width: 400px" v-if="props.bgImage">
      <q-img :src="props.bgImage">
        <div
          class="fit row items-end q-py-none"
          style="padding: 0; background-color: rgba(0, 0, 0, 0)"
        >
          <i
            class="full-width text-center"
            style="
              background: linear-gradient(
                90deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.29) 50%,
                rgba(0, 0, 0, 0) 100%
              );
            "
            >artwork by<a
              href="https://archplate.com/zhangqiao/"
              target="__blank"
              class="text-white"
            >
              Zhang Qiao</a
            ></i
          >
        </div>
      </q-img>
    </div>
    <div class="fit q-ml-md">
      <h4 class="q-my-md" style="color: #d5b895; font-weight: bold">{{ props.title }}</h4>
      <div
        class="mx-auto"
        style="width: 50%; max-width: 300px; min-width: 64px; border: 0.1px solid"
        v-if="props.subtitle"
      ></div>
      <h6 class="q-my-sm">{{ props.subtitle }}</h6>

      <q-btn
        style="color: #d5b895"
        :to="props.link"
        v-if="props.link"
        label="Visit Map"
        outline
        class="q-my-md"
      />

      <!-- Quick fix for putian button -->
      <q-btn style="color: #d5b895" to="/putian" label="Putian" outline class="q-mx-md" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue"
const props = defineProps(["title", "subtitle", "bgImage", "link"])
</script>

<style lang="scss" scoped></style>
