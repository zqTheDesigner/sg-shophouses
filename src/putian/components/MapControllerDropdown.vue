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
        <q-checkbox
          dense
          class="q-my-xs q-mx-md"
          v-for="option in options"
          :label="option.label[lang]"
          :key="option.name"
          v-model="checkboxValues[option.name]"
          @update:model-value="(v) => emit('select', v, option)"
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

const checkboxValues = ref({})

onMounted(() => {
  // console.log("MapControllerDropdown Mounted");
  props.options.forEach((opt) => {
    checkboxValues.value[opt.name] = false
    if (opt?.default_checked) {
      checkboxValues.value[opt.name] = true
      // console.log("showing", opt);
      emit("select", true, opt)
    }
  })
})
</script>

<style lang="scss"></style>
