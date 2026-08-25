<template>
  <div class="bg-white flex row">
    <div class="flex column justify-between shadow-5" style="z-index: 1">
      <div class="flex column">
        <SideBarIcon icon="info" @click="toggleSidebar('info')" tab="info" />
        <SideBarIcon icon="search" @click="toggleSidebar('search')" tab="search" />
        <SideBarIcon img="lantern" @click="toggleSidebar('yuanxiao')" tab="yuanxiao" />
        <SideBarIcon
          icon="cake"
          @click="toggleSidebar('dignityBirthdays')"
          tab="dignityBirthdays"
        />
        <!-- <SideBarIcon label="华" /> -->
        <SideBarIcon label="姓" @click="toggleSidebar('surname')" tab="surname" />
      </div>

      <div>
        <SideBarIcon icon="settings" @click="toggleSidebar('setting')" tab="setting" />
      </div>
    </div>
    <q-scroll-area
      v-show="sidebarExpanded"
      class="bg-grey-3 q-pa-md"
      style="width: 360px"
    >
      <div class="flex row justify-between items-center">
        <h6 class="q-ma-none">{{ sideBarTitle?.title?.[lang] }}</h6>
        <q-btn size="sm" icon="close" flat dense :onclick="() => setSidebarTab('')" />
      </div>
      <hr />
      <AppSetting v-if="sidebarTab === 'setting'" />
      <SidebarInfoTab v-if="sidebarTab === 'info'" />
      <SidebarSearchTab v-if="sidebarTab === 'search'" />
      <SidebarDignityBirthdays v-if="sidebarTab === 'dignityBirthdays'" />
      <SidebarSurname v-if="sidebarTab === 'surname'" />
      <SidebarYuanxiao v-if="sidebarTab === 'yuanxiao'" />
    </q-scroll-area>
  </div>
</template>

<script setup>
import SideBarIcon from "./UI/SideBarIcon.vue"
import AppSetting from "./AppSetting.vue"
import appController from "src/putian/stores/appController"
import SidebarInfoTab from "./SidebarInfoTab.vue"
import { computed } from "vue"
import SidebarSearchTab from "./SidebarSearchTab/SidebarSearchTab.vue"
import SidebarDignityBirthdays from "./SidebarDignityBirthdays/SidebarDignityBirthdays.vue"
import SidebarSurname from "./SidebarSurname/SidebarSurname.vue"
import SidebarYuanxiao from "./SidebarYuanxiao/SidebarYuanxiao.vue"

const { sidebarTab, sidebarExpanded, setSidebarTab, lang } = appController

const sideBarTitles = [
  { tab: "setting", title: { ch: "设置", en: "Setting" } },
  { tab: "info", title: { ch: "村落信息", en: "Village Information" } },
  { tab: "search", title: { ch: "查询", en: "Lookup" } },
  {
    tab: "dignityBirthdays",
    title: { ch: "神诞", en: "Dignity Birthdays" },
  },
  {
    tab: "surname",
    title: { ch: "姓氏", en: "Surnames" },
  },
  { tab: "yuanxiao", title: { ch: "元宵节游行", en: "YuanXiao Processions" } },
]

const sideBarTitle = computed(
  () => sideBarTitles.filter((t) => t.tab === sidebarTab.value)?.[0]
)

const toggleSidebar = (t) => {
  if (sidebarTab.value === t) {
    setSidebarTab("")
  } else {
    setSidebarTab(t)
  }
}
</script>

<style lang="scss" scoped></style>
