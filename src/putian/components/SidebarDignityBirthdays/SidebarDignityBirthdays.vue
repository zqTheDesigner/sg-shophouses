<template>
  <div>
    <p class="q-my-sm">{{ content.description[lang] }}</p>
    <div class="flex row justify-between no-wrap">
      <q-select
        dense=""
        :label="content.monthSelectionLabel[lang]"
        :options="monthOptions"
        v-model="month"
        class="fit q-mr-md"
      />
      <q-select
        dense
        :label="content.dateSelectionLabel[lang]"
        :options="dateOptions"
        v-model="date"
        class="fit"
      />
      <q-btn
        color="grey-8"
        dense
        size="sm"
        class="q-my-md"
        no-wrap
        @click="resetDate()"
        >{{ content.resetDates[lang] }}</q-btn
      >
    </div>

    <div>
      <DignityBirthdayCard
        v-for="(d, index) in birthdayCelebrationsSelected"
        :key="index"
        :data="d"
      />
    </div>

    <!-- {{ birthdayCelebrationsSelected }} -->
  </div>
</template>

<script setup>
import appController from "src/putian/stores/appController"
import birthdayCelebrations from "/public/putian/data/birthday_celebrations.json"
import { computed, onUnmounted, ref, watchEffect } from "vue"
import DignityBirthdayCard from "./DignityBirthdayCard.vue"
import { map } from "src/putian/stores/app"

const { lang } = appController

const content = {
  description: {
    ch: "选择农历日期",
    en:
      "Dates are in the format of the Chinese Lunar Calendar. Click on the calendar data.",
  },
  monthSelectionLabel: {
    ch: "月份",
    en: "Lunar month",
  },
  dateSelectionLabel: {
    ch: "日期",
    en: "Date",
  },
  resetDates: {
    ch: "清空日期",
    en: "Clear Date",
  },
}

const birthdayCelebrationsSelected = computed(() => {
  if (!month.value || !date.value) {
    return null
  }

  return birthdayCelebrations.filter((b) => {
    // return true

    const startMonth = parseInt(b.startdate.split("-")[0]) || 0
    const endMonth = parseInt(b.enddate.split("-")[0]) || 0

    const startDate = parseInt(b.startdate.split("-")[1]) || 0
    const endDate = parseInt(b.enddate.split("-")[1]) || 0

    if (startMonth === endMonth) {
      return (
        startMonth === month.value && startDate <= date.value && endDate >= date.value
      )
    }

    if (startMonth !== endMonth) {
      if (month.value === startMonth) {
        return date.value > startDate
      } else if (month.value === endMonth) {
        return date.value < endDate
      } else {
        return false
      }
    }
  })
})

const monthOptions = Array(12)
  .fill()
  .map((e, i) => i + 1)

// Remark, Lunar month doesn't have 31 days
const dateOptions = Array(31)
  .fill()
  .map((e, i) => i + 1)

const month = ref()

const date = ref()

const resetDate = () => {
  month.value = null
  date.value = null
}

watchEffect(() => {
  // console.log(birthdayCelebrationsSelected.value);
  Object.values(map.value.markers).map((m) => m.show())
  birthdayCelebrationsSelected.value?.map((b) => {
    const id = b?.uid_b.split("-")[0]
    if (id) {
      map.value.markers?.[id]?.highlight()
    }
  })
})
onUnmounted(() => {
  Object.values(map.value.markers).map((m) => m.show())
})
</script>

<style lang="scss" scoped></style>
