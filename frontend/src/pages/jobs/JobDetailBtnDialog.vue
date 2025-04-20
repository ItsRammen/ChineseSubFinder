<template>
  <q-btn :label="$t('jobs.detailDialog.buttonLabel')" flat dense @click="show = true" color="primary" />

  <q-dialog v-model="show">
    <q-card style="width: 900px; max-width: 900px">
      <q-card-section>
        <div class="text-body1">{{ $t('jobs.detailDialog.title') }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <table class="job-detail-table">
          <tbody>
            <tr>
              <td>{{ $t('jobs.detailDialog.id') }}</td>
              <td>{{ data.id }}</td>
            </tr>
            <tr>
              <td>{{ $t('jobs.detailDialog.status') }}</td>
              <td>{{ translatedJobStatusMap[data.job_status] }}</td>
            </tr>
            <tr>
              <td>{{ $t('jobs.detailDialog.type') }}</td>
              <td>{{ translatedVideoTypeNameMap[data.video_type] }}</td>
            </tr>
            <tr>
              <td>{{ $t('jobs.detailDialog.path') }}</td>
              <td>{{ data.video_f_path }}</td>
            </tr>
            <tr>
              <td>{{ $t('jobs.detailDialog.name') }}</td>
              <td>{{ data.video_name }}</td>
            </tr>
            <tr>
              <td>{{ $t('jobs.detailDialog.feature') }}</td>
              <td>{{ data.feature }}</td>
            </tr>
            <template v-if="data.video_type === VIDEO_TYPE_TV">
              <tr>
                <td>{{ $t('jobs.detailDialog.seriesRootDir') }}</td>
                <td>{{ data.series_root_dir_path }}</td>
              </tr>
              <tr>
                <td>{{ $t('jobs.detailDialog.season') }}</td>
                <td>{{ data.season }}</td>
              </tr>
              <tr>
                <td>{{ $t('jobs.detailDialog.episode') }}</td>
                <td>{{ data.episode }}</td>
              </tr>
            </template>
            <tr>
              <td>{{ $t('jobs.detailDialog.mediaServerId') }}</td>
              <td>{{ data.media_server_inside_video_id }}</td>
            </tr>
            <tr>
              <td>{{ $t('jobs.detailDialog.priority') }}</td>
              <td>{{ data.task_priority }}</td>
            </tr>
            <tr>
              <td>{{ $t('jobs.detailDialog.videoCreationTime') }}</td>
              <td>{{ data.created_time }}</td>
            </tr>
            <tr>
              <td>{{ $t('jobs.detailDialog.taskCreationTime') }}</td>
              <td>{{ data.added_time }}</td>
            </tr>
            <tr>
              <td>{{ $t('jobs.detailDialog.updateTime') }}</td>
              <td>{{ data.update_time }}</td>
            </tr>
            <tr>
              <td>{{ $t('jobs.detailDialog.errorInfo') }}</td>
              <td>{{ data.error_info }}</td>
            </tr>
            <tr>
              <td>{{ $t('jobs.detailDialog.downloadTimes') }}</td>
              <td>{{ data.download_times }}</td>
            </tr>
            <tr>
              <td>{{ $t('jobs.detailDialog.retryTimes') }}</td>
              <td>{{ data.retry_times }}</td>
            </tr>
          </tbody>
        </table>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { JOB_STATUS_MAP } from 'src/constants/JobConstants';
import { VIDEO_TYPE_NAME_MAP, VIDEO_TYPE_TV } from 'src/constants/SettingConstants';

const props = defineProps({
  data: {
    type: Object,
  },
});

const { t } = useI18n();
const show = ref(false);

const translatedJobStatusMap = computed(() => {
  const map = {};
  Object.keys(JOB_STATUS_MAP).forEach((key) => {
    map[key] = t(`jobs.statusMap.${key}`);
  });
  return map;
});

const translatedVideoTypeNameMap = computed(() => {
  const map = {};
  Object.keys(VIDEO_TYPE_NAME_MAP).forEach((key) => {
    map[key] = t(`common.videoTypeMap.${key}`);
  });
  return map;
});
</script>

<style lang="scss" scoped>
.job-detail-table {
  tr td:first-child {
    padding-right: 20px;
    text-align: right;
    color: $grey;
  }
}
</style>
