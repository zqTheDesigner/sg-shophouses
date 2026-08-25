<template>
  <div>
    <q-select
      class="q-my-md"
      outlined
      :label="props.label"
      :options="selectOptions"
      multiple
      v-model="selected"
      use-chips
      use-input
      @filter="filter"
      @update:model-value="emit('select', selected)"
    >
      <template v-slot:selected-item="scope">
        <div
          class="bg-grey-4 q-mb-sm q-px-sm q-mr-sm flex row items-center justify-between no-wrap"
          style="border-radius: 4px"
        >
          <q class="q-py-xs q-pr-sm">{{ scope.opt.label }}</q>
          <q-btn
            dense=""
            size="xs"
            rounded
            flat
            icon="close"
            @click="scope.removeAtIndex(scope.index)"
          />
        </div>
        <!-- <q-chip
          removable
          dense
          @remove="scope.removeAtIndex(scope.index)"
          :tabindex="scope.tabindex"
          color="white"
          text-color="secondary"
          class="q-ma-none"
          :label="scope.opt.label"
        /> -->
      </template>
    </q-select>
  </div>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({ options: {}, label: {} })
const emit = defineEmits(["select"])

const selectOptions = ref(props.options)
const selected = ref()

const filter = (val, update) => {
  update(() => {
    const needle = val.toLowerCase()

    if (needle === "") {
      selectOptions.value = props.options
    } else {
      selectOptions.value = props.options.filter((v) => {
        return v.label.toLowerCase().indexOf(needle) > -1
      })
    }
  })
}
</script>

<style lang="scss" scoped></style>
