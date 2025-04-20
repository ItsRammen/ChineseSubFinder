<template>
  <q-page class="q-pa-md">
    <div class="row items-center">
      <div class="q-gutter-xs">
        <q-btn
          :disable="selected.length === 0"
          size="md"
          icon="expand_less"
          :label="$t('jobs.upgradePriorityButton')"
          color="primary"
          @click="batchUpdatePriority('high')"
        />

        <q-btn
          :disable="selected.length === 0"
          size="md"
          icon="expand_more"
          :label="$t('jobs.downgradePriorityButton')"
          color="primary"
          @click="batchUpdatePriority('low')"
        />

        <q-btn :disable="selected.length === 0" size="md" :label="$t('jobs.changeStatusButton')" color="primary" @click="batchUpdateStatus" />
      </div>

      <q-space />

      <div class="q-gutter-sm row">
        <q-select
          :label="$t('jobs.filters.status')"
          v-model.number="form.status"
          :options="statusOptions"
          outlined
          dense
          map-options
          emit-value
          style="width: 120px"
        ></q-select>
        <q-select
          v-model.number="form.videoType"
          :options="videoTypeOptions"
          :label="$t('jobs.filters.type')"
          emit-value
          map-options
          outlined
          dense
          style="width: 100px"
        ></q-select>
        <q-select
          v-model="form.priority"
          :options="priorityOptions"
          :label="$t('jobs.filters.priority')"
          outlined
          dense
          map-options
          emit-value
          style="width: 130px"
        ></q-select>
        <q-input v-model="form.search" outlined :label="$t('jobs.filters.search')" dense></q-input>
      </div>
    </div>

    <q-separator class="q-mt-md" />

    <q-table
      :columns="translatedColumns"
      :rows="filteredData"
      flat
      selection="multiple"
      v-model:selected="selected"
      class="sticky-column-table"
      :pagination="{ rowsPerPage: 20 }"
    >
      <template v-slot:body-cell-jobStatus="{ row }">
        <q-td>
          <span
            :style="{
              background: JOB_STATUS_COLOR_MAP[row.job_status],
              color: 'white',
              borderRadius: '5px',
              padding: '2px 6px',
              fontSize: '12px',
            }"
            >{{ translatedJobStatusMap[row.job_status] }}</span
          >
        </q-td>
      </template>

      <template v-slot:body-cell-actions="{ row }">
        <q-td>
          <job-detail-btn-dialog :data="row" />
          <job-log-btn-dialog :data="row" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import JobApi from 'src/api/JobApi';
import { SystemMessage } from 'src/utils/message';
import { VIDEO_TYPE_NAME_MAP } from 'src/constants/SettingConstants';
import {
  JOB_STATUS_COLOR_MAP,
  JOB_STATUS_IGNORE,
  JOB_STATUS_MAP,
  JOB_STATUS_OPTIONS,
  JOB_STATUS_PENDING,
} from 'src/constants/JobConstants';
import { useQuasar } from 'quasar';
import JobLogBtnDialog from 'pages/jobs/JobLogBtnDialog';
import JobDetailBtnDialog from 'pages/jobs/JobDetailBtnDialog';

const { t } = useI18n();
const $q = useQuasar();

const baseColumns = [
  { name: 'jobStatus', labelKey: 'jobs.columns.status', field: 'job_status', align: 'left' },
  { name: 'videoType', labelKey: 'jobs.columns.type', field: 'video_type', align: 'left' },
  { name: 'videoName', labelKey: 'jobs.columns.name', field: 'video_name', width: '100px', align: 'left' },
  { name: 'priority', labelKey: 'jobs.columns.priority', field: 'task_priority', align: 'left' },
  { name: 'addedTime', labelKey: 'jobs.columns.addedTime', field: 'added_time', align: 'left' },
  { name: 'updateTime', labelKey: 'jobs.columns.updateTime', field: 'update_time', align: 'left' },
  { name: 'errorInfo', labelKey: 'jobs.columns.errorInfo', field: 'error_info', align: 'left' },
  { name: 'downloadTimes', labelKey: 'jobs.columns.downloadTimes', field: 'download_times', align: 'left' },
  { name: 'retryTimes', labelKey: 'jobs.columns.retryTimes', field: 'retry_times', align: 'left' },
  { name: 'actions', labelKey: 'jobs.columns.actions', align: 'left', headerClasses: 'sticky-column-header' },
];

const translatedColumns = computed(() =>
  baseColumns.map((col) => ({
    ...col,
    label: t(col.labelKey),
    format: col.name === 'videoType' ? (val) => translatedVideoTypeNameMap.value[val] : undefined,
  }))
);

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

const statusOptions = computed(() => [
  { label: t('common.all'), value: null },
  ...JOB_STATUS_OPTIONS.map((opt) => ({ label: translatedJobStatusMap.value[opt.value], value: opt.value })),
]);

const videoTypeOptions = computed(() => [
  { label: t('common.all'), value: null },
  ...Object.keys(translatedVideoTypeNameMap.value).map((key) => ({
    label: translatedVideoTypeNameMap.value[key],
    value: parseInt(key, 10),
  })),
]);

const priorityOptions = computed(() => [
  { label: t('common.all'), value: null },
  { label: t('jobs.priorityOptions.low'), value: 'low' },
  { label: t('jobs.priorityOptions.middle'), value: 'middle' },
  { label: t('jobs.priorityOptions.high'), value: 'high' },
]);

const data = ref([]);
const selected = ref([]);
const form = reactive({
  search: '',
  status: null,
  videoType: null,
  priority: null,
});

const JOB_PRIORITY_NUM2STR_MAP = {
  0: '高',
  1: '高',
  2: '高',
  3: '高',
  4: '中',
  5: '中',
  6: '中',
  7: '低',
  8: '低',
  9: '低',
  10: '低',
};

const getData = async () => {
  const [res, err] = await JobApi.getList();
  if (err !== null) {
    SystemMessage.error(err.message);
  } else {
    data.value = res.all_jobs;
  }
};

const refresh = () => {
  selected.value = [];
  getData();
};

const filteredData = computed(() => {
  const { search, status, videoType, priority } = form;
  return data.value.filter((item) => {
    if (search !== '') {
      if (
        !(
          item.video_name.includes(search) ||
          item.video_f_path.includes(search) ||
          item.series_root_dir_path.includes(search) ||
          String(item.media_server_inside_video_id) === search
        )
      ) {
        return false;
      }
    }

    if (status !== null && item.job_status !== status) {
      return false;
    }

    if (videoType !== null && item.video_type !== videoType) {
      return false;
    }

    const betweenOfNumber = (num, min, max) => num >= min && num <= max;
    if (priority !== null && item.task_priority !== priority) {
      if (priority === 'high' && !betweenOfNumber(item.task_priority, 0, 3)) {
        return false;
      }
      if (priority === 'low' && !betweenOfNumber(item.task_priority, 7, 10)) {
        return false;
      }
      if (priority === 'middle' && !betweenOfNumber(item.task_priority, 4, 6)) {
        return false;
      }
    }

    return true;
  });
});

const batchUpdatePriority = async (priority) => {
  $q.dialog({
    title: t('common.confirmationTitle'),
    message: t('jobs.confirmPriorityChange'),
    cancel: true,
    persistent: true,
    focus: 'none',
  }).onOk(async () => {
    const results = await Promise.allSettled(
      selected.value.map((item) =>
        JobApi.update(item.id, {
          task_priority: priority,
        })
      )
    );
    const errorCount = results.filter(({ value: [, err] }) => err !== null).length;
    if (errorCount > 0) {
      SystemMessage.error(t('jobs.priorityUpdateError', { count: errorCount }));
    } else {
      SystemMessage.success(t('jobs.priorityUpdateSuccess'));
    }

    refresh();
  });
};

const batchUpdateStatus = async () => {
  $q.dialog({
    title: t('jobs.changeStatusDialog.title'),
    message: t('jobs.changeStatusDialog.message'),
    options: {
      type: 'radio',
      items: [
        { label: translatedJobStatusMap.value[JOB_STATUS_PENDING], value: JOB_STATUS_PENDING },
        { label: translatedJobStatusMap.value[JOB_STATUS_IGNORE], value: JOB_STATUS_IGNORE },
      ],
    },
    cancel: true,
    persistent: true,
  }).onOk(async (val) => {
    const results = await Promise.allSettled(
      selected.value.map((item) =>
        JobApi.update(item.id, {
          job_status: val,
          task_priority: JOB_PRIORITY_NUM2STR_MAP[item.task_priority],
        })
      )
    );
    const errorCount = results.filter(({ value: [, err] }) => err !== null).length;
    if (errorCount > 0) {
      SystemMessage.error(t('jobs.statusUpdateError', { count: errorCount }));
    } else {
      SystemMessage.success(t('jobs.statusUpdateSuccess'));
    }

    refresh();
  });
};

onMounted(() => {
  getData();
});
</script>

<style lang="scss">
.sticky-column-table {
  thead tr:last-child th:last-child {
    background-color: #fff;
  }

  td:last-child {
    background-color: #fff;
  }

  th:last-child,
  td:last-child {
    position: sticky;
    right: 0;
    z-index: 1;
    box-shadow: -5px 0px 5px -1px #ddd;
  }
  td:last-child {
    //border-left: 1px solid $grey-3;
  }
}
</style>
