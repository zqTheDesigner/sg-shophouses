<template>
  <div>
    <q-expansion-item
      dense
      default-opened
      :label="props.label"
      header-class="bg-cyan-9 text-bold"
      dark
      header-style="border-radius:6px"
      class="q-mb-xs"
    >
      <div class="flex column">
        <q-radio
          dense
          class="q-my-xs q-mx-md"
          v-model="selectionValues"
          v-for="option in options"
          :label="option.label[lang]"
          :val="option.value"
          :key="option.name"
          @update:model-value="(v) => emit('select', option.value)"
        />
      </div>
    </q-expansion-item>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import appController from "src/putian/stores/appController"

const { lang } = appController

const props = defineProps({ label: {}, options: {} })
const emit = defineEmits(["select"])

const selectionValues = ref({})

onMounted(() => {
  selectionValues.value = props.options[0].value
})
</script>

<style lang="scss" scoped></style>
