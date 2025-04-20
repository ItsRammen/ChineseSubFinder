<template>
  <q-page class="q-pa-lg movie-index">
    <div class="row q-gutter-md">
      <btn-dialog-library-refresh />
      <btn-dialog-media-server-subtitle-refresh />

      <q-space />

      <q-input v-model="filterForm.search" outlined dense :label="$t('library.searchPlaceholder')">
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <q-separator class="q-my-md" />

    <div v-if="movies.length" class="row q-gutter-x-md q-gutter-y-lg">
      <q-intersection v-for="item in filteredMovies" once :key="item.video_f_path" style="height: 280px">
        <list-item-movie :data="item" width="180px" cover-height="220px" />
      </q-intersection>
    </div>
    <div v-else class="q-my-md text-grey">{{ $t('library.movies.emptyState') }}</div>
  </q-page>
</template>

<script setup>
import { useLibrary } from 'pages/library/use-library';
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import BtnDialogLibraryRefresh from 'pages/library/BtnLibraryRefresh';
import BtnDialogMediaServerSubtitleRefresh from 'pages/library/BtnMediaServerSubtitleRefresh';
import ListItemMovie from './ListItemMovie';

const { t } = useI18n();

const filterForm = reactive({
  hasSubtitle: null,
  search: '',
});

const { movies } = useLibrary();

const filteredMovies = computed(() => {
  let res = movies.value;

  if (filterForm.hasSubtitle === true) {
    res = movies.value.filter((item) => item.sub_f_path_list.length > 0);
  }
  if (filterForm.hasSubtitle === false) {
    res = movies.value.filter((item) => item.sub_f_path_list.length === 0);
  }

  if (filterForm.search !== '') {
    res = res.filter((item) => item.name.toLowerCase().includes(filterForm.search.toLowerCase()));
  }

  return res;
});
</script>
