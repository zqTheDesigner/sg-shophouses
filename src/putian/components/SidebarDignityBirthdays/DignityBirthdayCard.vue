<template>
  <div class="bg-grey-4 q-pa-sm q-mb-sm" style="border-radius: 4px">
    <div class="row q-mb-xs">
      <p class="q-mr-sm q-my-none">{{ content.date[lang] }}:</p>
      <b>
        {{
          data.startdate === data.enddate
            ? data.startdate
            : `${data.startdate} 至 ${data.enddate}`
        }}
      </b>
    </div>
    <div class="row q-mb-xs">
      <p class="q-mr-sm q-my-none">{{ content.village[lang] }}:</p>
      <b>
        {{ getVillage(data.uid_b.split("-")[0]).title }}
      </b>
    </div>
    <div>
      <p>{{ data.text }}</p>
    </div>
  </div>
</template>

<script setup>
import appController from "src/putian/stores/appController"
import mapDataController from "src/putian/stores/mapDataController"
const { lang } = appController

const { getVillage } = mapDataController

const { data } = defineProps({ data: {} })

const content = {
  date: { ch: "日期", en: "Date" },
  village: { ch: "村落", en: "Village" },
}
</script>

<style lang="scss" scoped></style>
