<template>
  <q-page class="q-pa-lg">
    <div class="row q-gutter-md">
      <btn-dialog-library-refresh />
      <btn-dialog-media-server-subtitle-refresh />
      <q-btn color="primary" @click="setLock(true)" :label="$t('library.tvs.lockButton')" />
      <q-btn color="primary" @click="setLock(false)" :label="$t('library.tvs.unlockButton')" />
      <div v-if="selection.length" class="self-center text-grey">{{ $t('library.tvs.selectedCount', { count: selection.length }) }}</div>
      <q-btn v-if="selection.length" color="primary" flat @click="selection = []" :label="$t('library.tvs.clearSelectionButton')" />

      <q-space />

      <q-input v-model="filterForm.search" outlined dense :label="$t('library.searchPlaceholder')">
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <q-separator class="q-my-md" />

    <div v-if="tvs.length" class="row q-gutter-x-md q-gutter-y-lg">
      <q-intersection v-for="item in filteredTvs" :key="item.root_dir_path" style="width: 160px; height: 280px" once>
        <div
          class="item-wrapper cursor-pointer"
          @click="toggleSelection(item)"
          :class="{ selected: selection.includes(item.root_dir_path) }"
        >
          <list-item-t-v :data="item" :selected="selection" />
          <q-checkbox
            :model-value="selection.includes(item.root_dir_path)"
            class="absolute-top-right no-pointer-events"
          />
        </div>
      </q-intersection>
    </div>
    <div v-else class="q-my-md text-grey">{{ $t('library.tvs.emptyState') }}</div>
  </q-page>
</template>

<script setup>
import { useLibrary } from 'pages/library/use-library';
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ListItemTV from 'pages/library/tvs/ListItemTV';
import BtnDialogLibraryRefresh from 'pages/library/BtnLibraryRefresh';
import BtnDialogMediaServerSubtitleRefresh from 'pages/library/BtnMediaServerSubtitleRefresh';
import { SystemMessage } from 'src/utils/message';
import LibraryApi from 'src/api/LibraryApi';
import { VIDEO_TYPE_TV } from 'src/constants/SettingConstants';
import { useQuasar } from 'quasar';

const { t } = useI18n();
const $q = useQuasar();

const filterForm = reactive({
  hasSubtitle: null,
  search: '',
});

const selection = ref([]);

const { tvs } = useLibrary();

const filteredTvs = computed(() => {
  let res = tvs.value;

  const getSubtitleCount = (item) => item.one_video_info.filter((e) => e.sub_f_path_list.length > 0).length;

  if (filterForm.hasSubtitle === 1) {
    res = res.filter((item) => getSubtitleCount(item) === 0);
  }
  if (filterForm.hasSubtitle === 2) {
    res = res.filter((item) => getSubtitleCount(item) > 0 && getSubtitleCount(item) < item.one_video_info.length);
  }
  if (filterForm.hasSubtitle === 3) {
    res = res.filter((item) => getSubtitleCount(item) === item.one_video_info.length);
  }

  if (filterForm.search !== '') {
    res = res.filter((item) => item.name.toLowerCase().includes(filterForm.search.toLowerCase()));
  }

  return res;
});

const toggleSelection = (item) => {
  const itemKey = item.root_dir_path;
  if (selection.value.includes(itemKey)) {
    selection.value = selection.value.filter((e) => e !== itemKey);
  } else {
    selection.value.push(itemKey);
  }
};

const lockTv = async (item, lock) => {
  const [tvInfo] = await LibraryApi.getTvDetail({
    name: item.name,
    main_root_dir_f_path: item.main_root_dir_f_path,
    root_dir_path: item.root_dir_path,
  });

  return LibraryApi.setSkipInfo({
    video_skip_infos: tvInfo.one_video_info.map((e) => ({
      video_type: VIDEO_TYPE_TV,
      physical_video_file_full_path: e.video_f_path,
      is_bluray: false,
      is_skip: lock,
    })),
  });
};

const setLock = async (flag) => {
  if (selection.value.length === 0) {
    SystemMessage.warn(t('library.tvs.selectAtLeastOneWarning'));
    return;
  }
  $q.dialog({
    title: t('common.confirmationTitle'),
    message: t('library.tvs.lockDialogMessage', { action: flag ? t('library.tvs.lockAction') : t('library.tvs.unlockAction'), count: selection.value.length }),
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await Promise.allSettled(
      selection.value.map((e) => tvs.value.find((f) => f.root_dir_path === e)).map((e) => lockTv(e, flag))
    );
    // 取消选中
    selection.value = [];
    SystemMessage.success(t('common.operationSuccess'));
  });
};
</script>

<style lang="scss">
.item-wrapper {
  overflow: hidden;
  border-radius: 4px;
  padding: 2px;

  &.selected {
    box-shadow: 0 0 0 2px $primary;
  }
}
</style>
