<template>
  <span @click.stop="visible = true">
    <slot></slot>
  </span>

  <q-dialog v-model="visible">
    <q-card style="width: 900px; max-width: 900px">
      <q-card-section>
        <div class="text-h6">{{ $t('library.tvs.detailDialog.title', { showName: data.name }) }}</div>
      </q-card-section>

      <q-tabs v-model="tab" dense active-color="primary" indicator-color="primary" align="justify" narrow-indicator>
        <q-tab
          v-for="item in categoryVideos"
          :key="item.season"
          :name="item.season"
          :label="$t('library.tvs.detailDialog.seasonLabel', { season: item.season })"
          style="max-width: 150px"
        />
      </q-tabs>

      <q-separator />

      <q-card-section style="max-height: 40vh; overflow: auto">
        <div class="row items-center q-ml-md q-py-none">
          <q-checkbox
            :model-value="selectAllValue"
            indeterminate-value="maybe"
            @click="handleSelectAll"
            :title="$t('library.tvs.detailDialog.selectAllTooltip')"
          />

          <q-btn
            class="btn-download"
            color="primary"
            :label="$t('library.tvs.detailDialog.downloadSelectedButton')"
            flat
            :disable="selection.length === 0"
            @click="downloadSelection"
          ></q-btn>

          <q-btn
            class="btn-download"
            color="primary"
            icon="lock"
            :title="$t('library.tvs.detailDialog.lockSelectedTooltip')"
            flat
            :disable="selection.length === 0"
            @click="skipAll(true)"
          ></q-btn>

          <q-btn
            class="btn-download"
            color="primary"
            icon="lock_open"
            :title="$t('library.tvs.detailDialog.unlockSelectedTooltip')"
            flat
            :disable="selection.length === 0"
            @click="skipAll(false)"
          ></q-btn>

          <q-space />

          <btn-dialog-search-subtitle
            search-package
            :package-episodes="currentTabEpisodes"
            :label="$t('library.tvs.detailDialog.searchSeasonPackageButton')"
            size="md"
          />
          <btn-upload-multiple-for-tv :items="currentTabEpisodes" />
        </div>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel v-for="{ season, episodes } in categoryVideos" :key="season" :name="season" style="padding: 0">
            <q-list dense>
              <q-item v-for="item in episodes" :key="item.name">
                <q-item-section side top>
                  <q-checkbox v-model="selection" :val="item" />
                </q-item-section>
                <q-item-section>{{ $t('library.tvs.detailDialog.episodeLabel', { episode: pandStart2(item.episode) }) }}</q-item-section>

                <q-item-section v-if="item.sub_f_path_list.length" side>
                  <btn-dialog-preview-video :subtitle-url-list="item.sub_url_list" :path="item.video_f_path" />
                </q-item-section>

                <q-item-section side>
                  <btn-upload-subtitle :path="item.video_f_path" />
                </q-item-section>

                <q-item-section side>
                  <btn-ignore-video :path="item.video_f_path" :video-type="VIDEO_TYPE_TV" />
                </q-item-section>

                <q-item-section side>
                  <q-btn
                    v-if="item.sub_f_path_list.length"
                    color="black"
                    round
                    flat
                    dense
                    icon="closed_caption"
                    @click.stop
                    :title="$t('library.tvs.hasSubtitles')"
                  >
                    <q-popup-proxy anchor="top right">
                      <q-list dense>
                        <q-item v-for="(item1, index) in item.sub_url_list" :key="item1">
                          <q-item-section side>{{ index + 1 }}.</q-item-section>

                          <q-item-section class="overflow-hidden ellipsis" :title="item1.split(/[/\\\\]/).pop()">
                            <a class="text-primary" :href="getUrl(item1)" target="_blank">{{
                              item1.split(/[/\\\\]/).pop()
                            }}</a>
                          </q-item-section>
                          <q-item-section side>
                            <q-btn
                              color="primary"
                              round
                              flat
                              dense
                              icon="construction"
                              :title="$t('library.movies.fixTimelineTitle') + (!formModel.advanced_settings.fix_time_line ? $t('library.movies.fixTimelineDisabledHint') : '')"
                              @click="doFixSubtitleTimeline(item1)"
                              :disable="!formModel.advanced_settings.fix_time_line"
                            ></q-btn>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-popup-proxy>
                  </q-btn>
                  <q-btn v-else color="grey" round flat dense icon="closed_caption" @click.stop :title="$t('library.tvs.noSubtitles')" />
                </q-item-section>

                <q-item-section side>
                  <btn-dialog-search-subtitle
                    size="md"
                    round
                    :path="item.video_f_path"
                    :season="item.season"
                    :episode="item.episode"
                  />
                </q-item-section>

                <q-item-section side>
                  <q-btn
                    class="btn-download"
                    color="primary"
                    round
                    flat
                    dense
                    icon="download_for_offline"
                    :title="$t('library.movies.addToDownloadQueue')"
                    @click="downloadSubtitle(item)"
                  ></q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import LibraryApi from 'src/api/LibraryApi';
import { SystemMessage } from 'src/utils/message';
import { VIDEO_TYPE_TV } from 'src/constants/SettingConstants';
import config from 'src/config';
import { useQuasar } from 'quasar';
import { useSelection } from 'src/composables/use-selection';
import BtnIgnoreVideo from 'pages/library/BtnIgnoreVideo';
import eventBus from 'vue3-eventbus';
import BtnUploadSubtitle from 'pages/library/BtnUploadSubtitle';
import BtnDialogPreviewVideo from 'pages/library/BtnDialogPreviewVideo';
import BtnDialogSearchSubtitle from 'pages/library/BtnDialogSearchSubtitle';
import BtnUploadMultipleForTv from 'pages/library/tvs/BtnUploadMultipleForTv';
import { doFixSubtitleTimeline } from 'pages/library/use-library';
import { formModel } from 'pages/settings/use-settings';

const props = defineProps({
  data: Object,
});

const { t } = useI18n();
const $q = useQuasar();

const categoryVideos = computed(() => {
  // [{season: episodes: []}]
  const result = [];
  props.data?.one_video_info.forEach((item) => {
    const { season } = item;
    const index = result.findIndex((e) => e.season === season);
    if (index === -1) {
      result.push({
        season,
        episodes: [item],
      });
    } else {
      result[index].episodes.push(item);
    }
  });
  result.sort((a, b) => a.season - b.season);
  result.forEach((item) => {
    item.episodes.sort((a, b) => a.episode - b.episode);
  });
  return result;
});

const tab = ref(null);

watch(categoryVideos, () => {
  if (categoryVideos.value.length && tab.value === null) {
    tab.value = categoryVideos.value[0].season;
  }
});

const currentTabEpisodes = computed(() => categoryVideos.value.find((e) => e.season === tab.value)?.episodes ?? []);

const { selectAllValue, handleSelectAll, selection } = useSelection(currentTabEpisodes);
watch(tab, () => {
  selection.value = [];
});

const pandStart2 = (num) => {
  if (num < 10) {
    return `0${num}`;
  }
  return num;
};

const visible = ref(false);

const getUrl = (path) => config.BACKEND_URL + path.split(/[/\\\\]/).join('/');

const downloadSubtitle = async (items) => {
  const downloadList = items instanceof Array ? items : [items];
  $q.dialog({
    title: t('library.tvs.detailDialog.bulkDownloadDialog.title', { count: downloadList.length }),
    message: t('library.movies.addToDownloadQueueDialog.message'),
    options: {
      model: 3,
      type: 'radio',
      items: [
        { label: t('library.movies.addToDownloadQueueDialog.optionPriority'), value: 3 },
        { label: t('library.movies.addToDownloadQueueDialog.optionOneTime'), value: 0 },
      ],
    },
    cancel: true,
    persistent: true,
  }).onOk(async (val) => {
    // 下载全部Promises
    const promises = downloadList.map(async (item) => {
      const [, err] = await LibraryApi.downloadSubtitle({
        video_type: VIDEO_TYPE_TV,
        physical_video_file_full_path: item.video_f_path,
        task_priority_level: val, // 一般的队列等级是5，如果想要快，那么可以先默认这里填写3，这样就可以插队
        // 媒体服务器内部视频ID  `video/list` 中 获取到的 media_server_inside_video_id，可以用于自动 Emby 字幕列表刷新用
        media_server_inside_video_id: item.media_server_inside_video_id,
      });
      if (err !== null) {
        return Promise.reject(err);
      }
      return Promise.resolve();
    });

    const result = await Promise.allSettled(promises);

    const successCount = result.filter((item) => item.status === 'fulfilled').length;
    const errorCount = result.filter((item) => item.status === 'rejected').length;

    const msg = t('library.tvs.detailDialog.bulkDownloadDialog.successMessage', {
      successCount,
      errorCount,
      errorMessage: errorCount ? t('library.tvs.detailDialog.bulkDownloadDialog.errorMessagePart', { errorCount }) : '',
    });

    SystemMessage.success(msg);
  });
};

const skipAll = async (isSkip) => {
  $q.dialog({
    title: t('library.tvs.detailDialog.bulkLockDialog.title', { action: isSkip ? t('library.tvs.lockAction') : t('library.tvs.unlockAction') }),
    message: t('library.tvs.detailDialog.bulkLockDialog.message', { action: isSkip ? t('library.tvs.lockAction') : t('library.tvs.unlockAction') }),
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    const [, err] = await LibraryApi.setSkipInfo({
      video_skip_infos: selection.value.map((item) => ({
        video_type: VIDEO_TYPE_TV,
        physical_video_file_full_path: item.video_f_path,
        is_bluray: false,
        is_skip: isSkip,
      })),
    });
    if (err !== null) {
      SystemMessage.error(err.message);
      return;
    }
    const [res, err2] = await LibraryApi.getSkipInfo({
      video_skip_infos: selection.value.map((item) => ({
        video_type: VIDEO_TYPE_TV,
        physical_video_file_full_path: item.video_f_path,
        is_bluray: false,
        is_skip: true,
      })),
    });
    if (err2 !== null) {
      SystemMessage.error(err2.message);
      return;
    }

    selection.value.forEach((item, index) => {
      eventBus.emit(`refresh-skip-status-${item.video_f_path}`, res.is_skips[index]);
    });

    SystemMessage.success(t('common.operationSuccess'));
  });
};

const downloadSelection = () => {
  downloadSubtitle(selection.value);
};
</script>
